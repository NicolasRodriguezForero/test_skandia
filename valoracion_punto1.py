"""
Punto 1 - Valoracion (MTM) de forwards USD/COP al 31/12/2024.
Metodologia: Anexo 1 de la prueba tecnica (Skandia).

Estructura en funciones reutilizables para que el Punto 4 (archivo plano .txt)
pueda reusar cargar_datos() y valorar_todos() sin cambios.
"""

import glob
import pandas as pd

# --- Parametros del enunciado (fuente: PRUEBA TECNICA + Superfinanciera) ---
FECHA_VALORACION = pd.Timestamp(2024, 12, 31)
TRM = 4409.15          # COP/USD oficial del 31/12/2024
ARCHIVO = [x for x in glob.glob("*.xlsx") if not x.startswith("~$")][0]


def cargar_datos(archivo):
    """Lee las tres hojas. Las fechas YYYYMMDD se leen como TEXTO y luego se
    convierten a fecha real (asi no se pierde informacion ni ceros)."""
    base = pd.read_excel(archivo, sheet_name="base datos", dtype=str)

    base["f_celebracion"] = pd.to_datetime(base["Fecha celebración contrato"], format="%Y%m%d")
    base["f_vencimiento"] = pd.to_datetime(base["Fecha vencimiento contrato"], format="%Y%m%d")
    base["Nominal"] = pd.to_numeric(base["Nominal"])
    base["Strike"] = pd.to_numeric(base["Strike"])

    pf = pd.read_excel(archivo, sheet_name="Puntos fwd")
    td = pd.read_excel(archivo, sheet_name="tasa descuento")
    pf.columns = ["dias", "puntos_fwd"]   # ojo: el encabezado real trae un espacio
    td.columns = ["dias", "tasa"]
    return base, pf, td


def construir_buscadores(pf, td):
    """Convierte las tablas en diccionarios {dia: valor} para match exacto."""
    puntos_por_dia = dict(zip(pf["dias"], pf["puntos_fwd"]))
    tasa_por_dia = dict(zip(td["dias"], td["tasa"]))
    return puntos_por_dia, tasa_por_dia


def buscar(diccionario, dias, nombre):
    if dias not in diccionario:
        raise ValueError(f"No hay {nombre} para d={dias} (no se interpola).")
    return diccionario[dias]


def valorar_contrato(fila, puntos_por_dia, tasa_por_dia):
    """Valora un unico contrato y devuelve d, puntos, r, factor, Derecho, Obligacion, MTM."""
    d = (fila["f_vencimiento"] - FECHA_VALORACION).days
    puntos = buscar(puntos_por_dia, d, "puntos fwd")
    r = buscar(tasa_por_dia, d, "tasa")

    factor_desc = 1 / (1 + r * d / 360)
    nominal, strike = fila["Nominal"], fila["Strike"]

    pata_mercado = (TRM + puntos) * nominal * factor_desc
    pata_strike = strike * nominal * factor_desc

    if fila["Posicion"] == "Compra":
        derecho, obligacion = pata_mercado, pata_strike
    elif fila["Posicion"] == "Venta":
        derecho, obligacion = pata_strike, pata_mercado
    else:
        raise ValueError(f"Posicion desconocida: {fila['Posicion']}")

    mtm = derecho - obligacion
    return pd.Series({
        "d_dias": d, "puntos_fwd": puntos, "r": r, "factor_desc": factor_desc,
        "Derecho": derecho, "Obligacion": obligacion, "MTM": mtm,
    })


def valorar_todos(base, pf, td):
    puntos_por_dia, tasa_por_dia = construir_buscadores(pf, td)
    calculos = base.apply(lambda f: valorar_contrato(f, puntos_por_dia, tasa_por_dia), axis=1)
    return pd.concat([base, calculos], axis=1)


def exportar_revision(df, salida="Punto1_Valoracion_revision.xlsx"):
    cols = [
        "Número de contrato", "Empresa", "Finalidad de la operación", "Posicion",
        "Nombre de la contraparte", "Nominal", "Strike",
        "f_vencimiento", "d_dias", "puntos_fwd", "r", "factor_desc",
        "Derecho", "Obligacion", "MTM",
    ]
    rev = df[cols].copy()
    rev.to_excel(salida, index=False, sheet_name="Valoracion")
    return salida, rev


if __name__ == "__main__":
    base, pf, td = cargar_datos(ARCHIVO)
    df = valorar_todos(base, pf, td)
    salida, rev = exportar_revision(df)
    print(f"Contratos valorados: {len(df)}")
    print(f"MTM total: {df['MTM'].sum():,.2f} COP")
    print("MTM por portafolio:")
    print(df.groupby("Empresa")["MTM"].sum())
    print(f"Archivo de revision: {salida}")

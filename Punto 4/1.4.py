"""
Punto 4 - Herramienta para generar el archivo plano .txt al corte 31/12/2024.

Autocontenida: reutiliza la misma metodologia de valoracion del Punto 1, pero
sin importar otro modulo (cada punto vive en su propia carpeta). Lee el Excel
original desde "Datos" y escribe "plano.txt" en esta misma carpeta ("Punto 4").

Estructura del archivo (sin encabezados, separado por ';', decimal con '.'):
  1. Nominal (USD)        2 decimales
  2. Strike (COP)         4 decimales
  3. Fecha vencimiento    DDMMYYYY
  4. VPN Derecho (COP)    4 decimales
  5. VPN Obligacion (COP) 4 decimales
  6. MTM forward (COP)    4 decimales
  7. Numero de contrato   alfanumerico
  8. Finalidad            1 = cobertura, 2 = inversion
"""

from pathlib import Path
import pandas as pd

# --- Rutas (este script vive en <raiz>/Punto 4/) ---
SCRIPT_DIR = Path(__file__).resolve().parent
BASE_DIR = SCRIPT_DIR.parent
DATOS_DIR = BASE_DIR / "Datos"

FECHA_VALORACION = pd.Timestamp(2024, 12, 31)
TRM = 4409.15
ARCHIVO = next(p for p in DATOS_DIR.glob("*.xlsx") if not p.name.startswith("~$"))

SEP = ";"
SALIDA = SCRIPT_DIR / "plano.txt"


# ---------- Motor de valoracion (igual que el Punto 1) ----------
def cargar_datos(archivo):
    base = pd.read_excel(archivo, sheet_name="base datos", dtype=str)
    base["f_vencimiento"] = pd.to_datetime(base["Fecha vencimiento contrato"], format="%Y%m%d")
    base["Nominal"] = pd.to_numeric(base["Nominal"])
    base["Strike"] = pd.to_numeric(base["Strike"])

    pf = pd.read_excel(archivo, sheet_name="Puntos fwd")
    td = pd.read_excel(archivo, sheet_name="tasa descuento")
    pf.columns = ["dias", "puntos_fwd"]
    td.columns = ["dias", "tasa"]
    return base, pf, td


def valorar_todos(base, pf, td):
    puntos_por_dia = dict(zip(pf["dias"], pf["puntos_fwd"]))
    tasa_por_dia = dict(zip(td["dias"], td["tasa"]))

    def valorar(fila):
        d = (fila["f_vencimiento"] - FECHA_VALORACION).days
        if d not in puntos_por_dia or d not in tasa_por_dia:
            raise ValueError(f"No hay insumo para d={d} (no se interpola).")
        puntos = puntos_por_dia[d]
        r = tasa_por_dia[d]
        factor = 1 / (1 + r * d / 360)
        nominal, strike = fila["Nominal"], fila["Strike"]
        pata_mercado = (TRM + puntos) * nominal * factor
        pata_strike = strike * nominal * factor
        if fila["Posicion"] == "Compra":
            derecho, obligacion = pata_mercado, pata_strike
        elif fila["Posicion"] == "Venta":
            derecho, obligacion = pata_strike, pata_mercado
        else:
            raise ValueError(f"Posicion desconocida: {fila['Posicion']}")
        return pd.Series({"Derecho": derecho, "Obligacion": obligacion, "MTM": derecho - obligacion})

    calculos = base.apply(valorar, axis=1)
    return pd.concat([base, calculos], axis=1)


# ---------- Formato del archivo plano ----------
def finalidad_a_codigo(valor):
    v = str(valor).strip().lower()
    if v.startswith("cobertura"):
        return 1
    if v.startswith("inversi"):
        return 2
    raise ValueError(f"Finalidad no reconocida: {valor!r}")


def formatear_fila(fila):
    campos = [
        f"{fila['Nominal']:.2f}",
        f"{fila['Strike']:.4f}",
        fila["f_vencimiento"].strftime("%d%m%Y"),
        f"{fila['Derecho']:.4f}",
        f"{fila['Obligacion']:.4f}",
        f"{fila['MTM']:.4f}",
        str(fila["Número de contrato"]),
        str(finalidad_a_codigo(fila["Finalidad de la operación"])),
    ]
    return SEP.join(campos)


def generar_plano(salida=SALIDA):
    base, pf, td = cargar_datos(ARCHIVO)
    df = valorar_todos(base, pf, td)
    lineas = [formatear_fila(fila) for _, fila in df.iterrows()]
    with open(salida, "w", encoding="utf-8") as f:
        f.write("\n".join(lineas) + "\n")
    return salida, len(lineas)


if __name__ == "__main__":
    salida, n = generar_plano()
    print(f"Archivo plano generado: {salida}")
    print(f"Lineas (contratos): {n}")

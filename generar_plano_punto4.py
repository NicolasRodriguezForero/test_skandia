"""
Punto 4 - Herramienta para generar el archivo plano .txt al corte 31/12/2024.

Reutiliza el motor de valoracion del Punto 1 (cargar_datos + valorar_todos) y
solo se encarga del FORMATO de salida.

Estructura del archivo (sin encabezados, separado por ';'):
  1. Nominal (USD)        -> numerico, 2 decimales
  2. Strike (COP)         -> numerico, 4 decimales
  3. Fecha vencimiento    -> DDMMYYYY (8 caracteres)
  4. VPN Derecho (COP)    -> numerico, 4 decimales
  5. VPN Obligacion (COP) -> numerico, 4 decimales
  6. MTM forward (COP)    -> numerico, 4 decimales
  7. Numero de contrato   -> alfanumerico
  8. Finalidad            -> 1 = cobertura, 2 = inversion

Decisiones de formato (acordadas):
  - Separador de campos: ';'
  - Separador decimal: '.' (punto)
  - Fecha: DDMMYYYY
"""

from valoracion_punto1 import cargar_datos, valorar_todos, ARCHIVO

SEP = ";"
SALIDA = "Punto4_archivo_plano.txt"


def finalidad_a_codigo(valor):
    """cobertura -> 1, inversion -> 2 (insensible a mayusculas/acentos)."""
    v = str(valor).strip().lower()
    if v.startswith("cobertura"):
        return 1
    if v.startswith("inversi"):   # cubre 'inversion' / 'inversión'
        return 2
    raise ValueError(f"Finalidad no reconocida: {valor!r}")


def formatear_fila(fila):
    campos = [
        f"{fila['Nominal']:.2f}",                          # 1
        f"{fila['Strike']:.4f}",                           # 2
        fila["f_vencimiento"].strftime("%d%m%Y"),          # 3
        f"{fila['Derecho']:.4f}",                          # 4
        f"{fila['Obligacion']:.4f}",                       # 5
        f"{fila['MTM']:.4f}",                              # 6
        str(fila["Número de contrato"]),                   # 7
        str(finalidad_a_codigo(fila["Finalidad de la operación"])),  # 8
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

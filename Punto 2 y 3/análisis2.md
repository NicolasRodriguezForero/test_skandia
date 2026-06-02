# Punto 2 — Análisis de utilidad/pérdida por portafolio

**Autor:** Nicolas Rodriguez Forero
**Fecha de valoración:** 31 de diciembre de 2024
**TRM oficial (Superfinanciera):** 4.409,15 COP/USD
**Fuente de cifras:** valoración del Punto 1 (`Punto1_Valoracion_revision.xlsx`)

---

## La idea clave

El MTM calculado en el Punto 1 es la utilidad o pérdida de **los forwards mirados solos**.
Pero ese número, por sí solo, engaña, porque mezcla dos cosas de naturaleza muy distinta:

- **Cobertura (protección):** el forward existe para proteger una posición en dólares que el
  portafolio **ya tiene**, exactamente igual al nominal. Si el forward muestra pérdida, es porque
  el dólar se movió — pero entonces los dólares que protege se movieron al revés y ganaron lo
  mismo. **Se compensan.** La pérdida del forward de cobertura no es una pérdida real del
  portafolio; es el espejo de una ganancia en el subyacente.

- **Inversión (apuesta):** no hay posición subyacente que compense. Es una apuesta direccional
  pura al movimiento del dólar. Aquí el MTM **sí es plata real** ganada o perdida.

> **Analogía:** un forward de cobertura es como un seguro de carro. Si no te roban el carro,
> "perdiste" la prima — pero mirar solo el seguro, sin mirar el carro que protegió, no tiene
> sentido. El forward de inversión, en cambio, es "solo seguro y sin carro": una apuesta.

**Conclusión metodológica:** el análisis correcto no es mirar el MTM total, sino **separarlo en
dos cubos** — cobertura (se neutraliza con el subyacente) e inversión (resultado económico real).

---

## Comprobación del "espejo" de la cobertura

Contrato **1057387** (cobertura, venta de 500.000 USD, strike 4.406,90):

| Concepto | Valor (COP) |
|---|---:|
| MTM del forward de cobertura | −79.782.938 |
| P&L del subyacente (500.000 USD que protege) | +79.782.938 |
| **Neto económico** | **≈ 0** (posición amarrada) |

El portafolio quedó protegido: ese era el objetivo de la cobertura.

---

## Tabla central (económica): resultado real por portafolio

Esta tabla hace explícito el espejo de la cobertura. El MTM del forward de cobertura se
compensa con el P&L del subyacente que protege (neto ≈ 0), de modo que el **resultado económico
real de cada portafolio es el cubo de inversión**.

| Portafolio | Cobertura: MTM forward | (+) P&L subyacente *(espejo teórico)* | (=) Neto cobertura | **Inversión = resultado real** |
|---|---:|---:|---:|---:|
| Familia Vargas | −41.951 M | ≈ +41.951 M | ≈ 0 | **+10.702 M** |
| Seguros ABC | −85.749 M | ≈ +85.749 M | ≈ 0 | **+38.818 M** |
| Inversiones AAA | −5.501 M | ≈ +5.501 M | ≈ 0 | **+5.323 M** |
| **TOTAL** | **−133.200 M** | **≈ +133.200 M** | **≈ 0** | **+54.842 M** |

*(M = millones de COP)*

> **Sobre la columna "P&L subyacente (espejo teórico)":** este valor **no proviene de los datos
> del archivo** — el Excel solo contiene los forwards, no las posiciones en dólares subyacentes.
> Es un valor **inferido**, no medido, a partir de dos elementos: (1) la premisa del enunciado de
> que cada cobertura protege "una posición en dólares exactamente igual al nominal", y (2) la
> definición de cobertura, según la cual el subyacente se mueve en sentido opuesto y magnitud
> similar al forward. Por eso se usa el signo "≈": el espejo no es exacto al peso (el subyacente
> es spot mientras el forward está descontado a valor presente, y no se conoce el valor de
> entrada del subyacente). Lo sólido no es la cifra exacta del espejo, sino la **conclusión**: el
> MTM de cobertura no representa una pérdida económica real, pues queda neutralizado por el
> subyacente que protege.

> **Nota:** la columna MTM total del libro de derivados (Cobertura + Inversión) **no es** el
> resultado económico del portafolio, porque omite el subyacente que las coberturas protegen.
> Se reporta aparte, solo como conciliación con el Punto 1 (ver tabla siguiente).

### Conciliación contable con el Punto 1 (referencia, no es resultado económico)

| Portafolio | MTM Cobertura | MTM Inversión | MTM Total derivados |
|---|---:|---:|---:|
| Familia Vargas | −41.951 M | +10.702 M | −31.250 M |
| Seguros ABC | −85.749 M | +38.818 M | −46.931 M |
| Inversiones AAA | −5.501 M | +5.323 M | −178 M |
| **TOTAL** | **−133.200 M** | **+54.842 M** | **−78.358 M** |

*Esta columna total es la valoración contable del libro de forwards (suma de los 228 contratos
del Punto 1). Cuadra con la trazabilidad, pero no debe leerse como utilidad/pérdida del portafolio.*

### Tamaño de cada portafolio (Nominal en USD)

| Portafolio | Nominal Cobertura | Nominal Inversión | Nominal Total |
|---|---:|---:|---:|
| Familia Vargas | 261,72 M USD | 89,27 M USD | 350,99 M USD |
| Seguros ABC | 449,48 M USD | 254,08 M USD | 703,56 M USD |
| Inversiones AAA | 25,06 M USD | 24,98 M USD | 50,04 M USD |
| **TOTAL** | **736,26 M USD** | **368,34 M USD** | **1.104,60 M USD** |

### Número de contratos

| Portafolio | Cobertura | Inversión | Total |
|---|---:|---:|---:|
| Familia Vargas | 84 | 33 | 117 |
| Seguros ABC | 44 | 20 | 64 |
| Inversiones AAA | 26 | 21 | 47 |
| **TOTAL** | **154** | **74** | **228** |

---

## Lectura del resultado

**El −78.358 M total NO es la pérdida real de los portafolios.** Está dominado por el cubo de
cobertura (−133.200 M), que está compensado por la valorización de los dólares subyacentes. Es
"el seguro", no una pérdida económica.

**El resultado económico real de las decisiones de riesgo está en el cubo de inversión:**
**+54.842 M en conjunto**, positivo en los tres portafolios. Las apuestas direccionales con
dólares acertaron durante 2024 (el USD/COP subió y las posiciones se beneficiaron).

### Por portafolio

- **Inversiones AAA** — El más balanceado: nominal repartido casi mitad/mitad entre cobertura
  e inversión. La cobertura (−5.501 M) se neutraliza con su subyacente y la inversión aporta
  +5.323 M reales. Total casi en cero (−178 M). Perfil prudente.

- **Familia Vargas** — Mayoritariamente cobertura (262 M USD de 351 M USD). Su −31.250 M total
  es casi todo "espejo" de los dólares protegidos. La apuesta de inversión aportó +10.702 M
  reales. Perfil orientado a la protección.

- **Seguros ABC** — El de mayor tamaño (704 M USD) y el de mayor apuesta especulativa
  (254 M USD de nominal en inversión, +38.818 M de utilidad real). Aquí se concentra la mayor
  toma de riesgo direccional, por ahora a favor.

---

## Matiz que conecta con el Punto 3

Que el cubo de inversión esté en verde **hoy** no significa que la estrategia sea prudente. Un
portafolio llamado *"Seguros ABC"* con **254 M USD apostados de forma especulativa (no cubierta)**
asume un riesgo direccional muy alto: si el dólar hubiera caído, esos +38.818 M serían pérdidas
reales. La utilidad observada es resultado de que la apuesta salió bien, no necesariamente de una
gestión de riesgo conservadora — punto que se desarrolla en el Punto 3.

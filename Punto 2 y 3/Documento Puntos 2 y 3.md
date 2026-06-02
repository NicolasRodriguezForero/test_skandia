# Puntos 2 y 3 - Resultado real de los portafolios y calificación de la estrategia

**Autor:** Nicolas Rodriguez Forero
**Fecha de corte:** 31 de diciembre de 2024
**TRM oficial:** 4.409,15 COP/USD
**De dónde salen las cifras:** valoración del Punto 1 (los 228 contratos)

---

## 1. El problema con mirar el MTM sin contexto

El MTM que calculamos en el Punto 1 mide los forwards solos. El tema es que ese número, así nomás, confunde, porque mete en la misma bolsa dos cosas muy distintas:

- **Cobertura:** el forward está ahí para proteger unos dólares que el portafolio *ya tiene*. Si el forward pierde, es porque el dólar se movió, pero entonces esos dólares protegidos ganaron casi lo mismo. Se compensan. No es plata perdida de verdad.
- **Inversión:** no hay dólares atrás que compensen. Es una apuesta pura a hacia dónde va el dólar. Acá el MTM sí es plata real, ganada o perdida.

> **Ejemplo simple:** un forward de cobertura es como el SOAT del carro. Si no chocas, "perdiste" la prima, pero mirar solo el SOAT sin mirar el carro que protegió no dice nada. El forward de inversión es tener SOAT sin carro: pura apuesta.

Conclusión: no hay que mirar el MTM total, hay que partirlo en dos cubos.

---

## 2. La prueba de que la cobertura genera un "reflejo"

Tomemos un contrato concreto, el **1057387** (venta de 500.000 USD, strike 4.406,90):

| Concepto | Valor (COP) |
|---|---:|
| MTM del forward | -79.782.938 |
| P&L de los 500.000 USD que protege | +79.782.938 |
| **Neto** | **≈ 0** |

El forward "perdió" 79,8 M, pero los dólares ganaron lo mismo. El portafolio quedó protegido, que era justo el punto.

---

## 3. Resultado económico real por portafolio

Acá está la tabla que importa. El MTM de cobertura se anula con el subyacente (neto ≈ 0), así que **lo que de verdad ganó o perdió cada portafolio es el cubo de inversión**.

| Portafolio | MTM cobertura | (+) Subyacente *(espejo)* | (=) Neto cobertura | **Inversión = real** |
|---|---:|---:|---:|---:|
| Familia Vargas | -41.951 M | ≈ +41.951 M | ≈ 0 | **+10.702 M** |
| Seguros ABC | -85.749 M | ≈ +85.749 M | ≈ 0 | **+38.818 M** |
| Inversiones AAA | -5.501 M | ≈ +5.501 M | ≈ 0 | **+5.323 M** |
| **TOTAL** | **-133.200 M** | **≈ +133.200 M** | **≈ 0** | **+54.842 M** |

*(M = millones de COP)*

> **Ojo con la columna del subyacente:** ese valor no está en el Excel (el archivo solo trae los forwards, no los dólares). Lo infiero de la premisa del enunciado (cada cobertura protege un nominal igual en dólares) más la definición de cobertura. Por eso uso "≈": no cuadra al peso, porque el subyacente es spot y el forward está descontado. Lo firme no es la cifra exacta, es la conclusión: la pérdida de cobertura no es pérdida real.

### Conciliación contable con el Punto 1 (solo de referencia)

| Portafolio | MTM cobertura | MTM inversión | MTM total derivados |
|---|---:|---:|---:|
| Familia Vargas | -41.951 M | +10.702 M | -31.250 M |
| Seguros ABC | -85.749 M | +38.818 M | -46.931 M |
| Inversiones AAA | -5.501 M | +5.323 M | -178 M |
| **TOTAL** | **-133.200 M** | **+54.842 M** | **-78.358 M** |

Ese -78.358 M es la valoración contable del libro de forwards y cuadra con el Punto 1, pero **no es la utilidad/pérdida del portafolio**.

### Tamaño y composición de cada portafolio

| Portafolio | Nominal total (USD) | % cobertura | % inversión | Contratos |
|---|---:|---:|---:|---:|
| Familia Vargas | 350,99 M | 74,6 % | 25,4 % | 117 |
| Seguros ABC | 703,56 M | 63,9 % | 36,1 % | 64 |
| Inversiones AAA | 50,04 M | 50,1 % | 49,9 % | 47 |
| **TOTAL** | **1.104,60 M** | **66,7 %** | **33,3 %** | **228** |

---

## 4. Cómo se lee esto

El -78.358 M total **no** es la pérdida de los portafolios. Está dominado por la cobertura (-133.200 M), que se compensa con los dólares. Es "el seguro", no una pérdida.

Lo real está en el cubo de inversión: **+54.842 M**, en verde en los tres. Las apuestas al dólar acertaron en 2024 (el USD/COP subió).

Portafolio por portafolio:

- **Inversiones AAA:** el más parejo, casi mitad y mitad. Cobertura neutralizada y +5.323 M reales de inversión. Total casi en cero (-178 M). Prudente.
- **Familia Vargas:** sobre todo cobertura (262 M USD de 351 M USD). Su -31.250 M es casi todo espejo de los dólares. La apuesta sumó +10.702 M. Orientado a protección.
- **Seguros ABC:** el más grande (704 M USD) y el de mayor apuesta (254 M USD especulativos, +38.818 M). Acá se concentra el riesgo direccional, por ahora a favor.

---

## 5. Calificación de la estrategia del front (rol: Control y Valoración)

Antes de calificar, los números base:

| Métrica | Cobertura | Inversión | Total |
|---|---:|---:|---:|
| Nominal (USD) | 736,26 M | 368,34 M | 1.104,60 M |
| % del nominal | 66,7 % | 33,3 % | 100 % |
| Contratos | 154 | 74 | 228 |
| Resultado real (MTM) | ≈ 0 | +54.842 M | - |

Y qué tan especulativo es cada uno:

| Portafolio | % en inversión | Nominal especulativo (USD) | Resultado |
|---|---:|---:|---:|
| Familia Vargas | 25,4 % | 89,27 M | +10.702 M |
| Seguros ABC | 36,1 % | 254,08 M | +38.818 M |
| Inversiones AAA | 49,9 % | 24,98 M | +5.323 M |

La estrategia hay que calificarla en **dos planos**, porque usa el mismo instrumento para dos cosas distintas:

**Cobertura: bien.** Dos tercios del libro protegen posiciones reales en dólares. Es justo para lo que sirve un forward. Bien ejecutado.

**Inversión: con reservas.** Acá está la alerta:

- Son **368 M USD apostados** a que el dólar suba, sin nada que los proteja. Si el USD/COP hubiera caído, esos +54.842 M serían **pérdidas reales** del mismo tamaño. Salió bien por suerte, no por diseño.
- **Ganar por dirección no es ganar por gestión.** Un buen resultado puntual no valida la estrategia si se asumió un riesgo que pudo voltearse.
- **Posible exceso de mandato (la alerta principal):** "Seguros ABC", que por el nombre suena conservador, es el que más apuesta en plata (254 M USD, 36 % de su nominal). Para un vehículo de seguros eso cuesta justificarlo. En cambio "Inversiones AAA" tiene 50 % especulativo pero solo 25 M USD, lo cual sí pega con lo que el nombre sugiere.

### Riesgos que veo

1. **Riesgo de mercado direccional:** un tercio del nominal expuesto al dólar sin cobertura.
2. **Posible exceso de mandato:** especulación grande en un portafolio que parece conservador (Seguros ABC).
3. **Contraparte/concentración:** las posiciones están con bancos puntuales, faltaría revisar concentración (no lo miré a fondo).
4. **Lectura engañosa del MTM:** el -78.358 M se puede confundir con pérdida si no se separan los cubos.

### Qué recomendaría

- **Reportar siempre** cobertura vs inversión por separado, para que la dirección vea el riesgo real y no el MTM agregado.
- **Revisar el mandato** de cada portafolio, empezando por Seguros ABC.
- **Poner límites** al libro de inversión (nominal, VaR, stop-loss) para no depender de la suerte.
- **Monitorear la concentración por contraparte.**

---

## 6. Calificación final

**Estrategia mixta, nota dividida:**

- **Cobertura: positiva.** Uso correcto y mayoritario del derivado.
- **Inversión: con reservas.** El resultado fue bueno, pero se logró asumiendo riesgo direccional no cubierto y con posible desalineación de mandato en al menos un portafolio. La utilidad **no es prueba de buena gestión**, es un acierto de dirección que igual pudo ser pérdida.

> **Salvedad:** este juicio es sobre **una foto de un solo día (31/12/2024)** y sin conocer los mandatos formales ni los límites de riesgo. Una evaluación definitiva necesitaría esa info y el historial de las posiciones, no solo el corte.

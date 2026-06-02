# Punto 3 — Calificación de la estrategia del front

**Autor:** Nicolas Rodriguez Forero
**Rol desde el que se evalúa:** Control y Valoración (middle office), es decir, el área que
supervisa y valida lo que hace el front office (quienes toman las posiciones).

**Pregunta del enunciado:** con base en el Punto 2, ¿cómo se califica la estrategia que está
desarrollando el front con estos derivados?

---

## En qué me baso (hallazgos del Punto 2)

| Métrica | Cobertura | Inversión | Total |
|---|---:|---:|---:|
| Nominal (USD) | 736,26 M | 368,34 M | 1.104,60 M |
| % del nominal | 66,7 % | 33,3 % | 100 % |
| N° de contratos | 154 | 74 | 228 |
| Resultado económico (MTM) | ≈ 0 (neutralizado) | +54.842 M COP | — |

- Dos tercios del nominal son **cobertura**: uso correcto y prudente del derivado (protege
  posiciones reales en dólares, neutraliza el riesgo cambiario).
- Un tercio del nominal (**368 M USD**) es **inversión**: posiciones direccionales **sin
  subyacente que las proteja**. Es una apuesta a la dirección del dólar.
- El resultado positivo (+54.842 M) provino de que el USD/COP subió en 2024 y la apuesta
  acertó — **es resultado de la dirección del mercado, no de una gestión de riesgo conservadora**.

### Proporción especulativa por portafolio

| Portafolio | % nominal en inversión | Nominal especulativo (USD) | Resultado inversión |
|---|---:|---:|---:|
| Familia Vargas | 25,4 % | 89,27 M | +10.702 M |
| Seguros ABC | 36,1 % | 254,08 M | +38.818 M |
| Inversiones AAA | 49,9 % | 24,98 M | +5.323 M |

---

## Calificación de la estrategia

La estrategia debe calificarse **en dos planos separados**, porque mezcla dos usos muy distintos
del mismo instrumento:

### 1. Uso de cobertura — **Adecuado / bien ejecutado**
Dos tercios del libro están destinados a proteger posiciones reales en dólares. Esto es
exactamente para lo que sirve un forward: reducir incertidumbre. Bien hecho.

### 2. Uso de inversión — **Cuestionable / requiere alerta**
Aquí está la preocupación desde control y valoración:

- **Es riesgo direccional no cubierto:** 368 M USD apostados a que el dólar suba. Si el USD/COP
  hubiera caído, esos +54.842 M serían **pérdidas reales** de magnitud equivalente. La estrategia
  es **asimétrica solo por suerte**, no por diseño.
- **Ganar por dirección ≠ ganar por gestión.** Un buen resultado puntual no valida una estrategia
  si se obtuvo asumiendo un riesgo que pudo materializarse en sentido contrario.
- **Posible desalineación con el mandato (señal de alerta principal):** el portafolio
  *"Seguros ABC"* —cuyo nombre sugiere un perfil asegurador, típicamente conservador— concentra
  **el mayor libro especulativo en tamaño absoluto (254 M USD, 36 % de su nominal)**. Para un
  vehículo de seguros, ese nivel de exposición direccional no cubierta es difícil de justificar.
  En contraste, *"Inversiones AAA"* (nombre que sí sugiere mandato de inversión) tiene alta
  proporción especulativa (50 %) pero en tamaño pequeño (25 M USD), lo cual es más coherente con
  lo que su nombre implica.

---

## Riesgos identificados

1. **Riesgo de mercado direccional:** un tercio del nominal expuesto a la dirección del dólar sin
   cobertura. Una reversión del USD/COP impactaría directamente el patrimonio de los fondos.
2. **Posible exceso de mandato:** especulación material en un portafolio aparentemente
   conservador (Seguros ABC).
3. **Riesgo de contraparte / concentración:** las posiciones están firmadas con bancos
   específicos; conviene revisar la concentración por contraparte (no analizado a fondo aquí).
4. **Lectura engañosa del MTM contable:** el −78.358 M total puede malinterpretarse como pérdida
   si no se separa cobertura de inversión (ver Punto 2).

---

## Recomendaciones (desde Control y Valoración)

- **Separar y reportar** sistemáticamente cobertura vs inversión, para que la dirección vea el
  riesgo real y no el MTM contable agregado.
- **Verificar el mandato** de cada portafolio: ¿permite posiciones especulativas? ¿en qué cuantía?
  Revisar con prioridad la exposición de Seguros ABC.
- **Establecer límites** al libro de inversión: límites de nominal, VaR y/o stop-loss, de modo que
  el resultado no dependa de la suerte de la dirección del mercado.
- **Monitorear la concentración por contraparte** y el riesgo de crédito asociado.

---

## Calificación final

**Estrategia mixta, con calificación dividida:**

- **Cobertura: positiva.** Uso correcto y mayoritario del derivado para proteger posiciones reales.
- **Inversión: con reservas.** El resultado fue favorable, pero se logró asumiendo riesgo
  direccional no cubierto, con una posible desalineación de mandato en al menos un portafolio. La
  utilidad observada **no debe interpretarse como evidencia de una buena gestión de riesgo**, sino
  como un acierto direccional que igualmente pudo ser una pérdida.

> **Salvedad metodológica:** este juicio se emite sobre una **foto de un solo día (31/12/2024)** y
> sin conocer los mandatos formales de cada portafolio ni los límites de riesgo vigentes. Una
> evaluación definitiva requeriría esa información y el historial de las posiciones, no solo el
> corte de valoración.

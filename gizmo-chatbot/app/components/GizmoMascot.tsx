// Mascota original "Gizmo": criaturita tierna de orejas grandes.
// Diseño propio (no es un personaje con derechos de autor).
// Animada con SMIL: flota, parpadea, mueve las orejas y la antenita rebota.

export default function GizmoMascot({
  size = 96,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label="Gizmo, la mascota del cofre"
    >
      {/* Grupo que flota suavemente */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0; 0 -4; 0 0"
          dur="3s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
          keyTimes="0;0.5;1"
        />

        {/* sombra */}
        <ellipse cx="60" cy="112" rx="26" ry="5" fill="#1f6f63" opacity="0.15">
          <animate attributeName="rx" values="26;22;26" dur="3s" repeatCount="indefinite" />
        </ellipse>

        {/* Oreja izquierda */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="-18 44 52; -10 44 52; -18 44 52"
            dur="2.4s"
            repeatCount="indefinite"
          />
          <ellipse cx="40" cy="34" rx="11" ry="24" fill="#7cc6b5" />
          <ellipse cx="40" cy="36" rx="5.5" ry="15" fill="#FFC2D1" />
        </g>

        {/* Oreja derecha */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="18 76 52; 10 76 52; 18 76 52"
            dur="2.4s"
            repeatCount="indefinite"
          />
          <ellipse cx="80" cy="34" rx="11" ry="24" fill="#7cc6b5" />
          <ellipse cx="80" cy="36" rx="5.5" ry="15" fill="#FFC2D1" />
        </g>

        {/* Antenita con bobble que rebota */}
        <path d="M60 40 C 56 30, 66 28, 60 20" stroke="#1f6f63" strokeWidth="4" fill="none" strokeLinecap="round" />
        <circle cx="60" cy="19" r="4" fill="#FF7E62">
          <animate attributeName="cy" values="19;14;19" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1; 0.45 0 0.55 1" keyTimes="0;0.5;1" />
        </circle>

        {/* Cabeza / cuerpo */}
        <ellipse cx="60" cy="66" rx="36" ry="34" fill="#8ED1C0" />
        {/* Pancita */}
        <ellipse cx="60" cy="74" rx="20" ry="16" fill="#FFF6E9" />

        {/* Cachetes */}
        <ellipse cx="38" cy="72" rx="6" ry="4" fill="#FFB3C1" opacity="0.75" />
        <ellipse cx="82" cy="72" rx="6" ry="4" fill="#FFB3C1" opacity="0.75" />

        {/* Ojo izquierdo */}
        <g>
          <ellipse cx="48" cy="60" rx="8" ry="9" fill="#ffffff">
            <animate attributeName="ry" values="9;9;1;9" keyTimes="0;0.9;0.95;1" dur="4.5s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="48" cy="61" rx="4" ry="5" fill="#2b2b40">
            <animate attributeName="ry" values="5;5;1;5" keyTimes="0;0.9;0.95;1" dur="4.5s" repeatCount="indefinite" />
          </ellipse>
          <circle cx="46" cy="58" r="1.6" fill="#ffffff" />
        </g>

        {/* Ojo derecho */}
        <g>
          <ellipse cx="72" cy="60" rx="8" ry="9" fill="#ffffff">
            <animate attributeName="ry" values="9;9;1;9" keyTimes="0;0.9;0.95;1" dur="4.5s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="72" cy="61" rx="4" ry="5" fill="#2b2b40">
            <animate attributeName="ry" values="5;5;1;5" keyTimes="0;0.9;0.95;1" dur="4.5s" repeatCount="indefinite" />
          </ellipse>
          <circle cx="70" cy="58" r="1.6" fill="#ffffff" />
        </g>

        {/* Sonrisa */}
        <path d="M52 78 Q 60 86 68 78" stroke="#2b2b40" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

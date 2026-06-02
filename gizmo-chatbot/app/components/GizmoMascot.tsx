// Mascota original "Gizmo": criaturita peluda de orejas grandes (estilo fennec).
// Diseño propio — NO reproduce ningún personaje con derechos de autor.
// Animada con SMIL: flota, parpadea y mueve las orejas.

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
      aria-label="Gizmo, la mascota gamer"
    >
      <g>
        {/* Flotación suave */}
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

        {/* Sombra/glow */}
        <ellipse cx="60" cy="113" rx="24" ry="4.5" fill="#9D4EDD" opacity="0.30">
          <animate attributeName="rx" values="24;20;24" dur="3s" repeatCount="indefinite" />
        </ellipse>

        {/* Oreja izquierda */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="-12 49 52; -5 49 52; -12 49 52"
            dur="2.6s"
            repeatCount="indefinite"
          />
          <path d="M49 54 C 38 44 27 27 29 15 C 41 21 51 40 53 53 Z" fill="#FFE7C2" />
          <path d="M48 51 C 39 43 32 29 33 20 C 42 26 49 41 50 50 Z" fill="#FF77C2" />
          <path d="M29 15 C 31 19 34 23 35 26 C 32 24 30 20 29 15 Z" fill="#E0A977" />
        </g>

        {/* Oreja derecha */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="12 71 52; 5 71 52; 12 71 52"
            dur="2.6s"
            repeatCount="indefinite"
          />
          <path d="M71 54 C 82 44 93 27 91 15 C 79 21 69 40 67 53 Z" fill="#FFE7C2" />
          <path d="M72 51 C 81 43 88 29 87 20 C 78 26 71 41 70 50 Z" fill="#FF77C2" />
          <path d="M91 15 C 89 19 86 23 85 26 C 88 24 90 20 91 15 Z" fill="#E0A977" />
        </g>

        {/* Mechones de pelo (frente) */}
        <path d="M48 48 L 52 36 L 56 47 Z" fill="#FFE7C2" />
        <path d="M58 47 L 60 33 L 64 47 Z" fill="#FFE7C2" />
        <path d="M64 48 L 69 37 L 72 49 Z" fill="#FFE7C2" />

        {/* Mechones laterales (pelaje de las mejillas) */}
        <path d="M30 66 L 22 70 L 31 74 Z" fill="#FFE7C2" />
        <path d="M31 76 L 24 82 L 33 83 Z" fill="#FFE7C2" />
        <path d="M90 66 L 98 70 L 89 74 Z" fill="#FFE7C2" />
        <path d="M89 76 L 96 82 L 87 83 Z" fill="#FFE7C2" />

        {/* Cara */}
        <ellipse cx="60" cy="72" rx="32" ry="29" fill="#FFE7C2" />
        {/* Hocico claro */}
        <ellipse cx="60" cy="79" rx="16" ry="12" fill="#FFF7EA" />

        {/* Cachetes */}
        <ellipse cx="41" cy="79" rx="6" ry="4" fill="#FF77C2" opacity="0.55" />
        <ellipse cx="79" cy="79" rx="6" ry="4" fill="#FF77C2" opacity="0.55" />

        {/* Bigotes */}
        <g stroke="#E0A977" strokeWidth="1.4" strokeLinecap="round" opacity="0.8">
          <path d="M44 76 L 30 73" fill="none" />
          <path d="M44 80 L 31 81" fill="none" />
          <path d="M76 76 L 90 73" fill="none" />
          <path d="M76 80 L 89 81" fill="none" />
        </g>

        {/* Ojo izquierdo */}
        <g>
          <ellipse cx="49" cy="67" rx="8" ry="9.5" fill="#ffffff">
            <animate attributeName="ry" values="9.5;9.5;1;9.5" keyTimes="0;0.9;0.95;1" dur="4.5s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="49" cy="68" rx="4.6" ry="5.6" fill="#241a3f">
            <animate attributeName="ry" values="5.6;5.6;1;5.6" keyTimes="0;0.9;0.95;1" dur="4.5s" repeatCount="indefinite" />
          </ellipse>
          <circle cx="47" cy="65" r="1.8" fill="#ffffff" />
          <circle cx="51" cy="70" r="1.1" fill="#2DE2E6" />
        </g>

        {/* Ojo derecho */}
        <g>
          <ellipse cx="71" cy="67" rx="8" ry="9.5" fill="#ffffff">
            <animate attributeName="ry" values="9.5;9.5;1;9.5" keyTimes="0;0.9;0.95;1" dur="4.5s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="71" cy="68" rx="4.6" ry="5.6" fill="#241a3f">
            <animate attributeName="ry" values="5.6;5.6;1;5.6" keyTimes="0;0.9;0.95;1" dur="4.5s" repeatCount="indefinite" />
          </ellipse>
          <circle cx="69" cy="65" r="1.8" fill="#ffffff" />
          <circle cx="73" cy="70" r="1.1" fill="#2DE2E6" />
        </g>

        {/* Nariz */}
        <path d="M56 73 Q 60 70 64 73 Q 62 78 60 79 Q 58 78 56 73 Z" fill="#FF2E97" />
        {/* Boca */}
        <path d="M60 79 Q 56 84 52 81 M60 79 Q 64 84 68 81" stroke="#241a3f" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

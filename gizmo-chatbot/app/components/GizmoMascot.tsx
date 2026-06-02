// Mascota "Gizmo": un robot simpático. Diseño propio y original.
// Animado con SMIL: flota, parpadean los ojos LED y la antena rebota.
// Paleta: mezcla verde + azul neón (teal / aqua / cian).

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
      aria-label="Gizmo, el robot"
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
        <ellipse cx="60" cy="113" rx="26" ry="4.5" fill="#1C9FD0" opacity="0.30">
          <animate attributeName="rx" values="26;21;26" dur="3s" repeatCount="indefinite" />
        </ellipse>

        {/* Antena con luz que rebota */}
        <line x1="60" y1="30" x2="60" y2="18" stroke="#2c5a55" strokeWidth="3" strokeLinecap="round" />
        <circle cx="60" cy="16" r="4.5" fill="#36F0A8">
          <animate attributeName="cy" values="16;11;16" dur="1.6s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1; 0.45 0 0.55 1" keyTimes="0;0.5;1" />
          <animate attributeName="opacity" values="1;0.6;1" dur="1.6s" repeatCount="indefinite" />
        </circle>

        {/* Orejas tipo audífono */}
        <rect x="18" y="50" width="10" height="22" rx="5" fill="#2c5a55" />
        <circle cx="23" cy="61" r="3" fill="#35D6FF" />
        <rect x="92" y="50" width="10" height="22" rx="5" fill="#2c5a55" />
        <circle cx="97" cy="61" r="3" fill="#35D6FF" />

        {/* Cabeza */}
        <rect x="28" y="30" width="64" height="58" rx="18" fill="#2F6E72" stroke="#173a3c" strokeWidth="2" />
        {/* Brillo metálico */}
        <rect x="34" y="34" width="52" height="12" rx="6" fill="#4f9aa0" opacity="0.45" />
        {/* Tornillos */}
        <circle cx="35" cy="38" r="1.8" fill="#173a3c" />
        <circle cx="85" cy="38" r="1.8" fill="#173a3c" />

        {/* Pantalla / cara */}
        <rect x="37" y="42" width="46" height="38" rx="13" fill="#06141A" stroke="#35D6FF" strokeWidth="1.5" strokeOpacity="0.45" />

        {/* Ojo izquierdo (LED) */}
        <g>
          <ellipse cx="49" cy="57" rx="6" ry="7" fill="#36F0A8">
            <animate attributeName="ry" values="7;7;0.8;7" keyTimes="0;0.9;0.95;1" dur="4.5s" repeatCount="indefinite" />
          </ellipse>
          <circle cx="47" cy="55" r="1.6" fill="#ffffff" opacity="0.85" />
        </g>

        {/* Ojo derecho (LED) */}
        <g>
          <ellipse cx="71" cy="57" rx="6" ry="7" fill="#36F0A8">
            <animate attributeName="ry" values="7;7;0.8;7" keyTimes="0;0.9;0.95;1" dur="4.5s" repeatCount="indefinite" />
          </ellipse>
          <circle cx="69" cy="55" r="1.6" fill="#ffffff" opacity="0.85" />
        </g>

        {/* Mejillas LED */}
        <circle cx="42" cy="66" r="2.2" fill="#1FD9A0" opacity="0.85" />
        <circle cx="78" cy="66" r="2.2" fill="#1FD9A0" opacity="0.85" />

        {/* Sonrisa LED */}
        <path d="M50 69 Q 60 76 70 69" stroke="#35D6FF" strokeWidth="2.6" fill="none" strokeLinecap="round" />

        {/* Cuello / base */}
        <rect x="50" y="86" width="20" height="6" rx="3" fill="#2c5a55" />
      </g>
    </svg>
  );
}

export default function FlowEdge() {
  return (
    <div className="flex flex-col items-center py-1">
      <svg width="2" height="32" className="overflow-visible">
        <line x1="1" y1="0" x2="1" y2="32" stroke="#29F8D4" strokeWidth="2" strokeDasharray="4 4" opacity="0.3">
          <animate attributeName="stroke-dashoffset" values="8;0" dur="1s" repeatCount="indefinite" />
        </line>
      </svg>
      <svg width="12" height="8" viewBox="0 0 12 8">
        <path d="M6 8L0 0h12z" fill="#29F8D4" opacity="0.3" />
      </svg>
    </div>
  );
}

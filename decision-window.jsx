import { useState, useEffect } from "react";

const stages = [
  {
    id: 0,
    label: "INTRO",
    title: "The Decision Window",
    subtitle: "The moment that separates intelligent players from the rest",
    description:
      "Every time the ball travels toward a player, a window opens. A brief moment where everything that happens next is decided. Most players waste it. Game intelligent players own it.",
    icon: null,
    mistake: null,
    fix: null,
    color: "#E63946",
  },
  {
    id: 1,
    label: "01 — READ",
    title: "Read",
    subtitle: "See the picture before the ball arrives",
    description:
      "The window opens the moment the ball leaves the previous player's foot. Before it arrives, the intelligent player is already scanning — building a picture of what is around them.",
    mistake: {
      label: "Common Mistake",
      text: "Standing square on. Body facing the ball directly, which cuts off the visual field. The player can only see what is in front of them — not the space, not the teammates, not the press.",
    },
    fix: {
      label: "What Good Looks Like",
      text: "Side-on body position. One shoulder open to the field. This single adjustment doubles what the player can see before the ball even arrives.",
    },
    color: "#E63946",
    visual: "read",
  },
  {
    id: 2,
    label: "02 — DECIDE",
    title: "Decide",
    subtitle: "The next action is chosen before the ball arrives",
    description:
      "Reading without deciding is just watching. The intelligent player uses the picture they have built to make a decision — before the ball reaches them. The window is already closing.",
    mistake: {
      label: "Common Mistake",
      text: "Not having a picture before the ball arrives. The player waits for the ball to reach them before they start thinking. By then the window has closed and pressure has arrived.",
    },
    fix: {
      label: "What Good Looks Like",
      text: "The decision is made in transit. By the time the ball arrives, the player already knows what they are doing next. Their first touch sets up the action they decided on before the ball got there.",
    },
    color: "#E63946",
    visual: "decide",
  },
  {
    id: 3,
    label: "03 — EXECUTE",
    title: "Execute",
    subtitle: "The right touch makes the decision possible",
    description:
      "Execution is where the decision either lives or dies. A poor first touch collapses everything that came before it — no matter how good the read or the decision was.",
    mistake: {
      label: "Common Mistake",
      text: "Receiving on the wrong foot when the intention is to go forward. Taking the ball on the front foot forces an extra touch, which delays the situation, invites pressure, and wastes the window entirely.",
    },
    fix: {
      label: "What Good Looks Like",
      text: "Receive on the back foot when moving forward. One touch, into space, in the direction of the decision already made. The window stays open. The game moves at the player's pace, not against them.",
    },
    color: "#E63946",
    visual: "execute",
  },
  {
    id: 4,
    label: "SUMMARY",
    title: "Own the Window",
    subtitle: "Three stages. One moment. Game intelligence.",
    description:
      "The Decision Window is not a talent. It is a skill. Players who read early, decide before arrival, and execute with the right touch consistently perform above their level — in any game, against any opponent.",
    icon: null,
    mistake: null,
    fix: null,
    color: "#E63946",
    isSummary: true,
  },
];

const BodyDiagram = ({ type }) => {
  if (type === "read") {
    return (
      <svg viewBox="0 0 200 220" className="w-full h-full" style={{ maxHeight: 180 }}>
        {/* Pitch lines */}
        <rect x="10" y="10" width="180" height="200" rx="4" fill="none" stroke="#ffffff10" strokeWidth="1" />
        {/* Square player - mistake */}
        <g opacity="0.9">
          <circle cx="55" cy="80" r="14" fill="#E6394620" stroke="#E63946" strokeWidth="1.5" />
          <line x1="55" y1="94" x2="55" y2="130" stroke="#E63946" strokeWidth="2" />
          <line x1="35" y1="108" x2="75" y2="108" stroke="#E63946" strokeWidth="2" />
          <line x1="45" y1="150" x2="55" y2="130" stroke="#E63946" strokeWidth="2" />
          <line x1="65" y1="150" x2="55" y2="130" stroke="#E63946" strokeWidth="2" />
          {/* Vision cone - narrow */}
          <path d="M55,80 L25,40 L85,40 Z" fill="#E6394615" stroke="#E63946" strokeWidth="0.5" strokeDasharray="3,2" />
          <text x="55" y="170" textAnchor="middle" fill="#E63946" fontSize="9" fontFamily="monospace">SQUARE ON</text>
          <text x="55" y="182" textAnchor="middle" fill="#E6394690" fontSize="7.5" fontFamily="monospace">Limited vision</text>
        </g>
        {/* Divider */}
        <line x1="100" y1="20" x2="100" y2="195" stroke="#ffffff15" strokeWidth="1" strokeDasharray="4,3" />
        {/* Side-on player - correct */}
        <g opacity="0.9">
          <circle cx="145" cy="80" r="14" fill="#00ff8820" stroke="#00ff88" strokeWidth="1.5" />
          {/* Rotated body */}
          <line x1="145" y1="94" x2="145" y2="130" stroke="#00ff88" strokeWidth="2" />
          <line x1="128" y1="105" x2="162" y2="111" stroke="#00ff88" strokeWidth="2" />
          <line x1="138" y1="150" x2="145" y2="130" stroke="#00ff88" strokeWidth="2" />
          <line x1="155" y1="150" x2="145" y2="130" stroke="#00ff88" strokeWidth="2" />
          {/* Vision cone - wide */}
          <path d="M145,80 L100,30 L190,55 Z" fill="#00ff8812" stroke="#00ff88" strokeWidth="0.5" strokeDasharray="3,2" />
          <text x="145" y="170" textAnchor="middle" fill="#00ff88" fontSize="9" fontFamily="monospace">SIDE ON</text>
          <text x="145" y="182" textAnchor="middle" fill="#00ff8890" fontSize="7.5" fontFamily="monospace">Full picture</text>
        </g>
        {/* Labels */}
        <text x="55" y="205" textAnchor="middle" fill="#ffffff40" fontSize="7" fontFamily="monospace">✗ MISTAKE</text>
        <text x="145" y="205" textAnchor="middle" fill="#ffffff40" fontSize="7" fontFamily="monospace">✓ INTELLIGENT</text>
      </svg>
    );
  }

  if (type === "decide") {
    return (
      <svg viewBox="0 0 200 220" className="w-full h-full" style={{ maxHeight: 180 }}>
        <rect x="10" y="10" width="180" height="200" rx="4" fill="none" stroke="#ffffff10" strokeWidth="1" />
        {/* Timeline */}
        <line x1="20" y1="110" x2="180" y2="110" stroke="#ffffff20" strokeWidth="1" />
        {/* Ball travel */}
        <circle cx="30" cy="110" r="7" fill="#E63946" opacity="0.9" />
        <text x="30" y="128" textAnchor="middle" fill="#ffffff60" fontSize="7" fontFamily="monospace">BALL LEAVES</text>
        {/* Arrow */}
        <line x1="42" y1="110" x2="155" y2="110" stroke="#ffffff30" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#arr)" />
        <defs>
          <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#ffffff30" />
          </marker>
          <marker id="arr2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#00ff88" />
          </marker>
        </defs>
        {/* Receiving player */}
        <circle cx="165" cy="110" r="12" fill="#ffffff10" stroke="#ffffff40" strokeWidth="1.5" />
        {/* Window zone */}
        <rect x="42" y="75" width="113" height="25" rx="3" fill="#E6394610" stroke="#E63946" strokeWidth="0.8" strokeDasharray="3,2" />
        <text x="98" y="87" textAnchor="middle" fill="#E63946" fontSize="8" fontFamily="monospace">THE DECISION WINDOW</text>
        {/* Mistake scenario */}
        <g>
          <rect x="20" y="140" width="75" height="55" rx="3" fill="#E6394608" stroke="#E6394640" strokeWidth="1" />
          <text x="57" y="154" textAnchor="middle" fill="#E63946" fontSize="7.5" fontFamily="monospace">✗ WAITS</text>
          <text x="57" y="166" textAnchor="middle" fill="#ffffff50" fontSize="6.5" fontFamily="monospace">Ball arrives first.</text>
          <text x="57" y="177" textAnchor="middle" fill="#ffffff50" fontSize="6.5" fontFamily="monospace">Window closed.</text>
          <text x="57" y="188" textAnchor="middle" fill="#ffffff50" fontSize="6.5" fontFamily="monospace">Pressure arrives.</text>
        </g>
        {/* Good scenario */}
        <g>
          <rect x="105" y="140" width="75" height="55" rx="3" fill="#00ff8808" stroke="#00ff8840" strokeWidth="1" />
          <text x="142" y="154" textAnchor="middle" fill="#00ff88" fontSize="7.5" fontFamily="monospace">✓ DECIDES</text>
          <text x="142" y="166" textAnchor="middle" fill="#ffffff50" fontSize="6.5" fontFamily="monospace">In transit.</text>
          <text x="142" y="177" textAnchor="middle" fill="#ffffff50" fontSize="6.5" fontFamily="monospace">Arrives knowing</text>
          <text x="142" y="188" textAnchor="middle" fill="#ffffff50" fontSize="6.5" fontFamily="monospace">next action.</text>
        </g>
      </svg>
    );
  }

  if (type === "execute") {
    return (
      <svg viewBox="0 0 200 220" className="w-full h-full" style={{ maxHeight: 180 }}>
        <rect x="10" y="10" width="180" height="200" rx="4" fill="none" stroke="#ffffff10" strokeWidth="1" />
        {/* Mistake - front foot */}
        <g>
          <text x="55" y="28" textAnchor="middle" fill="#E63946" fontSize="8" fontFamily="monospace">✗ FRONT FOOT</text>
          {/* Player body */}
          <circle cx="55" cy="55" r="11" fill="#E6394620" stroke="#E63946" strokeWidth="1.5" />
          <line x1="55" y1="66" x2="55" y2="95" stroke="#E63946" strokeWidth="2" />
          <line x1="38" y1="78" x2="72" y2="78" stroke="#E63946" strokeWidth="2" />
          {/* Front foot highlighted */}
          <line x1="55" y1="95" x2="45" y2="115" stroke="#E63946" strokeWidth="2" />
          <line x1="55" y1="95" x2="65" y2="115" stroke="#ffffff40" strokeWidth="2" />
          {/* Ball arriving at front foot */}
          <circle cx="38" cy="118" r="6" fill="#E63946" opacity="0.8" />
          <line x1="44" y1="115" x2="44" y2="115" stroke="#E63946" strokeWidth="1" />
          {/* Extra touch arrows */}
          <path d="M44,115 Q30,130 44,140" fill="none" stroke="#E63946" strokeWidth="1.2" strokeDasharray="3,2" markerEnd="url(#ra)" />
          <path d="M44,140 Q60,148 72,138" fill="none" stroke="#E63946" strokeWidth="1.2" strokeDasharray="3,2" markerEnd="url(#ra)" />
          <defs>
            <marker id="ra" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
              <path d="M0,0 L5,2.5 L0,5 Z" fill="#E63946" />
            </marker>
            <marker id="ga" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
              <path d="M0,0 L5,2.5 L0,5 Z" fill="#00ff88" />
            </marker>
          </defs>
          <text x="30" y="158" fill="#E6394690" fontSize="6.5" fontFamily="monospace">Extra touches.</text>
          <text x="30" y="168" fill="#E6394690" fontSize="6.5" fontFamily="monospace">Window closed.</text>
          <text x="30" y="178" fill="#E6394690" fontSize="6.5" fontFamily="monospace">Pressure wins.</text>
        </g>
        {/* Divider */}
        <line x1="100" y1="20" x2="100" y2="195" stroke="#ffffff15" strokeWidth="1" strokeDasharray="4,3" />
        {/* Good - back foot */}
        <g>
          <text x="148" y="28" textAnchor="middle" fill="#00ff88" fontSize="8" fontFamily="monospace">✓ BACK FOOT</text>
          <circle cx="148" cy="55" r="11" fill="#00ff8820" stroke="#00ff88" strokeWidth="1.5" />
          <line x1="148" y1="66" x2="148" y2="95" stroke="#00ff88" strokeWidth="2" />
          <line x1="131" y1="78" x2="165" y2="78" stroke="#00ff88" strokeWidth="2" />
          {/* Back foot highlighted */}
          <line x1="148" y1="95" x2="158" y2="115" stroke="#00ff88" strokeWidth="2.5" />
          <line x1="148" y1="95" x2="138" y2="115" stroke="#ffffff40" strokeWidth="2" />
          {/* Ball arriving at back foot */}
          <circle cx="165" cy="118" r="6" fill="#00ff88" opacity="0.8" />
          {/* Clean forward arrow */}
          <path d="M160,112 L115,85" fill="none" stroke="#00ff88" strokeWidth="1.5" markerEnd="url(#ga)" />
          <text x="118" y="158" fill="#00ff8890" fontSize="6.5" fontFamily="monospace">One touch.</text>
          <text x="118" y="168" fill="#00ff8890" fontSize="6.5" fontFamily="monospace">Into space.</text>
          <text x="118" y="178" fill="#00ff8890" fontSize="6.5" fontFamily="monospace">Window stays open.</text>
        </g>
      </svg>
    );
  }
  return null;
};

const SummaryCard = ({ stage, index }) => {
  const colors = ["#E63946", "#ff6b35", "#00ff88"];
  const color = colors[index];
  return (
    <div
      style={{
        border: `1px solid ${color}30`,
        background: `${color}08`,
        borderRadius: 8,
        padding: "16px 20px",
        flex: 1,
      }}
    >
      <div style={{ color, fontSize: 10, fontFamily: "monospace", letterSpacing: 2, marginBottom: 6 }}>
        0{index + 1}
      </div>
      <div style={{ color: "#ffffff", fontSize: 15, fontWeight: 700, marginBottom: 6 }}>
        {stage.title}
      </div>
      <div style={{ color: "#ffffff80", fontSize: 11, lineHeight: 1.6 }}>
        {stage.subtitle}
      </div>
    </div>
  );
};

export default function DecisionWindow() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(true);
  const [windowPulse, setWindowPulse] = useState(false);

  const stage = stages[current];

  useEffect(() => {
    const t = setTimeout(() => setWindowPulse(true), 600);
    const t2 = setTimeout(() => setWindowPulse(false), 1200);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, [current]);

  const goTo = (index) => {
    if (animating || index === current) return;
    setAnimating(true);
    setVisible(false);
    setTimeout(() => {
      setCurrent(index);
      setVisible(true);
      setAnimating(false);
    }, 280);
  };

  const next = () => { if (current < stages.length - 1) goTo(current + 1); };
  const prev = () => { if (current > 0) goTo(current - 1); };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Georgia', serif",
        color: "#ffffff",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #E6394608 0%, transparent 50%), radial-gradient(circle at 80% 80%, #E6394605 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 32px",
          borderBottom: "1px solid #ffffff10",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#E63946",
              boxShadow: "0 0 8px #E63946",
            }}
          />
          <span
            style={{
              fontSize: 11,
              letterSpacing: 3,
              color: "#ffffff60",
              fontFamily: "monospace",
              textTransform: "uppercase",
            }}
          >
            Coach Kurtis
          </span>
        </div>
        <div
          style={{
            fontSize: 10,
            letterSpacing: 2,
            color: "#E63946",
            fontFamily: "monospace",
            textTransform: "uppercase",
          }}
        >
          Game Intelligence Framework
        </div>
        {/* Progress dots */}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {stages.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === current ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background: i === current ? "#E63946" : i < current ? "#E6394650" : "#ffffff20",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "32px 48px",
          position: "relative",
          zIndex: 2,
          transition: "opacity 0.28s ease",
          opacity: visible ? 1 : 0,
        }}
      >
        {/* Stage label */}
        {stage.label && (
          <div
            style={{
              fontSize: 10,
              letterSpacing: 4,
              color: "#E63946",
              fontFamily: "monospace",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            {stage.label}
          </div>
        )}

        {/* Title */}
        <h1
          style={{
            fontSize: stage.id === 0 || stage.isSummary ? 48 : 42,
            fontWeight: 700,
            margin: "0 0 8px 0",
            lineHeight: 1.1,
            letterSpacing: -1,
          }}
        >
          {stage.title}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 16,
            color: "#E63946",
            margin: "0 0 20px 0",
            fontStyle: "italic",
            letterSpacing: 0.3,
          }}
        >
          {stage.subtitle}
        </p>

        {/* Description */}
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.75,
            color: "#ffffffb0",
            maxWidth: 600,
            margin: "0 0 28px 0",
          }}
        >
          {stage.description}
        </p>

        {/* Stage-specific content */}
        {stage.visual && (
          <div style={{ display: "flex", gap: 24, flex: 1, alignItems: "flex-start" }}>
            {/* Visual diagram */}
            <div
              style={{
                width: 200,
                height: 200,
                background: "#ffffff05",
                border: "1px solid #ffffff15",
                borderRadius: 8,
                padding: 8,
                flexShrink: 0,
              }}
            >
              <BodyDiagram type={stage.visual} />
            </div>

            {/* Mistake + Fix cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
              {stage.mistake && (
                <div
                  style={{
                    background: "#E6394610",
                    border: "1px solid #E6394635",
                    borderRadius: 8,
                    padding: "16px 20px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 9,
                      letterSpacing: 3,
                      color: "#E63946",
                      fontFamily: "monospace",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    ✗ {stage.mistake.label}
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: "#ffffffa0", margin: 0 }}>
                    {stage.mistake.text}
                  </p>
                </div>
              )}
              {stage.fix && (
                <div
                  style={{
                    background: "#00ff8808",
                    border: "1px solid #00ff8830",
                    borderRadius: 8,
                    padding: "16px 20px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 9,
                      letterSpacing: 3,
                      color: "#00ff88",
                      fontFamily: "monospace",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    ✓ {stage.fix.label}
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: "#ffffffa0", margin: 0 }}>
                    {stage.fix.text}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Summary cards */}
        {stage.isSummary && (
          <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
            {[stages[1], stages[2], stages[3]].map((s, i) => (
              <SummaryCard key={i} stage={s} index={i} />
            ))}
          </div>
        )}

        {/* Summary CTA */}
        {stage.isSummary && (
          <div
            style={{
              background: "#E6394615",
              border: "1px solid #E6394640",
              borderRadius: 8,
              padding: "16px 24px",
              maxWidth: 560,
            }}
          >
            <div
              style={{
                fontSize: 9,
                letterSpacing: 3,
                color: "#E63946",
                fontFamily: "monospace",
                marginBottom: 8,
              }}
            >
              FREE RESOURCE
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#ffffffb0", margin: 0 }}>
              Get the Decision Window cheat sheet — one page, all three stages, what to look for at
              the touchline. Free inside the Game Intelligence Lab.
            </p>
            <div
              style={{
                marginTop: 10,
                fontSize: 11,
                color: "#E63946",
                fontFamily: "monospace",
                letterSpacing: 2,
              }}
            >
              skool.com/ngc-player-lab-5149 →
            </div>
          </div>
        )}

        {/* Intro window animation */}
        {stage.id === 0 && (
          <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
            {["Read", "Decide", "Execute"].map((label, i) => (
              <div
                key={i}
                onClick={() => goTo(i + 1)}
                style={{
                  padding: "12px 24px",
                  border: "1px solid #ffffff20",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontSize: 13,
                  color: "#ffffff80",
                  fontFamily: "monospace",
                  letterSpacing: 1,
                  transition: "all 0.2s",
                  background: "#ffffff05",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#E63946";
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.background = "#E6394615";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#ffffff20";
                  e.currentTarget.style.color = "#ffffff80";
                  e.currentTarget.style.background = "#ffffff05";
                }}
              >
                0{i + 1} — {label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 32px",
          borderTop: "1px solid #ffffff10",
          position: "relative",
          zIndex: 2,
        }}
      >
        <button
          onClick={prev}
          disabled={current === 0}
          style={{
            padding: "10px 24px",
            background: "transparent",
            border: "1px solid #ffffff20",
            color: current === 0 ? "#ffffff20" : "#ffffff60",
            borderRadius: 4,
            cursor: current === 0 ? "default" : "pointer",
            fontSize: 11,
            fontFamily: "monospace",
            letterSpacing: 2,
            transition: "all 0.2s",
          }}
        >
          ← PREV
        </button>

        {/* Window indicator */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: 9,
              letterSpacing: 3,
              color: "#ffffff30",
              fontFamily: "monospace",
              marginBottom: 4,
            }}
          >
            {current + 1} of {stages.length}
          </div>
          <div
            style={{
              width: 120,
              height: 2,
              background: "#ffffff10",
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${((current + 1) / stages.length) * 100}%`,
                height: "100%",
                background: "#E63946",
                transition: "width 0.3s ease",
                boxShadow: "0 0 6px #E63946",
              }}
            />
          </div>
        </div>

        <button
          onClick={next}
          disabled={current === stages.length - 1}
          style={{
            padding: "10px 24px",
            background: current === stages.length - 1 ? "transparent" : "#E63946",
            border: "1px solid #E63946",
            color: current === stages.length - 1 ? "#E6394640" : "#ffffff",
            borderRadius: 4,
            cursor: current === stages.length - 1 ? "default" : "pointer",
            fontSize: 11,
            fontFamily: "monospace",
            letterSpacing: 2,
            transition: "all 0.2s",
            borderColor: current === stages.length - 1 ? "#E6394630" : "#E63946",
          }}
        >
          NEXT →
        </button>
      </div>
    </div>
  );
}

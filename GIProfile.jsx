import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#0a0a0a",
  card: "#111111",
  cardBorder: "#1e1e1e",
  red: "#e63329",
  redGlow: "rgba(230, 51, 41, 0.3)",
  white: "#ffffff",
  grey: "#888888",
  lightGrey: "#cccccc",
  dimGrey: "#333333",
};

const questions = [
  {
    dimension: "Decision Speed",
    id: "ds1",
    text: "When your child receives the ball under pressure, they typically...",
    options: [
      { text: "Freeze and play it safe", score: 1 },
      { text: "Rush and make a quick decision without thinking", score: 2 },
      { text: "Take a moment then commit decisively", score: 4 },
      { text: "It depends heavily on the situation", score: 3 },
    ],
  },
  {
    dimension: "Decision Speed",
    id: "ds2",
    text: "When given a choice between a safe pass and a riskier forward option, your child usually...",
    options: [
      { text: "Always takes the safe option", score: 1 },
      { text: "Always goes for the risky option regardless", score: 2 },
      { text: "Reads the situation and chooses accordingly", score: 4 },
      { text: "Hesitates and often loses the ball while deciding", score: 1 },
    ],
  },
  {
    dimension: "Scanning & Awareness",
    id: "sa1",
    text: "Before receiving the ball, your child...",
    options: [
      { text: "Rarely looks around, reacts when it arrives", score: 1 },
      { text: "Sometimes glances but not consistently", score: 2 },
      { text: "Regularly checks their surroundings before the ball arrives", score: 4 },
      { text: "Only scans when they feel under pressure", score: 2 },
    ],
  },
  {
    dimension: "Scanning & Awareness",
    id: "sa2",
    text: "In terms of positioning and movement off the ball, your child...",
    options: [
      { text: "Tends to stand and watch play develop", score: 1 },
      { text: "Moves but often into the wrong spaces", score: 2 },
      { text: "Shows good awareness of space and moves to help teammates", score: 4 },
      { text: "Is unpredictable, good sometimes and absent others", score: 2 },
    ],
  },
  {
    dimension: "Composure Under Pressure",
    id: "cp1",
    text: "After making a mistake in a game, your child...",
    options: [
      { text: "Visibly shuts down and avoids the ball", score: 1 },
      { text: "Gets frustrated and rushes their next decision", score: 2 },
      { text: "Resets quickly and stays in the game mentally", score: 4 },
      { text: "Varies a lot depending on the importance of the game", score: 2 },
    ],
  },
  {
    dimension: "Composure Under Pressure",
    id: "cp2",
    text: "In high pressure moments, big games and tight scores, your child...",
    options: [
      { text: "Drops to a much lower level than in training", score: 1 },
      { text: "Performs similarly to normal", score: 3 },
      { text: "Sometimes raises their game", score: 4 },
      { text: "Goes quiet and lets others take responsibility", score: 1 },
    ],
  },
  {
    dimension: "Game Reading",
    id: "gr1",
    text: "When their team is struggling in a game, your child...",
    options: [
      { text: "Doesn't seem to notice or adjust", score: 1 },
      { text: "Gets louder and tries harder without a clear change in approach", score: 2 },
      { text: "Shifts their positioning or role to try to help", score: 4 },
      { text: "Looks to the coach or parent for direction", score: 1 },
    ],
  },
  {
    dimension: "Game Reading",
    id: "gr2",
    text: "In terms of understanding what the game needs from them positionally, your child...",
    options: [
      { text: "Needs constant instruction on where to be", score: 1 },
      { text: "Has a basic understanding but needs reminders", score: 2 },
      { text: "Generally positions well without being told", score: 3 },
      { text: "Shows real understanding of space and teammates' movements", score: 4 },
    ],
  },
];

const dimensionInfo = {
  "Decision Speed": {
    short: "DS",
    color: "#e63329",
    description: "How quickly and confidently your child commits to decisions under pressure.",
    lowNote: "With the right environment, decision speed develops quickly. This is coachable.",
    highNote: "Strong decision-making under pressure. A real asset in competitive football.",
  },
  "Scanning & Awareness": {
    short: "SA",
    color: "#c0392b",
    description: "How well your child gathers information before the ball arrives.",
    lowNote: "Awareness is one of the most trainable skills in the game. Huge room for growth here.",
    highNote: "Excellent spatial awareness. Your child sees the game before it happens.",
  },
  "Composure Under Pressure": {
    short: "CP",
    color: "#e74c3c",
    description: "How your child responds emotionally and mentally to mistakes and pressure.",
    lowNote: "Composure is built through environment, not instruction. This is where we focus.",
    highNote: "Strong mental reset ability. Performs when it matters most.",
  },
  "Game Reading": {
    short: "GR",
    color: "#ff6b6b",
    description: "Your child's ability to understand what the game requires from them moment to moment.",
    lowNote: "Game intelligence develops through the right training environment. This is our speciality.",
    highNote: "Outstanding game intelligence. Reads situations most players their age miss.",
  },
};

const profileTypes = [
  {
    name: "The Instinctive Athlete",
    range: [8, 14],
    summary: "Your child has raw athletic ability and plays on instinct. The next step is developing the intelligence layer, teaching them to read the game before reacting to it. With the right environment, this profile transforms rapidly.",
  },
  {
    name: "The Developing Thinker",
    range: [15, 21],
    summary: "Your child is beginning to engage with the game intelligently but hasn't yet made it consistent. They have the foundation. What they need now is an environment that challenges their decision-making systematically.",
  },
  {
    name: "The Aware Player",
    range: [22, 27],
    summary: "Your child demonstrates real game awareness and is starting to read situations well. Targeted development in their weaker dimensions will unlock the next level of their game significantly.",
  },
  {
    name: "The Game Intelligence Player",
    range: [28, 32],
    summary: "Your child is operating at a high level of game intelligence for their age. They think before they react, read the game well, and perform under pressure. Precision development will take them even further.",
  },
];

function RadarChart({ scores, animated }) {
  const size = 260;
  const center = size / 2;
  const maxRadius = 95;
  const dimensions = Object.keys(scores);
  const n = dimensions.length;

  const getPoint = (index, value, radius) => {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2;
    const r = (value / 4) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const gridLevels = [1, 2, 3, 4];

  const axisPoints = dimensions.map((_, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return {
      x: center + maxRadius * Math.cos(angle),
      y: center + maxRadius * Math.sin(angle),
    };
  });

  const labelPoints = dimensions.map((dim, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const r = maxRadius + 22;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
      label: dimensionInfo[dim].short,
      fullLabel: dim,
    };
  });

  const scorePoints = dimensions.map((dim, i) => getPoint(i, scores[dim], maxRadius));
  const scorePath = scorePoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {gridLevels.map((level) => {
        const pts = dimensions.map((_, i) => getPoint(i, level, maxRadius));
        const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
        return (
          <path
            key={level}
            d={path}
            fill="none"
            stroke={level === 4 ? "#333" : "#222"}
            strokeWidth={level === 4 ? 1.5 : 0.8}
          />
        );
      })}

      {axisPoints.map((pt, i) => (
        <line
          key={i}
          x1={center}
          y1={center}
          x2={pt.x}
          y2={pt.y}
          stroke="#2a2a2a"
          strokeWidth="1"
        />
      ))}

      <path
        d={scorePath}
        fill="rgba(230, 51, 41, 0.15)"
        stroke="#e63329"
        strokeWidth="2"
        style={{
          filter: "drop-shadow(0 0 8px rgba(230, 51, 41, 0.5))",
          transition: animated ? "all 1s ease" : "none",
        }}
      />

      {scorePoints.map((pt, i) => (
        <circle
          key={i}
          cx={pt.x}
          cy={pt.y}
          r="5"
          fill="#e63329"
          style={{ filter: "drop-shadow(0 0 4px rgba(230, 51, 41, 0.8))" }}
        />
      ))}

      {labelPoints.map((pt, i) => (
        <text
          key={i}
          x={pt.x}
          y={pt.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#888"
          fontSize="11"
          fontFamily="monospace"
          fontWeight="600"
        >
          {pt.label}
        </text>
      ))}
    </svg>
  );
}

export default function GIProfile() {
  const [screen, setScreen] = useState("welcome");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [formData, setFormData] = useState({ name: "", email: "", childName: "", childAge: "" });
  const [formErrors, setFormErrors] = useState({});
  const [results, setResults] = useState(null);
  const [animateRadar, setAnimateRadar] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (screen === "results") {
      setTimeout(() => setAnimateRadar(true), 500);
    }
  }, [screen]);

  const handleAnswer = (score) => {
    if (transitioning) return;
    setSelectedOption(score);
    setTransitioning(true);

    setTimeout(() => {
      const q = questions[currentQ];
      setAnswers((prev) => ({
        ...prev,
        [q.id]: { dimension: q.dimension, score },
      }));

      if (currentQ < questions.length - 1) {
        setCurrentQ((prev) => prev + 1);
        setSelectedOption(null);
        setTransitioning(false);
      } else {
        setScreen("gate");
        setSelectedOption(null);
        setTransitioning(false);
      }
    }, 400);
  };

  const calculateResults = () => {
    const dimScores = {};
    const dimCounts = {};

    Object.values(answers).forEach(({ dimension, score }) => {
      if (!dimScores[dimension]) { dimScores[dimension] = 0; dimCounts[dimension] = 0; }
      dimScores[dimension] += score;
      dimCounts[dimension]++;
    });

    const normalized = {};
    Object.keys(dimScores).forEach((dim) => {
      normalized[dim] = dimScores[dim] / dimCounts[dim];
    });

    const total = Object.values(answers).reduce((sum, { score }) => sum + score, 0);
    const profile = profileTypes.find((p) => total >= p.range[0] && total <= p.range[1]) || profileTypes[2];

    const strongest = Object.entries(normalized).sort((a, b) => b[1] - a[1])[0][0];
    const weakest = Object.entries(normalized).sort((a, b) => a[1] - b[1])[0][0];

    return { normalized, total, profile, strongest, weakest };
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Valid email required";
    if (!formData.childName.trim()) errors.childName = "Required";
    if (!formData.childAge.trim()) errors.childAge = "Required";
    return errors;
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Send to MailerLite NGC List
    try {
      await fetch("https://connect.mailerlite.com/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMWM4NjQ3NTQ4N2U1NzNjOTRhMDU2ZDQ4ZGVmMTNhNWRkMjkwNGU4ZDhkNTAyM2RhYzYxNTU0ZDkyNmZjZmY1YmFjNDNmYjZlZmQ4NzNkNmUiLCJpYXQiOjE3ODA1MTY2NzEuNjE3MTgzLCJuYmYiOjE3ODA1MTY2NzEuNjE3MTg2LCJleHAiOjQ5MzYxOTAyNzEuNjEwODIzLCJzdWIiOiIyMDQ1MjQ4Iiwic2NvcGVzIjpbXX0.SRATkLHYS2gfLfh5pxZnrM9lKh9ouhGrmXHBS-pbIIOIYISZixx45SlgzT-aQ1vTaqxr3zndMBPy0beyE5Bb4OmkHtAPC8ndzkLWTj591HT_ZObM42BZBF36ixorsARo6MOlUsj1gIzQwrBEjwCNTzcmsPbN8LNXwcywj2jVad_I0TACn10nWeV1Oem5no7nvj5BKEjLCpee9mnaXRBrOXd3K27-YZ4SrIqr6OcqFty0P8eOckoKuqWheIKanMwZhVqNjI9Dcyz5KLubZXUtYE3vXT03dFAH1uJHUyv76EQBaYxvcRRxgMxPYyIUov697fCZ_AyiC9xpYBVT6RYbUlh9gYr7odJcWkILLepeOOWbiFIajZL20M0XfcAxQZeoCqBzJCOZqqP2-6-LoM8fjGCU2ZrgjxE14AbdDewxHiSHg2Nd1PHzEviAgYqyzaPYhNwlSHRl0P2d1K0E_55EsOu5ziYeb9fUCpIzUf5lQX5x092n-638ytk_bF3EFxmrhIutBEev_3O2_zuIriRsv9I2lr9LQSrV4NbsVp90PxN4ZBgtaNj3i5_ZPWHlX2sP0xHuOmOMfUFobQwY27_JM9vbIX1F5ft_K9SRtIQ08NFYQ8IJFovnAygA9huyDBdV9r1d02YjerInkgTlTAXW04zS0PtC5O6ZMZxyWKD0loM",
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          groups: ["182217535089804715"],
          fields: {
            child_name: formData.childName,
            child_age: formData.childAge,
          },
        }),
      });
    } catch (e) {
      // Silent fail — still show results even if API call fails
      console.error("MailerLite error:", e);
    }

    const r = calculateResults();
    setResults(r);
    setScreen("results");
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Kurtis, I just completed the Game Intelligence Profile for my child and I'd love to find out more about the GI Assessment.`
  );
  const whatsappLink = `https://wa.me/447580433738?text=${whatsappMessage}`;

  const progress = ((currentQ) / questions.length) * 100;

  const styles = {
    container: {
      minHeight: "100vh",
      background: "#0a0a0a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      padding: "20px",
    },
    card: {
      background: "#111",
      border: "1px solid #1e1e1e",
      borderRadius: "16px",
      padding: "40px",
      maxWidth: "560px",
      width: "100%",
      position: "relative",
      overflow: "hidden",
    },
    redLine: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: "linear-gradient(90deg, #e63329, #ff6b6b, #e63329)",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "32px",
    },
    logoCircle: {
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      background: "#000",
      border: "1px solid #e63329",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
    },
    logoText: {
      color: "#fff",
      fontSize: "13px",
      fontWeight: "700",
      letterSpacing: "2px",
      textTransform: "uppercase",
    },
    logoSub: {
      color: "#555",
      fontSize: "10px",
      letterSpacing: "1px",
      textTransform: "uppercase",
    },
    tag: {
      display: "inline-block",
      background: "rgba(230,51,41,0.1)",
      border: "1px solid rgba(230,51,41,0.3)",
      color: "#e63329",
      fontSize: "10px",
      letterSpacing: "2px",
      textTransform: "uppercase",
      padding: "4px 10px",
      borderRadius: "4px",
      marginBottom: "20px",
    },
    h1: {
      color: "#fff",
      fontSize: "28px",
      fontWeight: "800",
      lineHeight: 1.2,
      marginBottom: "16px",
      letterSpacing: "-0.5px",
    },
    body: {
      color: "#888",
      fontSize: "15px",
      lineHeight: 1.7,
      marginBottom: "32px",
    },
    btn: {
      background: "#e63329",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      padding: "16px 32px",
      fontSize: "15px",
      fontWeight: "700",
      cursor: "pointer",
      width: "100%",
      letterSpacing: "0.5px",
      transition: "all 0.2s",
    },
    btnOutline: {
      background: "transparent",
      color: "#e63329",
      border: "1px solid #e63329",
      borderRadius: "8px",
      padding: "16px 32px",
      fontSize: "15px",
      fontWeight: "700",
      cursor: "pointer",
      width: "100%",
      letterSpacing: "0.5px",
      marginTop: "12px",
    },
    progressBar: {
      height: "3px",
      background: "#1e1e1e",
      borderRadius: "2px",
      marginBottom: "32px",
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      background: "linear-gradient(90deg, #e63329, #ff6b6b)",
      borderRadius: "2px",
      transition: "width 0.4s ease",
      width: `${progress}%`,
    },
    qMeta: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "8px",
    },
    qDimension: {
      color: "#e63329",
      fontSize: "10px",
      letterSpacing: "2px",
      textTransform: "uppercase",
      fontWeight: "700",
    },
    qCount: {
      color: "#444",
      fontSize: "12px",
    },
    qText: {
      color: "#fff",
      fontSize: "18px",
      fontWeight: "700",
      lineHeight: 1.4,
      marginBottom: "24px",
    },
    option: (isSelected) => ({
      background: isSelected ? "rgba(230,51,41,0.15)" : "#0f0f0f",
      border: `1px solid ${isSelected ? "#e63329" : "#1e1e1e"}`,
      borderRadius: "10px",
      padding: "14px 18px",
      marginBottom: "10px",
      cursor: "pointer",
      color: isSelected ? "#fff" : "#888",
      fontSize: "14px",
      lineHeight: 1.5,
      transition: "all 0.2s",
      display: "flex",
      alignItems: "center",
      gap: "12px",
    }),
    optionDot: (isSelected) => ({
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      background: isSelected ? "#e63329" : "#333",
      flexShrink: 0,
      transition: "all 0.2s",
    }),
    input: (hasError) => ({
      background: "#0f0f0f",
      border: `1px solid ${hasError ? "#e63329" : "#1e1e1e"}`,
      borderRadius: "8px",
      padding: "14px 16px",
      color: "#fff",
      fontSize: "14px",
      width: "100%",
      marginBottom: "4px",
      outline: "none",
      boxSizing: "border-box",
    }),
    inputRow: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px",
    },
    label: {
      color: "#555",
      fontSize: "11px",
      letterSpacing: "1px",
      textTransform: "uppercase",
      marginBottom: "6px",
      display: "block",
    },
    errorText: {
      color: "#e63329",
      fontSize: "11px",
      marginBottom: "12px",
    },
    fieldWrap: {
      marginBottom: "16px",
    },
    divider: {
      height: "1px",
      background: "#1e1e1e",
      margin: "24px 0",
    },
    profileName: {
      color: "#e63329",
      fontSize: "22px",
      fontWeight: "800",
      letterSpacing: "-0.3px",
      marginBottom: "4px",
    },
    profileChild: {
      color: "#555",
      fontSize: "12px",
      letterSpacing: "1px",
      textTransform: "uppercase",
      marginBottom: "20px",
    },
    radarWrap: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "8px",
    },
    legendWrap: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "8px",
      marginBottom: "24px",
    },
    legendItem: {
      background: "#0f0f0f",
      border: "1px solid #1e1e1e",
      borderRadius: "8px",
      padding: "10px 12px",
    },
    legendLabel: {
      color: "#555",
      fontSize: "9px",
      letterSpacing: "1.5px",
      textTransform: "uppercase",
      marginBottom: "4px",
    },
    legendScore: {
      color: "#fff",
      fontSize: "20px",
      fontWeight: "800",
    },
    legendMax: {
      color: "#333",
      fontSize: "12px",
    },
    summaryBox: {
      background: "#0f0f0f",
      border: "1px solid #1e1e1e",
      borderRadius: "10px",
      padding: "20px",
      marginBottom: "24px",
    },
    summaryText: {
      color: "#888",
      fontSize: "14px",
      lineHeight: 1.7,
    },
    highlightBox: (type) => ({
      background: type === "strength" ? "rgba(230,51,41,0.05)" : "rgba(255,255,255,0.02)",
      border: `1px solid ${type === "strength" ? "rgba(230,51,41,0.2)" : "#1e1e1e"}`,
      borderRadius: "8px",
      padding: "14px 16px",
      marginBottom: "10px",
    }),
    highlightLabel: {
      color: "#444",
      fontSize: "9px",
      letterSpacing: "2px",
      textTransform: "uppercase",
      marginBottom: "4px",
    },
    highlightValue: {
      color: "#fff",
      fontSize: "14px",
      fontWeight: "700",
    },
    highlightNote: {
      color: "#666",
      fontSize: "12px",
      marginTop: "4px",
      lineHeight: 1.5,
    },
    ctaBox: {
      background: "rgba(230,51,41,0.05)",
      border: "1px solid rgba(230,51,41,0.15)",
      borderRadius: "10px",
      padding: "20px",
      marginBottom: "20px",
      textAlign: "center",
    },
    ctaTitle: {
      color: "#fff",
      fontSize: "16px",
      fontWeight: "700",
      marginBottom: "8px",
    },
    ctaText: {
      color: "#666",
      fontSize: "13px",
      lineHeight: 1.6,
      marginBottom: "16px",
    },
    waBtn: {
      background: "#25d366",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      padding: "14px 24px",
      fontSize: "14px",
      fontWeight: "700",
      cursor: "pointer",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      textDecoration: "none",
    },
  };

  const Logo = () => (
    <div style={styles.logo}>
      <div style={styles.logoCircle}>
        <svg width="20" height="20" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="9" fill="none" stroke="#e63329" strokeWidth="1.5" />
          <path d="M10 3 L13 8 L10 6 L7 8 Z" fill="#e63329" opacity="0.8" />
          <path d="M10 17 L13 12 L10 14 L7 12 Z" fill="#e63329" opacity="0.8" />
          <path d="M3 10 L8 7 L6 10 L8 13 Z" fill="#e63329" opacity="0.6" />
          <path d="M17 10 L12 7 L14 10 L12 13 Z" fill="#e63329" opacity="0.6" />
        </svg>
      </div>
      <div>
        <div style={styles.logoText}>Coach Kurtis</div>
        <div style={styles.logoSub}>Game Intelligence Profile</div>
      </div>
    </div>
  );

  if (screen === "welcome") {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.redLine} />
          <Logo />
          <div style={styles.tag}>Free Assessment</div>
          <h1 style={styles.h1}>Discover Your Child's Game Intelligence Profile</h1>
          <p style={styles.body}>
            Answer 8 questions about how your child plays and thinks on the pitch. In 2 minutes you'll receive a personalised profile built on 20 years of player development, showing exactly where their game intelligence stands and where the opportunity lies.
          </p>
          <button
            style={styles.btn}
            onClick={() => setScreen("questions")}
            onMouseOver={(e) => (e.target.style.background = "#c0392b")}
            onMouseOut={(e) => (e.target.style.background = "#e63329")}
          >
            Start the Assessment
          </button>
          <p style={{ color: "#333", fontSize: "12px", textAlign: "center", marginTop: "16px" }}>
            Takes 2 minutes. No football knowledge required
          </p>
        </div>
      </div>
    );
  }

  if (screen === "questions") {
    const q = questions[currentQ];
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.redLine} />
          <Logo />
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${((currentQ) / questions.length) * 100}%` }} />
          </div>
          <div style={styles.qMeta}>
            <span style={styles.qDimension}>{q.dimension}</span>
            <span style={styles.qCount}>{currentQ + 1} of {questions.length}</span>
          </div>
          <div style={styles.qText}>{q.text}</div>
          {q.options.map((opt, i) => (
            <div
              key={i}
              style={styles.option(selectedOption === opt.score && transitioning)}
              onClick={() => handleAnswer(opt.score)}
            >
              <div style={styles.optionDot(selectedOption === opt.score && transitioning)} />
              {opt.text}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (screen === "gate") {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.redLine} />
          <Logo />
          <div style={styles.tag}>Profile Ready</div>
          <h1 style={{ ...styles.h1, fontSize: "22px" }}>Your child's Game Intelligence Profile is ready.</h1>
          <p style={styles.body}>
            Enter your details below to reveal the full profile, including their scores across all four dimensions and a personalised development summary.
          </p>

          <div style={styles.fieldWrap}>
            <label style={styles.label}>Your Name</label>
            <input
              style={styles.input(formErrors.name)}
              placeholder="Your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            {formErrors.name && <div style={styles.errorText}>{formErrors.name}</div>}
          </div>

          <div style={styles.fieldWrap}>
            <label style={styles.label}>Your Email</label>
            <input
              style={styles.input(formErrors.email)}
              placeholder="your@email.com"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {formErrors.email && <div style={styles.errorText}>{formErrors.email}</div>}
          </div>

          <div style={styles.inputRow}>
            <div style={styles.fieldWrap}>
              <label style={styles.label}>Child's Name</label>
              <input
                style={styles.input(formErrors.childName)}
                placeholder="First name"
                value={formData.childName}
                onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
              />
              {formErrors.childName && <div style={styles.errorText}>{formErrors.childName}</div>}
            </div>
            <div style={styles.fieldWrap}>
              <label style={styles.label}>Child's Age</label>
              <input
                style={styles.input(formErrors.childAge)}
                placeholder="Age"
                type="number"
                min="6"
                max="18"
                value={formData.childAge}
                onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
              />
              {formErrors.childAge && <div style={styles.errorText}>{formErrors.childAge}</div>}
            </div>
          </div>

          <button
            style={styles.btn}
            onClick={handleSubmit}
            onMouseOver={(e) => (e.target.style.background = "#c0392b")}
            onMouseOut={(e) => (e.target.style.background = "#e63329")}
          >
            Reveal My Child's Profile
          </button>
          <p style={{ color: "#333", fontSize: "11px", textAlign: "center", marginTop: "12px" }}>
            No spam. Your details are safe with us.
          </p>
        </div>
      </div>
    );
  }

  if (screen === "results" && results) {
    const { normalized, profile, strongest, weakest } = results;
    const dims = Object.keys(normalized);

    return (
      <div style={styles.container}>
        <div style={{ ...styles.card, maxWidth: "600px" }}>
          <div style={styles.redLine} />
          <Logo />

          <div style={styles.tag}>Game Intelligence Profile</div>
          <div style={styles.profileName}>{profile.name}</div>
          <div style={styles.profileChild}>{formData.childName}, Age {formData.childAge}</div>

          <div style={styles.radarWrap}>
            <RadarChart scores={normalized} animated={animateRadar} />
          </div>

          <div style={{ textAlign: "center", marginBottom: "8px" }}>
            <span style={{ color: "#333", fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase" }}>
              DS = Decision Speed &nbsp; SA = Scanning &amp; Awareness &nbsp; CP = Composure &nbsp; GR = Game Reading
            </span>
          </div>

          <div style={styles.legendWrap}>
            {dims.map((dim) => (
              <div key={dim} style={styles.legendItem}>
                <div style={styles.legendLabel}>{dim}</div>
                <div>
                  <span style={styles.legendScore}>{normalized[dim].toFixed(1)}</span>
                  <span style={styles.legendMax}> / 4.0</span>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.divider} />

          <div style={styles.summaryBox}>
            <p style={styles.summaryText}>{profile.summary}</p>
          </div>

          <div style={styles.highlightBox("strength")}>
            <div style={styles.highlightLabel}>Strongest Dimension</div>
            <div style={styles.highlightValue}>{strongest}</div>
            <div style={styles.highlightNote}>{dimensionInfo[strongest].highNote}</div>
          </div>

          <div style={styles.highlightBox("develop")}>
            <div style={styles.highlightLabel}>Key Development Area</div>
            <div style={styles.highlightValue}>{weakest}</div>
            <div style={styles.highlightNote}>{dimensionInfo[weakest].lowNote}</div>
          </div>

          <div style={styles.divider} />

          <div style={styles.ctaBox}>
            <div style={styles.ctaTitle}>Ready to develop {formData.childName}'s game intelligence?</div>
            <div style={styles.ctaText}>
              A GI Assessment is where we sit down, look at {formData.childName} specifically, and map out exactly what their development needs. Based in Birmingham, working with players aged 7 to 18.
            </div>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" style={styles.waBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Book a GI Assessment via WhatsApp
            </a>
          </div>

          <p style={{ color: "#2a2a2a", fontSize: "11px", textAlign: "center" }}>
            Coach Kurtis &nbsp; Birmingham &nbsp; coachkurtis.com
          </p>
        </div>
      </div>
    );
  }

  return null;
}

import { useState, useEffect } from "react";

const MAILERLITE_API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMWM4NjQ3NTQ4N2U1NzNjOTRhMDU2ZDQ4ZGVmMTNhNWRkMjkwNGU4ZDhkNTAyM2RhYzYxNTU0ZDkyNmZjZmY1YmFjNDNmYjZlZmQ4NzNkNmUiLCJpYXQiOjE3ODA1MTY2NzEuNjE3MTgzLCJuYmYiOjE3ODA1MTY2NzEuNjE3MTg2LCJleHAiOjQ5MzYxOTAyNzEuNjEwODIzLCJzdWIiOiIyMDQ1MjQ4Iiwic2NvcGVzIjpbXX0.SRATkLHYS2gfLfh5pxZnrM9lKh9ouhGrmXHBS-pbIIOIYISZixx45SlgzT-aQ1vTaqxr3zndMBPy0beyE5Bb4OmkHtAPC8ndzkLWTj591HT_ZObM42BZBF36ixorsARo6MOlUsj1gIzQwrBEjwCNTzcmsPbN8LNXwcywj2jVad_I0TACn10nWeV1Oem5no7nvj5BKEjLCpee9mnaXRBrOXd3K27-YZ4SrIqr6OcqFty0P8eOckoKuqWheIKanMwZhVqNjI9Dcyz5KLubZXUtYE3vXT03dFAH1uJHUyv76EQBaYxvcRRxgMxPYyIUov697fCZ_AyiC9xpYBVT6RYbUlh9gYr7odJcWkILLepeOOWbiFIajZL20M0XfcAxQZeoCqBzJCOZqqP2-6-LoM8fjGCU2ZrgjxE14AbdDewxHiSHg2Nd1PHzEviAgYqyzaPYhNwlSHRl0P2d1K0E_55EsOu5ziYeb9fUCpIzUf5lQX5x092n-638ytk_bF3EFxmrhIutBEev_3O2_zuIriRsv9I2lr9LQSrV4NbsVp90PxN4ZBgtaNj3i5_ZPWHlX2sP0xHuOmOMfUFobQwY27_JM9vbIX1F5ft_K9SRtIQ08NFYQ8IJFovnAygA9huyDBdV9r1d02YjerInkgTlTAXW04zS0PtC5O6ZMZxyWKD0loM";
const NGC_GROUP_ID = "182217535089804715";
const SKOOL_URL = "https://www.skool.com/ngc-player-lab-5149";

const questions = [
  {
    id: "q1",
    text: "In matches, how does your child perform compared to training?",
    options: [
      { text: "Much quieter and less involved than in training", type: "confidence" },
      { text: "Makes rushed decisions they wouldn't make in training", type: "decision" },
      { text: "Performs similarly but lacks that extra level", type: "environment" },
      { text: "Good some weeks, completely off others", type: "consistency" },
    ],
  },
  {
    id: "q2",
    text: "When your child makes a mistake in a game, what usually happens next?",
    options: [
      { text: "They go quiet and avoid getting involved for a while", type: "confidence" },
      { text: "They rush their next action trying to make up for it", type: "decision" },
      { text: "They reset fairly quickly but the mistake clearly affects them", type: "environment" },
      { text: "It varies a lot, no real pattern", type: "consistency" },
    ],
  },
  {
    id: "q3",
    text: "How would you describe your child's decision making on the ball?",
    options: [
      { text: "They know what to do but don't back themselves to do it", type: "confidence" },
      { text: "They react to what is in front of them rather than reading ahead", type: "decision" },
      { text: "Decent decisions but they need the right environment around them", type: "environment" },
      { text: "Brilliant one game, completely off the next", type: "consistency" },
    ],
  },
  {
    id: "q4",
    text: "When your child plays against stronger opposition, what do you notice?",
    options: [
      { text: "They shrink and take far fewer risks than usual", type: "confidence" },
      { text: "They panic on the ball and stop reading the game", type: "decision" },
      { text: "Their level drops but so does everyone in that environment", type: "environment" },
      { text: "Unpredictable, sometimes they rise to it, sometimes they disappear", type: "consistency" },
    ],
  },
  {
    id: "q5",
    text: "How does your child respond to pressure from coaches or parents on the touchline?",
    options: [
      { text: "They tighten up and play even safer to avoid criticism", type: "confidence" },
      { text: "They try to do what they are told but stop thinking for themselves", type: "decision" },
      { text: "The environment around them has a big impact on how they play", type: "environment" },
      { text: "Seems to affect them sometimes but not others", type: "consistency" },
    ],
  },
  {
    id: "q6",
    text: "What happens when your child has a bad game?",
    options: [
      { text: "They are really hard on themselves and it affects their confidence for days", type: "confidence" },
      { text: "They struggle to identify what went wrong or why", type: "decision" },
      { text: "The mood in the car home has a big impact on how they process it", type: "environment" },
      { text: "Fine one week, really down the next, no consistency in how they handle it", type: "consistency" },
    ],
  },
  {
    id: "q7",
    text: "If you had to sum up what is missing, what would you say?",
    options: [
      { text: "The belief to back their ability when it matters", type: "confidence" },
      { text: "The ability to read the game and make the right call under pressure", type: "decision" },
      { text: "The right environment to bring the best out of them", type: "environment" },
      { text: "Consistency, they have the talent but cannot replicate it reliably", type: "consistency" },
    ],
  },
];

const barriers = {
  confidence: {
    name: "The Confidence Barrier",
    icon: "🧠",
    tagline: "The ability is there. The belief is not yet.",
    description: "Your child has genuine quality but something shuts them down when it matters. They do it in training, they know what to do, but in games they take the safe option, go quiet, or disappear under pressure. This is not a talent problem. It is an environment problem. The right environment builds the belief that allows the ability to show up consistently.",
    insight: "Players who struggle with confidence are often in environments that reward outcomes over process. Every mistake feels final. What they need is a space where trying and failing is part of the design, not something to avoid.",
    cta: "Inside the Game Intelligence Lab we break down exactly why this happens and what changes it. Start free today.",
  },
  decision: {
    name: "The Decision Barrier",
    icon: "⚡",
    tagline: "They react to the game instead of reading it.",
    description: "Your child plays what is in front of them rather than what the game needs from them. They are not scanning before the ball arrives, not playing ahead of the situation, and not seeing the picture that would make their decisions quicker and more effective. This is the core of game intelligence and it is entirely coachable.",
    insight: "Most training environments reward execution. Do the drill correctly, repeat it. But games require reading and deciding, not just doing. Players who have only been trained to execute struggle when the game does not look like the drill.",
    cta: "The Game Intelligence Lab is built around developing exactly this. Join free and start with our video series on why players freeze and how to change it.",
  },
  environment: {
    name: "The Environment Barrier",
    icon: "🌍",
    tagline: "What surrounds your child shapes what they become.",
    description: "Your child's development is being shaped by more than just their sessions on the pitch. The car journey home, the reaction to mistakes, the pressure or safety they feel around them, all of it creates the environment that either unlocks their potential or limits it. You already sense this. That instinct is right.",
    insight: "The environment coach understands that what happens off the pitch shapes what happens on it. This is not about blame. It is about understanding how powerful the right conditions are, and how to create them.",
    cta: "The Game Intelligence Lab includes a Parent Playbook designed to help you become part of the solution. Join free today.",
  },
  consistency: {
    name: "The Consistency Barrier",
    icon: "🎯",
    tagline: "The potential is clear. Making it reliable is the work.",
    description: "You can see the quality. Everyone can. But it comes and goes. Against weaker opposition they shine, against stronger opposition they fade. Great one week, barely there the next. This inconsistency is not about effort or attitude. It is about not yet having the game intelligence framework that makes performance repeatable regardless of context.",
    insight: "Consistent performers are not more talented. They have a deeper understanding of what the game requires from them in any situation. That understanding is built through the right kind of development environment, not through more repetition of the same drills.",
    cta: "Game intelligence is what makes talent consistent. The Game Intelligence Lab is where that gets built. Join free to get started.",
  },
};

const tiers = [
  {
    name: "Standard",
    price: "Free",
    priceNote: "Always free",
    highlight: false,
    features: [
      "Community access",
      "Weekly Game Intelligence breakdowns",
      "Parent Education posts",
      "Start Here video series",
      "Free practices to do with your child",
    ],
    cta: "Join Free",
    ctaStyle: "outline",
  },
  {
    name: "Premium",
    price: "£29",
    priceNote: "per month",
    highlight: true,
    features: [
      "Everything in Standard",
      "Game Intelligence Method Course",
      "Parent Playbook",
      "Animated Football Sessions",
      "Monthly live Q&A",
    ],
    cta: "Join Premium",
    ctaStyle: "solid",
  },
  {
    name: "VIP",
    price: "£150",
    priceNote: "per month",
    highlight: false,
    features: [
      "Everything in Premium",
      "Monthly 1to1 video calls",
      "Personalised Development Plan",
      "Footage review and written feedback",
      "WhatsApp access throughout",
    ],
    cta: "Apply for VIP",
    ctaStyle: "outline",
    note: "5 spaces only",
  },
];

export default function GIBarrier() {
  const [screen, setScreen] = useState("welcome");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", childName: "", childAge: "" });
  const [formErrors, setFormErrors] = useState({});
  const [barrier, setBarrier] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (screen === "results") {
      setTimeout(() => setRevealed(true), 300);
    }
  }, [screen]);

  const handleAnswer = (type) => {
    if (transitioning) return;
    setSelectedOption(type);
    setTransitioning(true);

    setTimeout(() => {
      const newAnswers = [...answers, type];
      setAnswers(newAnswers);

      if (currentQ < questions.length - 1) {
        setCurrentQ((prev) => prev + 1);
        setSelectedOption(null);
        setTransitioning(false);
      } else {
        const counts = newAnswers.reduce((acc, t) => {
          acc[t] = (acc[t] || 0) + 1;
          return acc;
        }, {});
        const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
        setBarrier(dominant);
        setScreen("gate");
        setSelectedOption(null);
        setTransitioning(false);
      }
    }, 380);
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

    try {
      await fetch("https://connect.mailerlite.com/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${MAILERLITE_API_KEY}`,
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          groups: [NGC_GROUP_ID],
          fields: {
            child_name: formData.childName,
            child_age: formData.childAge,
          },
        }),
      });
    } catch (e) {
      console.error("MailerLite error:", e);
    }

    setScreen("results");
  };

  const progress = ((currentQ) / questions.length) * 100;
  const b = barrier ? barriers[barrier] : null;

  const s = {
    wrap: {
      minHeight: "100vh",
      background: "#080808",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px 16px",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
    },
    card: {
      background: "#0f0f0f",
      border: "1px solid #1a1a1a",
      borderRadius: "20px",
      padding: "40px 36px",
      maxWidth: "540px",
      width: "100%",
      position: "relative",
      overflow: "hidden",
    },
    topBar: {
      position: "absolute",
      top: 0, left: 0, right: 0,
      height: "3px",
      background: "linear-gradient(90deg, #cc1f1f, #e63329, #ff5252)",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "28px",
    },
    logoCircle: {
      width: "34px",
      height: "34px",
      borderRadius: "50%",
      background: "#000",
      border: "1px solid #e63329",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    logoText: { color: "#fff", fontSize: "12px", fontWeight: "800", letterSpacing: "2.5px", textTransform: "uppercase" },
    logoSub: { color: "#444", fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase", marginTop: "1px" },
    chip: {
      display: "inline-block",
      background: "rgba(230,51,41,0.08)",
      border: "1px solid rgba(230,51,41,0.25)",
      color: "#e63329",
      fontSize: "9px",
      letterSpacing: "2.5px",
      textTransform: "uppercase",
      padding: "5px 12px",
      borderRadius: "20px",
      marginBottom: "20px",
      fontWeight: "700",
    },
    h1: {
      color: "#ffffff",
      fontSize: "26px",
      fontWeight: "800",
      lineHeight: 1.25,
      marginBottom: "14px",
      letterSpacing: "-0.5px",
    },
    body: { color: "#666", fontSize: "15px", lineHeight: 1.7, marginBottom: "28px" },
    btn: {
      background: "#e63329",
      color: "#fff",
      border: "none",
      borderRadius: "10px",
      padding: "15px 28px",
      fontSize: "14px",
      fontWeight: "700",
      cursor: "pointer",
      width: "100%",
      letterSpacing: "0.3px",
      transition: "background 0.2s",
    },
    progress: {
      height: "2px",
      background: "#1a1a1a",
      borderRadius: "2px",
      marginBottom: "28px",
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      background: "linear-gradient(90deg, #e63329, #ff5252)",
      borderRadius: "2px",
      transition: "width 0.4s ease",
      width: `${progress}%`,
    },
    qTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" },
    qStep: { color: "#e63329", fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "700" },
    qNum: { color: "#333", fontSize: "12px" },
    qText: { color: "#fff", fontSize: "17px", fontWeight: "700", lineHeight: 1.45, marginBottom: "22px" },
    option: (sel) => ({
      background: sel ? "rgba(230,51,41,0.12)" : "#111",
      border: `1px solid ${sel ? "#e63329" : "#1c1c1c"}`,
      borderRadius: "10px",
      padding: "13px 16px",
      marginBottom: "9px",
      cursor: "pointer",
      color: sel ? "#fff" : "#777",
      fontSize: "14px",
      lineHeight: 1.5,
      transition: "all 0.18s",
      display: "flex",
      alignItems: "center",
      gap: "12px",
    }),
    dot: (sel) => ({
      width: "7px", height: "7px",
      borderRadius: "50%",
      background: sel ? "#e63329" : "#222",
      flexShrink: 0,
      transition: "all 0.18s",
      boxShadow: sel ? "0 0 6px rgba(230,51,41,0.6)" : "none",
    }),
    label: { color: "#444", fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "7px", display: "block" },
    input: (err) => ({
      background: "#0a0a0a",
      border: `1px solid ${err ? "#e63329" : "#1c1c1c"}`,
      borderRadius: "9px",
      padding: "13px 15px",
      color: "#fff",
      fontSize: "14px",
      width: "100%",
      outline: "none",
      boxSizing: "border-box",
      marginBottom: "4px",
    }),
    inputRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" },
    errText: { color: "#e63329", fontSize: "11px", marginBottom: "10px" },
    fieldWrap: { marginBottom: "14px" },
    divider: { height: "1px", background: "#181818", margin: "24px 0" },
  };

  const Logo = () => (
    <div style={s.logo}>
      <div style={s.logoCircle}>
        <svg width="18" height="18" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="8.5" fill="none" stroke="#e63329" strokeWidth="1.5" />
          <path d="M10 3.5 L12.5 7.5 L10 6 L7.5 7.5 Z" fill="#e63329" opacity="0.9" />
          <path d="M10 16.5 L12.5 12.5 L10 14 L7.5 12.5 Z" fill="#e63329" opacity="0.9" />
          <path d="M3.5 10 L7.5 7.5 L6 10 L7.5 12.5 Z" fill="#e63329" opacity="0.6" />
          <path d="M16.5 10 L12.5 7.5 L14 10 L12.5 12.5 Z" fill="#e63329" opacity="0.6" />
        </svg>
      </div>
      <div>
        <div style={s.logoText}>Coach Kurtis</div>
        <div style={s.logoSub}>Game Intelligence Lab</div>
      </div>
    </div>
  );

  if (screen === "welcome") return (
    <div style={s.wrap}>
      <div style={s.card}>
        <div style={s.topBar} />
        <Logo />
        <div style={s.chip}>Free Diagnostic</div>
        <h1 style={s.h1}>What's Holding Your Child Back?</h1>
        <p style={s.body}>
          Answer 7 questions about how your child performs on the pitch. In under 2 minutes you'll discover the one barrier limiting their development right now and exactly what to do about it.
        </p>
        <button style={s.btn} onClick={() => setScreen("questions")}
          onMouseOver={e => e.target.style.background = "#c0392b"}
          onMouseOut={e => e.target.style.background = "#e63329"}>
          Find Out What's Holding Them Back
        </button>
        <p style={{ color: "#252525", fontSize: "11px", textAlign: "center", marginTop: "14px" }}>
          Takes 2 minutes. Written by a coach with 20 years of player development experience.
        </p>
      </div>
    </div>
  );

  if (screen === "questions") {
    const q = questions[currentQ];
    return (
      <div style={s.wrap}>
        <div style={s.card}>
          <div style={s.topBar} />
          <Logo />
          <div style={s.progress}><div style={s.progressFill} /></div>
          <div style={s.qTop}>
            <span style={s.qStep}>Question {currentQ + 1} of {questions.length}</span>
            <span style={s.qNum}>{Math.round(((currentQ) / questions.length) * 100)}% complete</span>
          </div>
          <div style={s.qText}>{q.text}</div>
          {q.options.map((opt, i) => {
            const isSel = selectedOption === opt.type && transitioning;
            return (
              <div key={i} style={s.option(isSel)} onClick={() => handleAnswer(opt.type)}>
                <div style={s.dot(isSel)} />
                {opt.text}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (screen === "gate") return (
    <div style={s.wrap}>
      <div style={s.card}>
        <div style={s.topBar} />
        <Logo />
        <div style={s.chip}>Your Result Is Ready</div>
        <h1 style={{ ...s.h1, fontSize: "21px" }}>
          We've identified the barrier holding your child back.
        </h1>
        <p style={s.body}>
          Enter your details below to reveal your child's full diagnostic result, including what it means and the exact next step to move past it.
        </p>

        <div style={s.fieldWrap}>
          <label style={s.label}>Your Name</label>
          <input style={s.input(formErrors.name)} placeholder="Your full name" value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })} />
          {formErrors.name && <div style={s.errText}>{formErrors.name}</div>}
        </div>

        <div style={s.fieldWrap}>
          <label style={s.label}>Your Email</label>
          <input style={s.input(formErrors.email)} placeholder="your@email.com" type="email" value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })} />
          {formErrors.email && <div style={s.errText}>{formErrors.email}</div>}
        </div>

        <div style={s.inputRow}>
          <div style={s.fieldWrap}>
            <label style={s.label}>Child's Name</label>
            <input style={s.input(formErrors.childName)} placeholder="First name" value={formData.childName}
              onChange={e => setFormData({ ...formData, childName: e.target.value })} />
            {formErrors.childName && <div style={s.errText}>{formErrors.childName}</div>}
          </div>
          <div style={s.fieldWrap}>
            <label style={s.label}>Child's Age</label>
            <input style={s.input(formErrors.childAge)} placeholder="Age" type="number" min="6" max="18" value={formData.childAge}
              onChange={e => setFormData({ ...formData, childAge: e.target.value })} />
            {formErrors.childAge && <div style={s.errText}>{formErrors.childAge}</div>}
          </div>
        </div>

        <button style={s.btn} onClick={handleSubmit}
          onMouseOver={e => e.target.style.background = "#c0392b"}
          onMouseOut={e => e.target.style.background = "#e63329"}>
          Reveal My Child's Result
        </button>
        <p style={{ color: "#252525", fontSize: "11px", textAlign: "center", marginTop: "12px" }}>
          No spam. Your details are safe with us.
        </p>
      </div>
    </div>
  );

  if (screen === "results" && b) return (
    <div style={s.wrap}>
      <div style={{ ...s.card, maxWidth: "580px", opacity: revealed ? 1 : 0, transform: revealed ? "translateY(0)" : "translateY(12px)", transition: "all 0.5s ease" }}>
        <div style={s.topBar} />
        <Logo />

        <div style={s.chip}>Diagnostic Complete</div>

        <div style={{
          background: "rgba(230,51,41,0.06)",
          border: "1px solid rgba(230,51,41,0.2)",
          borderRadius: "14px",
          padding: "24px",
          marginBottom: "24px",
          textAlign: "center",
        }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>{b.icon}</div>
          <div style={{ color: "#e63329", fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: "700", marginBottom: "8px" }}>
            {formData.childName}'s Primary Barrier
          </div>
          <div style={{ color: "#fff", fontSize: "22px", fontWeight: "800", letterSpacing: "-0.3px", marginBottom: "6px" }}>
            {b.name}
          </div>
          <div style={{ color: "#555", fontSize: "14px", fontStyle: "italic" }}>{b.tagline}</div>
        </div>

        <div style={{ background: "#0a0a0a", border: "1px solid #181818", borderRadius: "12px", padding: "20px", marginBottom: "16px" }}>
          <div style={{ color: "#444", fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "10px", fontWeight: "700" }}>What This Means</div>
          <p style={{ color: "#888", fontSize: "14px", lineHeight: 1.75, margin: 0 }}>{b.description}</p>
        </div>

        <div style={{ background: "#0a0a0a", border: "1px solid #181818", borderRadius: "12px", padding: "20px", marginBottom: "24px" }}>
          <div style={{ color: "#444", fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "10px", fontWeight: "700" }}>The Coach's Insight</div>
          <p style={{ color: "#666", fontSize: "14px", lineHeight: 1.75, margin: 0 }}>{b.insight}</p>
        </div>

        <div style={s.divider} />

        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div style={{ color: "#fff", fontSize: "17px", fontWeight: "800", marginBottom: "6px" }}>
            This is exactly what the Game Intelligence Lab is built for.
          </div>
          <div style={{ color: "#555", fontSize: "13px", lineHeight: 1.6 }}>
            Join free today. Start with our video series on why players freeze and practical skills to work on this week. No credit card needed.
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "24px" }}>
          {tiers.map((tier, i) => (
            <div key={i} style={{
              background: tier.highlight ? "rgba(230,51,41,0.08)" : "#0a0a0a",
              border: `1px solid ${tier.highlight ? "rgba(230,51,41,0.35)" : "#181818"}`,
              borderRadius: "12px",
              padding: "16px 12px",
              position: "relative",
              textAlign: "center",
            }}>
              {tier.highlight && (
                <div style={{
                  position: "absolute", top: "-10px", left: "50%", transform: "translateX(-50%)",
                  background: "#e63329", color: "#fff", fontSize: "8px", fontWeight: "800",
                  letterSpacing: "1.5px", textTransform: "uppercase", padding: "3px 8px", borderRadius: "10px",
                }}>Most Popular</div>
              )}
              <div style={{ color: tier.highlight ? "#fff" : "#666", fontSize: "11px", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "6px" }}>
                {tier.name}
              </div>
              <div style={{ color: tier.highlight ? "#e63329" : "#fff", fontSize: "20px", fontWeight: "800", marginBottom: "2px" }}>
                {tier.price}
              </div>
              <div style={{ color: "#333", fontSize: "10px", marginBottom: "12px" }}>{tier.priceNote}</div>
              {tier.features.map((f, fi) => (
                <div key={fi} style={{ color: "#555", fontSize: "11px", lineHeight: 1.5, marginBottom: "4px", textAlign: "left" }}>
                  {f}
                </div>
              ))}
              {tier.note && <div style={{ color: "#e63329", fontSize: "10px", marginTop: "8px", fontWeight: "700" }}>{tier.note}</div>}
            </div>
          ))}
        </div>

        <a href={SKOOL_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          <button style={{ ...s.btn, marginBottom: "10px" }}
            onMouseOver={e => e.target.style.background = "#c0392b"}
            onMouseOut={e => e.target.style.background = "#e63329"}>
            Join the Game Intelligence Lab Free
          </button>
        </a>

        <p style={{ color: "#1e1e1e", fontSize: "11px", textAlign: "center", marginTop: "8px" }}>
          Coach Kurtis &nbsp; Game Intelligence Lab &nbsp; coachkurtis.com
        </p>
      </div>
    </div>
  );

  return null;
}

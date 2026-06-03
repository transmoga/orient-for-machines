/* global React */
const { useState } = React;

/* Shared bits ------------------------------------------------------------ */

// Duality mark: a diamond split clay (human) | slate (machine)
function Mark({ size = 22 }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        width: size, height: size,
        transform: "rotate(45deg)",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "inset 0 0 0 1.5px var(--ink)",
        background:
          "linear-gradient(90deg, var(--human) 0 50%, var(--machine) 50% 100%)",
        verticalAlign: "middle",
      }}
    />
  );
}

function Wordmark({ size = 22, gap = 10 }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap }}>
      <Mark size={size} />
      <span style={{
        fontFamily: "var(--serif)", fontSize: size * 1.05, letterSpacing: "-0.01em",
        color: "var(--ink)", lineHeight: 1,
      }}>Orient</span>
    </span>
  );
}

function Waitlist({ tone = "ink", compact = false }) {
  const onInk = tone === "onInk";
  return (
    <form onSubmit={(e) => e.preventDefault()} style={{
      display: "flex", gap: 8, maxWidth: 420, width: "100%",
    }}>
      <input
        placeholder="you@company.com"
        style={{
          flex: 1, height: compact ? 44 : 50, padding: "0 16px",
          fontFamily: "var(--sans)", fontSize: 15,
          color: onInk ? "var(--paper)" : "var(--ink)",
          background: onInk ? "rgba(255,255,255,0.06)" : "var(--paper)",
          border: `1px solid ${onInk ? "rgba(255,255,255,0.22)" : "var(--line-2)"}`,
          borderRadius: "var(--r)", outline: "none",
        }}
      />
      <button style={{
        height: compact ? 44 : 50, padding: "0 22px", whiteSpace: "nowrap",
        fontFamily: "var(--sans)", fontSize: 15, fontWeight: 500,
        color: onInk ? "var(--ink)" : "var(--paper)",
        background: onInk ? "var(--paper)" : "var(--ink)",
        border: "none", borderRadius: "var(--r)", cursor: "pointer",
      }}>Join waitlist</button>
    </form>
  );
}

/* ── Direction A — Editorial Split ─────────────────────────────────────── */
function HeroA() {
  return (
    <div style={{ background: "var(--paper)", height: "100%", display: "flex", flexDirection: "column" }}>
      <header style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "26px 56px", borderBottom: "1px solid var(--line)",
      }}>
        <Wordmark />
        <nav style={{ display: "flex", gap: 30, fontSize: 14, color: "var(--ink-2)" }}>
          <span>For Humans</span><span>For Machines</span><span>Architecture</span>
        </nav>
      </header>

      <div style={{ padding: "72px 56px 0", textAlign: "center", flex: 1 }}>
        <div className="kicker" style={{ marginBottom: 26 }}>Meaning Operating System</div>
        <h1 style={{ fontSize: 70, lineHeight: 1.02, maxWidth: 980, margin: "0 auto", letterSpacing: "-0.02em" }}>
          A meaning operating system<br />for humans <span style={{ fontStyle: "italic", color: "var(--human)" }}>and</span> machines
        </h1>
        <p style={{ fontSize: 19, lineHeight: 1.55, color: "var(--ink-2)", maxWidth: 600, margin: "26px auto 34px" }}>
          Orient is where knowledge becomes meaning — captured, resolved, framed and
          remembered — so people and agents work from the same understanding.
        </p>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 64 }}>
          <Waitlist />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "1px solid var(--line)" }}>
        <div style={{ padding: "30px 56px", borderRight: "1px solid var(--line)", background: "var(--human-soft)" }}>
          <div className="mono" style={{ fontSize: 12, letterSpacing: "0.14em", color: "var(--human)", marginBottom: 8 }}>FOR HUMANS</div>
          <div style={{ fontSize: 17, color: "var(--ink)" }}>Understand, decide, explain, and remember what matters.</div>
        </div>
        <div style={{ padding: "30px 56px", background: "var(--machine-soft)" }}>
          <div className="mono" style={{ fontSize: 12, letterSpacing: "0.14em", color: "var(--machine)", marginBottom: 8 }}>FOR MACHINES</div>
          <div style={{ fontSize: 17, color: "var(--ink)" }}>Structured meaning, evidence and constraints agents can act on.</div>
        </div>
      </div>
    </div>
  );
}

/* ── Direction B — The Ledger ──────────────────────────────────────────── */
function HeroB() {
  const Row = ({ label, color, items }) => (
    <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 28, padding: "26px 0", borderTop: "1px solid var(--line)" }}>
      <div className="mono" style={{ fontSize: 13, letterSpacing: "0.12em", color, paddingTop: 3 }}>{label}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 26px" }}>
        {items.map((t) => <span key={t} style={{ fontSize: 17, color: "var(--ink)" }}>{t}</span>)}
      </div>
    </div>
  );
  return (
    <div style={{ background: "var(--paper)", height: "100%", display: "flex", flexDirection: "column" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "26px 64px" }}>
        <Wordmark />
        <span className="mono" style={{ fontSize: 12, letterSpacing: "0.14em", color: "var(--ink-3)" }}>EST. FOR THE AGE OF AGENTS</span>
      </header>

      <div style={{ padding: "40px 64px 0", display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 64, flex: 1 }}>
        <div>
          <div className="kicker" style={{ marginBottom: 30 }}>— A new layer of infrastructure</div>
          <h1 style={{ fontSize: 60, lineHeight: 1.06, letterSpacing: "-0.02em" }}>
            The meaning<br />layer for<br />
            <span style={{ fontStyle: "italic" }}>humans</span> &amp; <span style={{ fontStyle: "italic" }}>machines</span>.
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--ink-2)", maxWidth: 440, margin: "28px 0 30px" }}>
            Slides, memos and chat are commoditised. Structured meaning — what is known,
            uncertain, supported, and changing — is not. That is Orient.
          </p>
          <Waitlist />
        </div>

        <div style={{ alignSelf: "center" }}>
          <Row label="FOR HUMANS" color="var(--human)" items={["Capture", "Resolve", "Frame", "Remember", "Measure"]} />
          <Row label="FOR MACHINES" color="var(--machine)" items={["Context", "Grounding", "Policy", "Evaluation", "Memory"]} />
          <div style={{ borderTop: "1px solid var(--line)" }} />
        </div>
      </div>
    </div>
  );
}

/* ── Direction C — Split Screen ────────────────────────────────────────── */
function HeroC() {
  const List = ({ items, onInk }) => (
    <ul style={{ listStyle: "none", padding: 0, margin: "22px 0 0", display: "grid", gap: 13 }}>
      {items.map((t) => (
        <li key={t} style={{ display: "flex", gap: 12, alignItems: "baseline", fontSize: 16, color: onInk ? "var(--paper-on-ink)" : "var(--ink)" }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: 12, opacity: 0.6 }}>—</span>{t}
        </li>
      ))}
    </ul>
  );
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", position: "relative" }}>
      {/* center wordmark bridge */}
      <div style={{
        position: "absolute", top: 30, left: "50%", transform: "translateX(-50%)", zIndex: 3,
        background: "var(--paper)", padding: "10px 22px", borderRadius: 40,
        boxShadow: "0 1px 0 var(--line), 0 8px 24px rgba(0,0,0,0.06)",
      }}>
        <Wordmark size={20} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", flex: 1 }}>
        {/* humans */}
        <div style={{ background: "var(--paper-2)", padding: "108px 56px 56px" }}>
          <div className="mono" style={{ fontSize: 12, letterSpacing: "0.16em", color: "var(--human)", marginBottom: 18 }}>FOR HUMANS</div>
          <h1 style={{ fontSize: 46, lineHeight: 1.08, maxWidth: 380 }}>Turn scattered knowledge into meaning that holds.</h1>
          <List items={["Capture anything", "Resolve a defensible answer", "Frame it for an audience", "Remember why it mattered"]} />
        </div>
        {/* machines */}
        <div style={{ background: "var(--ink-panel)", padding: "108px 56px 56px" }}>
          <div className="mono" style={{ fontSize: 12, letterSpacing: "0.16em", color: "var(--machine)", marginBottom: 18, filter: "brightness(1.5)" }}>FOR MACHINES</div>
          <h1 style={{ fontSize: 46, lineHeight: 1.08, maxWidth: 380, color: "var(--paper-on-ink)" }}>The structured meaning agents need to act.</h1>
          <List onInk items={["Context, not raw chunks", "Grounding & provenance", "Durable policy & constraints", "Evaluated for meaning drift"]} />
        </div>
      </div>

      <div style={{ background: "var(--ink)", padding: "22px 56px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32 }}>
        <span style={{ fontFamily: "var(--serif)", fontSize: 22, color: "var(--paper)" }}>
          One meaning OS. Two kinds of mind.
        </span>
        <Waitlist tone="onInk" compact />
      </div>
    </div>
  );
}

Object.assign(window, { HeroA, HeroB, HeroC, Wordmark, Mark, Waitlist });

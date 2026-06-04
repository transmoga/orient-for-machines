/* For Machines — interactive assembleMeaningContext explorer */
(function () {
  var TYPES = [
    { id: "curated_item",   label: "curated_item",   role: "Source",
      emph: "The structured meaning inside a piece of material — its claims, supporting and contradicting evidence, freshness, and exactly what it's safe to be used to support.",
      ask: "Can I use this report to back a market claim?",
      ans: "Yes — but only for 2024 enterprise adoption. The pricing assumptions are stale." },
    { id: "resolved_answer", label: "resolved_answer", role: "Position",
      emph: "The current, defensible position — top claims, strongest evidence, contradictions, weak spots, and whether it's safe to act on right now.",
      ask: "Write a board memo from this answer.",
      ans: "Safe to draft — but preserve two caveats and don't overstate the market-size claim." },
    { id: "frame",          label: "frame",          role: "Communication",
      emph: "How meaning was shaped for an audience — the claims used, the caveats kept or dropped, and whether the framing stayed faithful to the source.",
      ask: "Turn this into a customer email.",
      ans: "Keep the core argument, soften the strategic language, drop the unsupported defensibility claim." },
    { id: "deck",           label: "deck",           role: "Sequenced argument",
      emph: "The argument's flow, slide by slide — where it's carried by evidence, where assertions need citation, and where comprehension is likely to fail.",
      ask: "Improve this investor deck.",
      ans: "Slides 3–5 carry it; slide 7 makes an unsupported market claim — cite it or soften it." },
    { id: "article",        label: "article",        role: "Argument",
      emph: "The thesis, the argument structure, the reusable sections and counter-arguments — plus which claims have quietly gone stale.",
      ask: "Use this to brief the sales team.",
      ans: "The thesis holds; the regulatory example is stale; keep the automation-vs-augmentation distinction." },
    { id: "podcast",        label: "podcast",        role: "Spoken knowledge",
      emph: "Topics, speaker claims, agreements and quotable moments — without pretending every spoken utterance is a formal, evidence-backed claim.",
      ask: "Write an article from this episode.",
      ans: "Use these three themes; treat two of the claims as opinion, not evidence." },
    { id: "transcript",     label: "transcript",     role: "Conversation record",
      emph: "Decisions, commitments, open questions, unresolved tensions and what should enter memory — the signal pulled out of a raw conversation.",
      ask: "Draft follow-ups from this meeting.",
      ans: "Three decisions, two unresolved issues, one claim that needs evidence before reuse." },
    { id: "qa_space",       label: "qa_space",       role: "State of inquiry",
      emph: "What's answered, what's accepted, what's contested and what's still open across a space — and which questions to investigate next.",
      ask: "What should the research agent work on next?",
      ans: "These three are unresolved; this one's contested; this one's ready to frame externally." },
    { id: "topic",          label: "topic",          role: "Meaning cluster",
      emph: "The organisation's whole state of understanding around a subject — claims, sources, people, frames, comprehension and how it has changed over time.",
      ask: "Prepare a strategy update on our agents work.",
      ans: "The team gets the agent-context idea, but comprehension is weak around safe writeback." },
    { id: "person",         label: "person",         role: "Stakeholder context",
      emph: "How a person relates to the meaning — their role, positions, likely objections, comprehension level and what is permission-safe to use.",
      ask: "Draft a note to this stakeholder.",
      ans: "They get the commercial angle, not the technical grounding — avoid jargon, address operational risk." },
    { id: "comprehension",  label: "comprehension",  role: "Understanding signal",
      emph: "What actually landed — which claims were understood, which were misunderstood, where meaning drifted, and what to explain next.",
      ask: "Prepare a follow-up after the team read the memo.",
      ans: "They understood the goal but missed the agent-identity layer — explain that next." },
    { id: "spread",         label: "spread",         role: "Meaning propagation",
      emph: "How meaning moved through people and teams — which artefacts carried it, where it took hold, and where understanding decayed.",
      ask: "Is the product narrative spreading?",
      ans: "It reached product and sales; support is still using the old language." }
  ];

  var typesEl = document.getElementById("poly-types");
  var panelEl = document.getElementById("poly-panel");
  if (!typesEl || !panelEl) return;

  function render(t) {
    panelEl.innerHTML =
      '<span class="role">' + t.role + '</span>' +
      '<div class="title">' + t.label + '</div>' +
      '<p class="emph">' + t.emph + '</p>' +
      '<div class="ex">' +
        '<div class="ask"><div class="who">Agent asks</div><div class="msg">“' + t.ask + '”</div></div>' +
        '<div class="ans"><div class="who">Orient answers</div><div class="msg">“' + t.ans + '”</div></div>' +
      '</div>';
  }

  TYPES.forEach(function (t, i) {
    var b = document.createElement("button");
    b.className = "poly-type" + (i === 1 ? " active" : "");
    b.innerHTML = '<span>' + t.label + '</span><span class="role-mini">' + t.role + '</span>';
    b.addEventListener("click", function () {
      typesEl.querySelectorAll(".poly-type").forEach(function (x) { x.classList.remove("active"); });
      b.classList.add("active");
      render(t);
    });
    typesEl.appendChild(b);
  });

  render(TYPES[1]); // default: resolved_answer
})();

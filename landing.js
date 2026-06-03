/* Orient landing — interactions */
(function () {
  // sticky header border on scroll
  var header = document.getElementById("header");
  var onScroll = function () {
    if (window.scrollY > 8) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // smooth scroll for in-page links + data-scroll buttons
  function smooth(target) {
    var el = document.querySelector(target);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
  }
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var href = a.getAttribute("href");
      if (href.length > 1) { e.preventDefault(); smooth(href); }
    });
  });
  document.querySelectorAll("[data-scroll]").forEach(function (b) {
    b.addEventListener("click", function () { smooth(b.getAttribute("data-scroll")); });
  });

  // waitlist submit -> success state
  document.querySelectorAll("[data-waitlist]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = form.querySelector("input");
      var btn = form.querySelector("button");
      if (!input.value || input.validity.valid === false) { input.focus(); return; }
      btn.textContent = form.getAttribute("data-success") || "On the list ✓";
      btn.disabled = true;
      btn.style.opacity = "1";
      input.disabled = true;
      input.value = "";
      input.placeholder = "Thanks — we'll be in touch.";
    });
  });

  // reveal on scroll
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }
})();

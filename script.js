// Newsletter pop-up: the top banner opens it any time; it also auto-opens (desktop only) once per visitor after 30s or 55% scroll, whichever comes first.
// Never shows again after it's closed or after someone signs up (remembered for 14 days).
(function () {
  var popup = document.getElementById("popup");
  if (!popup) return;

  var KEY = "atm_popup_seen";
  var DAYS = 14;

  function seenRecently() {
    try {
      var t = Number(localStorage.getItem(KEY));
      return t && Date.now() - t < DAYS * 86400000;
    } catch (e) { return false; }
  }
  function remember() {
    try { localStorage.setItem(KEY, String(Date.now())); } catch (e) {}
  }

  var lastFocus = null;
  var shown = false;

  function open() {
    shown = true;
    lastFocus = document.activeElement;
    popup.classList.add("is-open");
    popup.setAttribute("aria-hidden", "false");
    var first = popup.querySelector("input");
    if (first) first.focus();
  }

  function close() {
    popup.classList.remove("is-open");
    popup.setAttribute("aria-hidden", "true");
    remember();
    if (lastFocus) lastFocus.focus();
  }

  // The top banner always opens the pop-up, on any screen size.
  Array.prototype.forEach.call(document.querySelectorAll("[data-open-popup]"), function (b) {
    b.addEventListener("click", open);
  });

  // Auto-open: desktop only (Google penalizes intrusive mobile pop-ups), once per visitor.
  if (!window.matchMedia("(max-width: 800px)").matches && !seenRecently()) {
    var auto = function () { if (!shown) open(); };
    var timer = setTimeout(auto, 30000);
    window.addEventListener("scroll", function onScroll() {
      var scrolled = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (scrolled > 0.55) {
        clearTimeout(timer);
        auto();
        window.removeEventListener("scroll", onScroll);
      }
    }, { passive: true });
  }

  popup.addEventListener("click", function (e) {
    if (e.target === popup || e.target.hasAttribute("data-close")) close();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && popup.classList.contains("is-open")) close();
  });
  popup.querySelector("form").addEventListener("submit", remember);
})();

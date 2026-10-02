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


// Course intro video: loads when it nears the screen, plays muted when mostly visible, pauses when scrolled away.
// Viewers can unmute with the player controls. If someone pauses it themselves, it stays paused.
(function () {
  var v = document.getElementById("intro-video");
  if (!v || !("IntersectionObserver" in window)) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var loaded = false, userPaused = false, scriptPause = false;

  function load() {
    if (loaded) return;
    loaded = true;
    var small = window.matchMedia("(max-width: 700px)").matches;
    v.src = v.getAttribute(small ? "data-src-480" : "data-src-720");
    v.preload = "metadata";
  }

  v.addEventListener("pause", function () {
    if (!scriptPause && !v.ended) userPaused = true;
    scriptPause = false;
  });
  v.addEventListener("play", function () { userPaused = false; });

  // "Tap for sound" button: restarts the video from the beginning with sound on.
  var soundBtn = document.getElementById("sound-btn");
  function syncSoundBtn() { if (soundBtn) soundBtn.hidden = !v.muted; }
  if (soundBtn) {
    soundBtn.addEventListener("click", function () {
      load();
      v.muted = false;
      v.volume = 1;
      try { v.currentTime = 0; } catch (e) {}
      var p = v.play();
      if (p && p.catch) p.catch(function () {});
      if (window.atmTrack) window.atmTrack("video_unmute", { video: "course_intro" });
    });
    v.addEventListener("volumechange", syncSoundBtn);
    syncSoundBtn();
  }

  new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) load();
    });
  }, { rootMargin: "400px" }).observe(v);

  if (reduced) return; // poster + play button only

  new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting && e.intersectionRatio >= 0.5) {
        load();
        if (!userPaused && v.paused && !v.ended) {
          var p = v.play();
          if (p && p.catch) p.catch(function () {});
        }
      } else if (!v.paused) {
        scriptPause = true;
        v.pause();
      }
    });
  }, { threshold: [0, 0.5] }).observe(v);
})();

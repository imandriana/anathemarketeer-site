// Google Analytics 4 with a cookie consent banner.
// GA only loads AFTER a visitor clicks Accept, and only on the real domain.
// Choice is remembered in localStorage ("atm_consent"). The footer "Cookie settings" link reopens the banner.
(function () {
  var GA_ID = "G-J2CDC7NSRZ";
  var KEY = "atm_consent";
  var REAL_HOST = /(^|\.)anathemarketeer\.com$/;
  var granted = false, loaded = false;

  function store(v) { try { if (v === null) localStorage.removeItem(KEY); else localStorage.setItem(KEY, v); } catch (e) {} }
  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }

  function loadGA() {
    if (loaded || !REAL_HOST.test(location.hostname)) return;
    loaded = true;
    window["ga-disable-" + GA_ID] = false;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
    gtag("js", new Date());
    gtag("config", GA_ID);
  }

  function clearGACookies() {
    window["ga-disable-" + GA_ID] = true;
    var host = location.hostname, parts = host.split("."), root = parts.slice(-2).join(".");
    document.cookie.split(";").forEach(function (c) {
      var name = c.split("=")[0].trim();
      if (name.indexOf("_ga") === 0) {
        [host, "." + host, "." + root].forEach(function (d) {
          document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=" + d;
        });
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      }
    });
  }

  // Public helper: other scripts call atmTrack("event_name", {params}). Does nothing without consent.
  window.atmTrack = function (name, params) {
    if (granted && loaded) gtag("event", name, params || {});
  };

  // ---------- Banner ----------
  var banner;
  function buildBanner() {
    banner = document.createElement("div");
    banner.className = "cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Cookie preferences");
    banner.hidden = true;
    banner.innerHTML =
      '<p>I use cookies for analytics only, to see which pages help people and improve the site. No ads, no selling your data. <a href="/privacy">Privacy policy</a></p>' +
      '<div class="cookie-actions"><button type="button" class="cookie-btn cookie-btn--accept" data-cookie="accept">Accept</button>' +
      '<button type="button" class="cookie-btn" data-cookie="decline">Decline</button></div>';
    document.body.appendChild(banner);
    banner.addEventListener("click", function (e) {
      var b = e.target.closest("[data-cookie]");
      if (!b) return;
      if (b.getAttribute("data-cookie") === "accept") { granted = true; store("granted"); loadGA(); }
      else { granted = false; store("denied"); clearGACookies(); }
      banner.hidden = true;
    });
  }
  function showBanner() { if (!banner) buildBanner(); banner.hidden = false; }

  function addFooterLink() {
    var holder = document.querySelector(".site-footer .wrap > div:last-child");
    if (!holder) return;
    var b = document.createElement("button");
    b.type = "button"; b.className = "cookie-link"; b.textContent = "Cookie settings";
    b.addEventListener("click", showBanner);
    holder.appendChild(b);
  }

  var saved = read();
  addFooterLink();
  if (saved === "granted") { granted = true; loadGA(); }
  else if (saved !== "denied") { showBanner(); }

  // ---------- Events ----------
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a, button");
    if (!a) return;
    var section = (a.closest("section[id]") || {}).id || (a.closest("header") ? "header" : a.closest("footer") ? "footer" : "page");
    var href = a.getAttribute && a.getAttribute("href");
    if (a.hasAttribute("data-open-popup")) window.atmTrack("checklist_banner_click");
    else if (href === "/audit") window.atmTrack("audit_cta_click", { link_text: (a.textContent || "").trim().slice(0, 60), page_section: section });
    else if (href && href.indexOf("thinkific.com") > -1) window.atmTrack("course_click", { page_section: section });
    else if (a.closest(".social")) window.atmTrack("social_click", { network: (a.getAttribute("aria-label") || "").replace(/^.* on /, "") });
    else if (href && href.indexOf("phlare.ca") > -1) window.atmTrack("phlare_click", { page_section: section });
    else if (href && href.indexOf("youtube.com") > -1 || href && href.indexOf("youtu.be") > -1) window.atmTrack("youtube_click", { page_section: section });
  });

  document.addEventListener("submit", function (e) {
    if (e.target.classList && e.target.classList.contains("signup-form")) window.atmTrack("newsletter_signup", { form_location: "popup" });
  });

  // Fires when someone actually books a slot in the embedded Calendly calendar.
  window.addEventListener("message", function (e) {
    if (e.origin === "https://calendly.com" && e.data && e.data.event === "calendly.event_scheduled") window.atmTrack("book_call", { method: "calendly" });
  });
})();

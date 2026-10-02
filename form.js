// Sends forms to Formspree without leaving the page, then shows a thank-you message.
// If JavaScript fails for any reason, the form still posts normally to Formspree.
(function () {
  function wire(formId, successId, errorId) {
    var form = document.getElementById(formId);
    if (!form) return;
    var success = document.getElementById(successId);
    var error = document.getElementById(errorId);
    var btn = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (error) error.hidden = true;
      var label = btn ? btn.innerHTML : "";
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      }).then(function (res) {
        if (!res.ok) throw new Error("Request failed");
        form.hidden = true;
        var frame = document.getElementById("calendly-frame");
        if (frame && frame.getAttribute("data-src")) {
          var q = new URLSearchParams({ embed_domain: location.hostname || "anathemarketeer.com", embed_type: "Inline", hide_gdpr_banner: "1" });
          var n = form.querySelector('[name="name"]'), em = form.querySelector('[name="email"]');
          if (n && n.value) q.set("name", n.value);
          if (em && em.value) q.set("email", em.value);
          frame.src = frame.getAttribute("data-src") + "?" + q.toString();
        }
        var lead = document.querySelector(".audit-note");
        if (lead) lead.hidden = true;
        if (success) { success.hidden = false; success.focus(); window.scrollTo({ top: Math.max(0, success.getBoundingClientRect().top + window.scrollY - 120), behavior: "smooth" }); }
      }).catch(function () {
        if (error) error.hidden = false;
        if (btn) { btn.disabled = false; btn.innerHTML = label; }
      });
    });
  }
  wire("audit-form", "audit-success", "audit-error");
  wire("contact-form", "contact-success", "contact-error");
})();

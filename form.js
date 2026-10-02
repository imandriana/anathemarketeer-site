// Sends forms to Formspree without leaving the page, then shows a thank-you message.
// If JavaScript fails for any reason, the form still posts normally to Formspree.
(function () {
  function wire(formId, successId, errorId, eventName) {
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
        if (window.atmTrack) {
          var val = function (n) { var el = form.querySelector('[name="' + n + '"]'); return el && el.value ? el.value : undefined; };
          if (eventName === "generate_lead") window.atmTrack("generate_lead", { form_name: "free_brand_audit", lead_source: val("heard_about_me"), budget_range: val("budget"), audience: val("role") });
          else if (eventName === "apply_intensive_submit") {
            window.atmTrack("generate_lead", { form_name: "creative_strategy_application", lead_source: val("heard_about_me"), audience: val("role"), commitment: val("commitment"), payment_preference: val("payment_preference") });
            window.atmTrack("apply_intensive_submit", { form_name: formId });
          }
          else window.atmTrack(eventName, { form_name: formId });
        }
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
  wire("apply-form", "apply-success", "apply-error", "apply_intensive_submit");
  wire("audit-form", "audit-success", "audit-error", "generate_lead");
  wire("contact-form", "contact-success", "contact-error", "contact_form_submit");
})();

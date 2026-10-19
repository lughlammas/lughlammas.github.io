// Minimal progressive enhancement. The site works without JS.
(function () {
  // Mobile menu (<details>): Escape closes it and returns focus to the toggle.
  document.querySelectorAll("details.nav-mobile").forEach(function (d) {
    d.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && d.open) { d.open = false; d.querySelector("summary").focus(); }
    });
  });
  // Contact form: channel not configured, never submit anywhere.
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) { e.preventDefault(); });
    var m = /[?&]service=(s0[123])\b/.exec(location.search);
    var sel = document.getElementById("f-service");
    if (m && sel) sel.value = m[1];
  }
})();

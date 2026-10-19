// Minimal progressive enhancement. The site works without JS.
// Contact form: channel not configured — never submit anywhere.
(function () {
  var form = document.getElementById("contact-form");
  if (form) form.addEventListener("submit", function (e) { e.preventDefault(); });
})();

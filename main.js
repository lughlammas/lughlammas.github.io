// Minimal progressive enhancement. The site works without JS.
(function () {
  // Mobile menu (<details>): Escape closes it and returns focus to the toggle.
  document.querySelectorAll("details.nav-mobile").forEach(function (d) {
    d.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && d.open) { d.open = false; d.querySelector("summary").focus(); }
    });
  });
  // Card links (whole card clickable, focus ring drawn on the card): the browser only scrolls the
  // focused <a> clear of the sticky header, so bring the whole card clear when it fits on screen.
  // The card's own scroll-margin-top (styles.css, --scroll-offset) sets the gap under the header.
  document.addEventListener("focusin", function (e) {
    var c = e.target.closest && e.target.closest(".card--link"); if (!c) return;
    var h = document.querySelector(".site-header"), hb = h ? h.getBoundingClientRect().bottom : 0;
    var r = c.getBoundingClientRect();
    if (r.top < hb && r.height <= window.innerHeight - hb) c.scrollIntoView({ block: "start" });
  });
})();

/* ============================================================
   Espaço de Denúncias — EEMTI Dalva Queiroz de Carvalho
   Interações da página (sem dependências)
   ============================================================ */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Scroll reveal: elementos ganham a classe .is-visible ao entrar na tela ---- */
  var revealElems = document.querySelectorAll(".reveal");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    // Sem animação: mostra tudo direto
    revealElems.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealElems.forEach(function (el) { io.observe(el); });
  }

  /* ---- Botão voltar ao topo ---- */
  var backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    var onScroll = function () {
      backToTop.classList.toggle("is-visible", window.scrollY > 480);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth"
      });
    });
  }
})();

document.addEventListener("DOMContentLoaded", () => {
  feather.replace();

  const iconBtns = Array.from(document.querySelectorAll(".icon-btn"));
  const panels = Array.from(document.querySelectorAll("[data-panel]"));

  function setActive(section) {
    iconBtns.forEach(btn => {
      const s = btn.dataset.section;
      btn.classList.toggle("active", s === section);
      btn.setAttribute('aria-pressed', s === section ? 'true' : 'false');
    });

    panels.forEach(p => {
      const name = p.dataset.panel;
      p.hidden = (name !== section);
    });
  }

  setActive("home");

  iconBtns.forEach(btn => {
    btn.addEventListener("click", () => setActive(btn.dataset.section));
    btn.addEventListener("keyup", (ev) => {
      if (ev.key === "Enter" || ev.key === " ") btn.click();
    });
    btn.setAttribute("tabindex", "0");
  });

  const leftNav = document.querySelector(".left-nav");
  const rightBanner = document.querySelector(".right-banner");
  const bannerImg = rightBanner ? rightBanner.querySelector(".right-banner__img") : null;
  const particlesHost = rightBanner ? rightBanner.querySelector(".right-banner__particles") : null;

  function syncBannerHeight() {
    if (!leftNav || !rightBanner) return;
    const h = leftNav.offsetHeight;
    document.documentElement.style.setProperty('--leftnav-h', h + 'px');
    rightBanner.style.height = h + 'px';

    if (bannerImg) {
      bannerImg.style.height = '100%';
      bannerImg.style.width = 'auto';
      bannerImg.style.maxHeight = h + 'px';
    }

    const bannerWidth = rightBanner.offsetWidth || 220;
    document.documentElement.style.setProperty('--right-banner-w', bannerWidth + 'px');
  }

  syncBannerHeight();
  window.addEventListener("resize", syncBannerHeight);

  if (particlesHost && rightBanner) {
    const spawnInterval = 120;

    function spawnParticle() {
      const rect = rightBanner.getBoundingClientRect();
      const particle = document.createElement("div");
      particle.className = "particle-square";

      const leftPx = Math.random() * rect.width;
      particle.style.left = Math.round(leftPx) + "px";

      const size = 4 + Math.round(Math.random() * 10);
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.borderRadius = '0px';

      const dur = 2200 + Math.round(Math.random() * 2200);
      particle.style.animation = `particleRise ${dur}ms linear forwards`;

      particle.style.bottom = (2 + Math.random() * 8) + 'px';

      particlesHost.appendChild(particle);
      setTimeout(() => { particle.remove(); }, dur + 50);
    }

    const particleTimer = setInterval(spawnParticle, spawnInterval);
    window.addEventListener('beforeunload', () => clearInterval(particleTimer));
  }

  const eventCards = document.querySelectorAll(".event-card");

  eventCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      eventCards.forEach(c => {
        if (c !== card) {
          c.classList.add("dimmed");
        }
      });
    });
    card.addEventListener("mouseleave", () => {
      eventCards.forEach(c => c.classList.remove("dimmed"));
    });
  });
});

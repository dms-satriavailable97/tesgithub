const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const siteHeader = document.getElementById("siteHeader");
const menuLinks = document.querySelectorAll(".nav-menu a");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

window.addEventListener("scroll", () => {
  if (!siteHeader) return;
  siteHeader.classList.toggle("scrolled", window.scrollY > 16);
});

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((item) => observer.observe(item));
} else {
  revealElements.forEach((item) => item.classList.add("show"));
}

// ============================================================
//   Vraj Panchal Portfolio — Standalone JavaScript
// ============================================================

// ===== FOOTER YEAR =====
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== NAVBAR SCROLL EFFECT =====
const navLogo = document.querySelector(".nav-logo");

navLogo.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
});

// ===== SMOOTH SCROLL FOR ALL HASH LINKS =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#") return;
    
    try {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
        // Close mobile menu if open
        document.getElementById("mobileMenu").classList.remove("open");
        document.getElementById("hamIcon").className = "fa-solid fa-bars";
      }
    } catch (err) {
      console.warn("Invalid scroll target:", href);
    }
  });
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const hamIcon = document.getElementById("hamIcon");

hamburger.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  hamIcon.className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
});

// Close mobile menu when any mobile link clicked
document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    hamIcon.className = "fa-solid fa-bars";
  });
});

// ===== TYPING ANIMATION =====
const roles = [
  "Full Stack Developer.",
  "Cloud & DevOps Enthusiast.",
];
let roleIndex = 0,
  charIndex = 0,
  isDeleting = false;
const typingEl = document.getElementById("typingText");

function typeLoop() {
  const current = roles[roleIndex];
  typingEl.textContent = isDeleting
    ? current.substring(0, charIndex--)
    : current.substring(0, charIndex++);

  let delay = isDeleting ? 50 : 90;

  if (!isDeleting && charIndex === current.length + 1) {
    delay = 1600;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400;
  }
  setTimeout(typeLoop, delay);
}
typeLoop();

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

// ===== ABOUT TABS =====
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const tab = btn.getAttribute("data-tab");

    // Update buttons
    document
      .querySelectorAll(".tab-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // Update panels
    document
      .querySelectorAll(".tab-panel")
      .forEach((p) => p.classList.remove("active"));
    document.getElementById("tab-" + tab).classList.add("active");
  });
});

// ===== PROJECT FILTER =====
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");

    // Update active button
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // Show / hide cards
    projectCards.forEach((card) => {
      const cat = card.getAttribute("data-category");
      if (filter === "all" || cat === filter) {
        card.style.display = "";
        // Trigger re-reveal animation
        card.classList.remove("visible");
        setTimeout(() => card.classList.add("visible"), 50);
      } else {
        card.style.display = "none";
      }
    });
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const formSuccess = document.getElementById("formSuccess");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.innerHTML =
    'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';

  emailjs.sendForm(
    "service_zl6u9ww",
    "template_v0h10l8",
    contactForm,   // ✅ IMPORTANT: pass form element, NOT string
    "lza4lrGroLdmw2ZO-"
  )
  .then(() => {
    contactForm.style.display = "none";
    formSuccess.classList.add("visible");
    contactForm.reset();
  })
  .catch((error) => {
    console.error("EmailJS Error:", error);
    alert("Failed to send message.");
  })
  .finally(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML =
      'Send Message <i class="fa-solid fa-paper-plane"></i>';
  });
});


const toggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeIcon.classList.replace("fa-moon", "fa-sun");
}

// Toggle
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    themeIcon.classList.replace("fa-moon", "fa-sun");
  } else {
    localStorage.setItem("theme", "light");
    themeIcon.classList.replace("fa-sun", "fa-moon");
  }
});
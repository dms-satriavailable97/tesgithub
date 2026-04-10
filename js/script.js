// =============================
// Responsive navigation (hamburger menu)
// =============================
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// =============================
// Dark mode toggle + localStorage persistence
// =============================
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  if (themeToggle) themeToggle.textContent = "☀️";
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
  });
}

// =============================
// Scroll reveal animation dengan IntersectionObserver
// =============================
const reveals = document.querySelectorAll(".reveal");

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

  reveals.forEach((element) => observer.observe(element));
} else {
  reveals.forEach((element) => element.classList.add("show"));
}

// =============================
// Validasi form contact
// =============================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");
  const successMsg = document.getElementById("formSuccess");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Reset pesan error/success sebelum validasi
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    successMsg.textContent = "";

    let isValid = true;

    // Validasi nama tidak boleh kosong
    if (!nameInput.value.trim()) {
      nameError.textContent = "Nama wajib diisi.";
      isValid = false;
    }

    // Validasi email: tidak kosong + format harus valid
    if (!emailInput.value.trim()) {
      emailError.textContent = "Email wajib diisi.";
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      emailError.textContent = "Format email tidak valid.";
      isValid = false;
    }

    // Validasi pesan tidak boleh kosong
    if (!messageInput.value.trim()) {
      messageError.textContent = "Pesan wajib diisi.";
      isValid = false;
    }

    // Jika valid, tampilkan pesan sukses sederhana
    if (isValid) {
      successMsg.textContent = "Pesan berhasil divalidasi. Terima kasih sudah menghubungi!";
      contactForm.reset();
    }
  });
}

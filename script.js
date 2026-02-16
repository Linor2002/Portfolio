// =========== אנימציות גלילה ===========
const faders = document.querySelectorAll(".fade-in");
const cards = document.querySelectorAll(
  ".services-card, .comments-grid > div, .contact-form"
);

const options = {
  threshold: 0.1,
};

const appearOnScroll = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, options);

// לכל האלמנטים עם fade-in
faders.forEach((fader) => {
  appearOnScroll.observe(fader);
});

// לכרטיסי שירותים, ביקורות וטופס
cards.forEach((card) => {
  appearOnScroll.observe(card);
});

// תמונות בגודל לחיצה - אנימציה
const galleryItems = document.querySelectorAll(".gallery-item img");

galleryItems.forEach((img) => {
  img.addEventListener("click", () => {
    const overlay = document.createElement("div");
    overlay.classList.add("lightbox-overlay");
    overlay.innerHTML = `<img src="${img.src}" alt="${img.alt}" />`;
    document.body.appendChild(overlay);

    overlay.addEventListener("click", () => {
      overlay.remove();
    });
  });
});

// גלילה עם חיצים
const slider = document.querySelector(".gallery-slider");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

const slideWidth = document.querySelector(".gallery-item").offsetWidth;

nextBtn.addEventListener("click", () => {
  slider.scrollBy({ left: slideWidth, behavior: "smooth" });
});

prevBtn.addEventListener("click", () => {
  slider.scrollBy({ left: -slideWidth, behavior: "smooth" });
});

//mobile toggle
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

//קישור לוואצפ מהטופס
const form = document.getElementById("contact-form");
const statusText = document.getElementById("form-status");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !phone || !message) {
    statusText.style.color = "red";
    statusText.innerText = "נא למלא את כל השדות.";
    return;
  }

  const whatsappNumber = "972502475118"; // המספר שלך בלי 0

  const text =
    `תודה שיצרת קשר עם אברהם עובדיה חשמל איך אפשר לעזור?:%0a%0a` +
    `שם: ${name}%0a` +
    `טלפון: ${phone}%0a` +
    `הודעה: ${message}`;

  const url = `https://wa.me/${whatsappNumber}?text=${text}`;

  window.open(url, "_blank");

  statusText.style.color = "green";
  statusText.innerText = "הפנייה נפתחה בוואטסאפ...";

  form.reset();
});

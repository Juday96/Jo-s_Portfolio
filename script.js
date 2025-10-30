// Contact Form Validation
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const formMessage = document.getElementById("formMessage");

  if (name === "" || email === "" || message === "") {
    formMessage.textContent = "Please fill out all fields.";
    formMessage.style.color = "red";
  } else if (!email.includes("@")) {
    formMessage.textContent = "Please enter a valid email address.";
    formMessage.style.color = "red";
  } else {
    formMessage.textContent = "Message sent successfully!";
    formMessage.style.color = "green";
    document.getElementById("contactForm").reset();
  }
});

// Scroll Reveal Animation
const hiddenElements = document.querySelectorAll(".hidden, .project-card");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

hiddenElements.forEach(el => observer.observe(el));

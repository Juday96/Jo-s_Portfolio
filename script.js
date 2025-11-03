// Supabase Setup (replace with your own project credentials)
const SUPABASE_URL = "https://bvcnrtzdokpbtviltfrm.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2Y25ydHpkb2twYnR2aWx0ZnJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4NDY2ODIsImV4cCI6MjA3NzQyMjY4Mn0.712wd-PfOJujCzftT6nfT-hg2E69eyaXZFW8kBapDSA";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Contact Form
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  try {
    const { data, error } = await supabase.from("messages").insert([{ name, email, message }]);
    if (error) throw error;

    formMessage.textContent = "Message sent successfully!";
    formMessage.style.color = "green";
    form.reset();
  } catch (err) {
    formMessage.textContent = "There was an error sending your message.";
    formMessage.style.color = "red";
    console.error(err);
  }
});

// Scroll Animation
const hiddenElements = document.querySelectorAll(".hidden");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

hiddenElements.forEach((el) => observer.observe(el));

// Mobile Menu
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

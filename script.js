// Initialize Supabase client
const SUPABASE_URL = "https://bvcnrtzdokpbtviltfrm.supabase.co";
const SUPABASE_KEY = "YOUR_PUBLIC_ANON_KEY"; // Replace with your anon key
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Handle form submission
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const formMessage = document.getElementById("formMessage");

  if (!name || !email || !message) {
    formMessage.textContent = "Please fill out all fields.";
    formMessage.style.color = "red";
    return;
  }

  if (!email.includes("@")) {
    formMessage.textContent = "Please enter a valid email address.";
    formMessage.style.color = "red";
    return;
  }

  // Insert into Supabase table 'messages'
  const { data, error } = await supabase.from("messages").insert([{ name, email, message }]);

  if (error) {
    console.error("Supabase insert error:", error);
    formMessage.textContent = "There was an error sending your message.";
    formMessage.style.color = "red";
  } else {
    formMessage.textContent = "Message sent successfully!";
    formMessage.style.color = "green";
    document.getElementById("contactForm").reset();
  }
});

// Scroll Reveal Animation
const hiddenElements = document.querySelectorAll(".hidden, .project-card");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

hiddenElements.forEach((el) => observer.observe(el));

// Responsive Hamburger Menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("open");
});

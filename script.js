// Supabase Setup (replace with your own project credentials)
const SUPABASE_URL = "https://bvcnrtzdokpbtviltfrm.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2Y25ydHpkb2twYnR2aWx0ZnJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4NDY2ODIsImV4cCI6MjA3NzQyMjY4Mn0.712wd-PfOJujCzftT6nfT-hg2E69eyaXZFW8kBapDSA";
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

// Mobile Menu
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Carousel Functionality (Manual Only with Smooth Infinite Loop)
document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach(carousel => {
    const images = carousel.querySelector('.carousel-images');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    let slides = images.children;
    const totalImages = slides.length;
    let index = 0;

    // Clone first and last image for smooth infinite effect
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[totalImages - 1].cloneNode(true);

    images.appendChild(firstClone);
    images.insertBefore(lastClone, slides[0]);

    // Update slides after cloning
    slides = images.children;

    let currentIndex = 1; // Start from the actual first image
    const imageWidth = 100; // % width for transform
    images.style.transform = `translateX(-${currentIndex * imageWidth}%)`;

    // Function to show image by index
    function showImage() {
      images.style.transition = "transform 0.5s ease-in-out";
      images.style.transform = `translateX(-${currentIndex * imageWidth}%)`;
    }

    // Handle next button
    nextBtn.addEventListener('click', () => {
      if (currentIndex >= slides.length - 1) return; // stop while animating
      currentIndex++;
      showImage();
    });

    // Handle previous button
    prevBtn.addEventListener('click', () => {
      if (currentIndex <= 0) return; // stop while animating
      currentIndex--;
      showImage();
    });

    // Reset position instantly after transition ends (for infinite loop)
    images.addEventListener('transitionend', () => {
      if (slides[currentIndex].isSameNode(firstClone)) {
        images.style.transition = "none";
        currentIndex = 1;
        images.style.transform = `translateX(-${currentIndex * imageWidth}%)`;
      }
      if (slides[currentIndex].isSameNode(lastClone)) {
        images.style.transition = "none";
        currentIndex = slides.length - 2;
        images.style.transform = `translateX(-${currentIndex * imageWidth}%)`;
      }
    });
  });
});





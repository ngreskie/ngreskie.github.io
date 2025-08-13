---
layout: default
title: Home
---

<!-- AOS CSS -->
<link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />


<section id="hero" data-aos="fade-up">
  <h1>Welcome to My Engineering Portfolio</h1>
  <p>Mechanical engineering student passionate about design, manufacturing, and innovation.</p>
</section>

<section id="projects" data-aos="fade-up">
  <h2>Featured Projects</h2>
  <div class="project-card" data-aos="fade-right">
    <h3>Injection Mold Design</h3>
    <p>Developed a custom injection mold for a complex plastic component, optimizing cycle time and material usage.</p>
  </div>
  <div class="project-card" data-aos="fade-left">
    <h3>CNC Automation Tool</h3>
    <p>Created a Python automation tool to parse CNC programs and streamline manufacturing workflows.</p>
  </div>
  <div class="project-card" data-aos="fade-right">
    <h3>Mechanical Testing Rig</h3>
    <p>Designed and built a benchtop rig for material fatigue testing.</p>
  </div>
</section>

<section id="about" data-aos="fade-up">
  <h2>About Me</h2>
  <p>Hi, I'm Noah. I specialize in mechanical design and manufacturing, and I enjoy creating tools that make processes more efficient.</p>
</section>

<section id="contact" data-aos="fade-up">
  <h2>Contact</h2>
  <p>Want to get in touch? Email me at <a href="mailto:youremail@example.com">youremail@example.com</a>.</p>
</section>


<!-- AOS JS -->
<script src="https://unpkg.com/aos@next/dist/aos.js"></script>
<script>
  AOS.init({
    duration: 1000,
    once: true,
  });
</script>
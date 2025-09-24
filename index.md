---
layout: default
title: Home
---

<nav class="main-nav">
    <button class="nav-btn active" onclick="showSection('home')">Home</button>
    <button class="nav-btn" onclick="showSection('all-projects')">All Projects</button>
</nav>

<!-- HOME SECTION -->
<div id="home" class="section active">
    <section id="hero" data-aos="fade-up" class="fade-in">
        <h1>Welcome to my Portfolio</h1>
        <p>I’m passionate about open-source design and engineering to make ideas tangible and lasting.</p>
    </section>
    
    <section id="projects" data-aos="fade-up" class="fade-in">
        <h2>Featured Projects</h2>
        {% for project in site.data.projects %}
            {% if project[1].featured %}
                {% include project-card.html %}
            {% endif %}
        {% endfor %}
    </section>

    <section id="about" data-aos="fade-up" class="fade-in">
        <h2>About Me</h2>
        <p>Hi, I'm Noah. I specialize in mechanical design and manufacturing, and I enjoy creating tools that make processes more efficient.</p>
    </section>

    <section id="contact" data-aos="fade-up" class="fade-in">
        <h2>Contact</h2>
        <p>Want to get in touch? Email me at <a href="mailto:noahgreskiewicz@gmail.com" style="color: #0a84ff;">noahgreskiewicz@gmail.com</a>.</p>
    </section>
</div>

<!-- PROJECTS SECTION -->
<div id="all-projects" class="section">
    <section>
        <h2>All Projects</h2>
        {% for project in site.data.projects %}
            {% include project-card.html %}
        {% endfor %}
    </section>
</div>

<!-- PROJECT DETAIL VIEWS -->
<div id="project-details">
    {% for project in site.data.projects %}
    <div id="detail-{{ project[1].id }}" class="project-detail">
        <a href="#" class="back-btn" onclick="return goBack()">&larr; Back to Home</a>
        <div class="project-header">
            <h1>{{ project[1].title }}</h1>
            <div class="project-meta">
                <span>{{ project[1].date }}</span>
                <span>{{ project[1].status }}</span>
            </div>
            <div class="project-tags">
                {% for tag in project[1].tags %}
                <span class="project-tag">{{ tag }}</span>
                {% endfor %}
            </div>
        </div>
        <div class="project-content">
            {{ project[1].fullDescription | markdownify }}
        </div>
    </div>
    {% endfor %}
</div>
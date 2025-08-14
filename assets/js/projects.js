// Project functionality
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Hide all project details
    document.querySelectorAll('.project-detail').forEach(detail => {
        detail.classList.remove('active');
    });
    
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
        // Find the corresponding nav button and activate it
        const navBtn = document.querySelector(`[onclick="showSection('${sectionName}')"]`);
        if (navBtn) navBtn.classList.add('active');
    }
}

function showProject(projectId) {
    // Hide main sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Show project detail
    const detailElement = document.getElementById(`detail-${projectId}`);
    if (detailElement) {
        detailElement.classList.add('active');
    }
}

function goBack() {
    showSection('home');
    return false;
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Set initial active states
    const homeSection = document.getElementById('home');
    const homeBtn = document.querySelector("[onclick=\"showSection('home')\"]");
    
    if (homeSection) homeSection.classList.add('active');
    if (homeBtn) homeBtn.classList.add('active');
});
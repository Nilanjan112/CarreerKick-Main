// Profile Picture Upload
const profilePicInput = document.getElementById('profilePic');
const profilePicPreview = document.getElementById('profilePicPreview');
const uploadBtn = document.querySelector('.upload-btn');

uploadBtn.addEventListener('click', () => {
    profilePicInput.click();
});

profilePicInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            profilePicPreview.innerHTML = `<img src="${e.target.result}" alt="Profile Picture">`;
            profilePicPreview.style.border = 'none';
        };
        reader.readAsDataURL(file);
    }
});

// Skills Input
const skillInput = document.getElementById('skillInput');
const skillsTags = document.getElementById('skillsTags');
let skills = [];

skillInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const skill = skillInput.value.trim();
        if (skill && !skills.includes(skill)) {
            addSkill(skill);
            skillInput.value = '';
        }
    }
});

function addSkill(skill) {
    skills.push(skill);
    const tag = document.createElement('div');
    tag.className = 'skill-tag';
    tag.innerHTML = `
        ${skill}
        <ion-icon name="close-outline" onclick="removeSkill('${skill}')"></ion-icon>
    `;
    skillsTags.appendChild(tag);
}

function removeSkill(skill) {
    skills = skills.filter(s => s !== skill);
    renderSkills();
}

function renderSkills() {
    skillsTags.innerHTML = '';
    skills.forEach(addSkill);
}

// Form Submission
const profileSetupForm = document.getElementById('profileSetupForm');

profileSetupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        title: document.getElementById('title').value,
        location: document.getElementById('location').value,
        bio: document.getElementById('bio').value,
        experience: document.getElementById('experience').value,
        jobType: document.getElementById('jobType').value,
        skills: skills
    };

    try {
        // Show loading state
        const submitBtn = document.querySelector('.complete-btn');
        submitBtn.innerHTML = '<span>Setting up...</span>';
        submitBtn.disabled = true;

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Save profile data
        localStorage.setItem('profileData', JSON.stringify(formData));

        // Redirect to main profile page
        window.location.href = 'profile.html';

    } catch (error) {
        console.error('Error setting up profile:', error);
        alert('An error occurred. Please try again.');
    }
});

// Skip button
document.querySelector('.skip-btn').addEventListener('click', () => {
    if (confirm('Are you sure you want to skip profile setup? You can complete it later.')) {
        window.location.href = 'profile.html';
    }
});

// Add these new functions
const initializeProfileSetup = () => {
    const steps = document.querySelectorAll('.step');
    const progressFill = document.querySelector('.progress-fill');
    let currentStep = 0;

    const updateProgress = (step) => {
        const progress = ((step + 1) / steps.length) * 100;
        progressFill.style.width = `${progress}%`;
        
        steps.forEach((s, index) => {
            s.classList.toggle('active', index <= step);
        });
    };

    // Profile Picture 3D Effect
    const picContainer = document.querySelector('.pic-container');
    picContainer.addEventListener('mousemove', (e) => {
        const rect = picContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        picContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    picContainer.addEventListener('mouseleave', () => {
        picContainer.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });

    // Form Section Animations
    const formSections = document.querySelectorAll('.form-section');
    formSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 300 * (index + 1));
    });

    // Initialize first step
    updateProgress(currentStep);
};

// Call initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeProfileSetup); 
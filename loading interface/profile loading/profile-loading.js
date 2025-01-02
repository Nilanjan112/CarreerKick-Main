class StudentProfile {
    constructor() {
        this.init();
    }

    async init() {
        showLoading();
        try {
            await this.loadProfileData();
            document.querySelector('.profile-container').classList.add('loaded');
        } catch (error) {
            console.error('Error loading profile:', error);
        } finally {
            hideLoading();
        }
    }

    async loadProfileData() {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock data - replace with actual API call
        const studentData = {
            name: "John Doe",
            studentId: "STU123456",
            avatar: "https://i.pravatar.cc/300",
            dob: "1999-05-15",
            email: "john.doe@university.edu",
            phone: "+1 (555) 123-4567",
            address: "123 University Ave, College Town, ST 12345",
            department: "Computer Science",
            semester: "6th Semester",
            cgpa: "3.85",
            status: "Active"
        };

        this.updateProfile(studentData);
    }

    updateProfile(data) {
        document.getElementById('studentName').textContent = data.name;
        document.getElementById('studentId').textContent = `ID: ${data.studentId}`;
        document.getElementById('studentAvatar').src = data.avatar;
        document.getElementById('dob').textContent = data.dob;
        document.getElementById('email').textContent = data.email;
        document.getElementById('phone').textContent = data.phone;
        document.getElementById('address').textContent = data.address;
        document.getElementById('department').textContent = data.department;
        document.getElementById('semester').textContent = data.semester;
        document.getElementById('cgpa').textContent = data.cgpa;
        document.getElementById('status').textContent = data.status;
    }
}

// Initialize the profile when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new StudentProfile();
}); 
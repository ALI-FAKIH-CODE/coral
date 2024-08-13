document.addEventListener('DOMContentLoaded', () => {
    const educationBtn = document.getElementById('education-btn');
    const educationSection = document.getElementById('education-section');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    educationBtn.addEventListener('click', () => {
        educationSection.classList.toggle('hidden');
    });

    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const targetId = e.target.getAttribute('data-target');
            tabContents.forEach(content => {
                if (content.id === targetId) {
                    content.classList.remove('hidden');
                } else {
                    content.classList.add('hidden');
                }
            });
        });
    });
});


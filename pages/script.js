// Get the student's ID from the URL, e.g. mysite.com/student.html?id=student1
const urlParams = new URLSearchParams(window.location.search);
const studentId = urlParams.get('id');

// Fetch the student data from the JSON file
fetch('students.json')
    .then(response => response.json())
    .then(students => {
        const student = students[studentId];

        // Update the page with the student's data
        document.querySelector('.student-banner::before').style.backgroundImage = `url(${student.banner_image})`;
        document.querySelector('.student-banner2').style.backgroundImage = `url(${student.banner_image})`;
        document.querySelector('.student-banner-name').textContent = student.name;
        document.querySelector('.student-quote-container h1').textContent = student.quote;
    });

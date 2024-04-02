// Get the student's ID from the URL, e.g. mysite.com/student.html?id=student1
const urlParams = new URLSearchParams(window.location.search);
const studentId = urlParams.get('id');

// Fetch the student data from the JSON file
fetch('/students.json')
    .then(response => response.json())
    .then(students => {
        const student = students[studentId];

        // Generate the banner image filename from the student's name
        const bannerImage = '/images/' + student.n.replace(/ /g, '').toLowerCase() + '.webp';

        // Update the page with the student's data
        document.querySelector('.student-banner').style.backgroundImage = `url(${bannerImage})`;
        document.querySelector('.student-banner2').style.backgroundImage = `url(${bannerImage})`;
        document.querySelector('.student-banner-name').textContent = student.n.toUpperCase();
        document.querySelector('.student-banner-symbol').textContent = student.s.join('');
        document.querySelector('.student-quote-container h1').textContent = '"' + student.q.toUpperCase() + '"';
    });

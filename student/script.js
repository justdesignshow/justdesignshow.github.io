// Get the student's ID from the URL, e.g. mysite.com/student.html?id=student1
const urlParams = new URLSearchParams(window.location.search);
const studentId = urlParams.get('id');    

// Fetch the student data from the JSON file
fetch('/students.json')
    .then(response => response.json())
    .then(students => {
        const student = students[studentId];
        const lowResImage = '/images/' + student.n.replace(/ /g, '').toLowerCase() + '/banner-lq.webp';
        const highResImage = '/images/' + student.n.replace(/ /g, '').toLowerCase() + '/banner.webp';
        console.log('/images/' + student.n.replace(/ /g, '').toLowerCase() + '/banner-lq.webp');
        // Set low-res image first
        document.querySelector('.student-banner').style.backgroundImage = `url(${lowResImage})`;
        document.querySelector('.student-banner2').style.backgroundImage = `url(${lowResImage})`;

        // Preload high-res image and replace it once loaded
        const highResImg = new Image();
        highResImg.onload = () => {
          document.querySelector('.student-banner').style.backgroundImage = `url(${highResImage})`;
          document.querySelector('.student-banner2').style.backgroundImage = `url(${highResImage})`;
        };
        highResImg.src = highResImage;

        // Generate the banner image filename from the student's name
        // const bannerImage = '/images/' + student.n.replace(/ /g, '').toLowerCase() + '/banner.webp';
        

        // // Update the page with the student's data
        // document.querySelector('.student-banner').style.backgroundImage = `url(${bannerImage})`;
        // document.querySelector('.student-banner2').style.backgroundImage = `url(${bannerImage})`;
        document.querySelector('.student-banner-name').textContent = student.n.toUpperCase();
        document.querySelector('.student-banner-symbol').textContent = student.work1s + student.work2s + student.work3s;
        document.querySelector('.student-quote-container h1').textContent = '"' + student.q.toUpperCase() + '"';
        

        // Mapping of symbols to labels
        var symbolToLabel = {
            '!': 'BRANDING',
            '&': 'TYPOGRAPHY',
            '<': 'WEB/UI/UX',
            '~': 'ILLUSTRATION',
            '&#x2192;': 'EXHIBITION',
            '?': 'EDITORIAL',
            '+': 'INFORMATION',
            '*': 'PACKAGING',
            '>': 'ANIMATION/MOTION'};

        function updateLabel(about, labelId) {
            // Get the symbol
            var symbol = document.querySelector(about).innerText;
            
            // Get the corresponding label
            var label = symbolToLabel[symbol];
            
            // Update the label
            document.querySelector(labelId).innerText = label;
        }

        if (student.work1t.trim() == "") {
            document.querySelector('#work1').style.display = 'none';
        } else {
            document.querySelector('#work1').style.backgroundImage = 'url(/images/' + student.n.replace(/ /g, '').toLowerCase() + '/w1.webp)';
            document.querySelector('#work1-about').src = '/images/' + student.n.replace(/ /g, '').toLowerCase() + '/w1.png';
            document.querySelector('#w1s').textContent = student.work1s;
            document.querySelector('#w1s-about').textContent = student.work1s;
            document.querySelector('#w1t').textContent = student.work1t;
            document.querySelector('#w1d').textContent = student.work1d;
            updateLabel('#w1s-about', '#w1s-label');
        }

        if (student.work2t.trim() == "") {
            document.querySelector('#work2').style.display = 'none';
        } else {
            document.querySelector('#work2').style.backgroundImage = 'url(/images/' + student.n.replace(/ /g, '').toLowerCase() + '/w2.webp)';
            document.querySelector('#work2-about').src = '/images/' + student.n.replace(/ /g, '').toLowerCase() + '/w2.png';
            document.querySelector('#w2s').textContent = student.work2s;
            document.querySelector('#w2s-about').textContent = student.work2s;
            document.querySelector('#w2t').textContent = student.work2t;
            document.querySelector('#w2d').textContent = student.work2d;
            updateLabel('#w2s-about', '#w2s-label');
        }

        if (student.work3t.trim() == "") {
            document.querySelector('#work3').style.display = 'none';
        } else {
            document.querySelector('#work3').style.backgroundImage = 'url(/images/' + student.n.replace(/ /g, '').toLowerCase() + '/w3.webp)';
            document.querySelector('#work3-about').src = '/images/' + student.n.replace(/ /g, '').toLowerCase() + '/w3.png';
            document.querySelector('#w3s').textContent = student.work3s;
            document.querySelector('#w3s-about').textContent = student.work3s;
            document.querySelector('#w3t').textContent = student.work3t;
            document.querySelector('#w3d').textContent = student.work3d;
            updateLabel('#w3s-about', '#w3s-label');
        }
    });
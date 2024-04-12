// Get the student's ID from the URL, e.g. mysite.com/student.html?id=student1
const urlParams = new URLSearchParams(window.location.search);
const studentId = urlParams.get('id');    

// Fetch the student data from the JSON file
fetch('/students.json')
    .then(response => response.json())
    .then(students => {
        const student = students[studentId];

        // Generate the banner image filename from the student's name
        const bannerImage = '/images/' + student.n.replace(/ /g, '').toLowerCase() + '/banner.webp';
        
        // // Update the page with the student's data
        document.querySelector('.student-banner').style.backgroundImage = `url(${bannerImage})`;
        document.querySelector('.student-banner2').style.backgroundImage = `url(${bannerImage})`;
        document.querySelector('.student-banner-name').textContent = student.n.toUpperCase();
        const symbols = new Set([...student.work1s, ...student.work2s, ...student.work3s]);
        document.querySelector('.student-banner-symbol').textContent = Array.from(symbols).join('');
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
            '>': 'ANIMATION/MOTION'
        };

        // Function to check if the file exists
        function updateLabel(about, labelId) {
            // Get the symbol
            var symbol = document.querySelector(about).innerText;
            
            // Get the corresponding label
            var label = symbolToLabel[symbol];
            
            // Update the label
            document.querySelector(labelId).innerText = label;
        };

        function fileExists(filePath, callback) {
            fetch(filePath, { method: 'HEAD' })
                .then(response => {
                    callback(response.ok);
                })
                .catch(() => callback(false));
        }
        
        function pngormp4(pngPath, mp4Path, imgElement, videoElement) {
            fileExists(pngPath, exists => {
                if (exists) {
                    imgElement.style.display = 'block';
                    videoElement.style.display = 'none';
                    imgElement.src = pngPath;
                } else {
                    fileExists(mp4Path, exists => {
                        if (exists) {
                            videoElement.style.display = 'block';
                            imgElement.style.display = 'none';
                            videoElement.src = mp4Path;
                        } else {
                            // Explicitly hide both elements if neither file is found
                            imgElement.style.display = 'none';
                            videoElement.style.display = 'none';
                        }
                    });
                }
            });
        }
        
        function updateWorkPage(workNumber, student) {
            var workId = '#work' + workNumber;
            var workPageId = workId + '-page';
            var workFileName = student.n.replace(/ /g, '').toLowerCase() + '/w' + workNumber;
            var workFilePath = '/images/' + workFileName;
            var imgElement = document.querySelector(workPageId + ' img.work-page-image');
            var videoElement = document.querySelector(workPageId + ' video.work-page-image');
        
            if (student['work' + workNumber + 't'].trim() == "") {
                document.querySelector(workId).style.display = 'none';
            } else {
                pngormp4(workFilePath + '.png', workFilePath + '.mp4', imgElement, videoElement);
                document.querySelector(workId).style.backgroundImage = 'url(' + workFilePath + '.webp)';
                ['s', 't', 'd'].forEach(suffix => {
                    var contentId = '#work' + workNumber + suffix;
                    document.querySelector('' + contentId).textContent = student['work' + workNumber + suffix];
                });
                document.querySelector('#w' + workNumber + 's-about').textContent = student['work' + workNumber + 's'];
                updateLabel('#w' + workNumber + 's-about', '#w' + workNumber + 's-label');
            }
        };
        
        // Call the function for each work
        updateWorkPage(1, student);
        updateWorkPage(2, student);
        updateWorkPage(3, student);

    })
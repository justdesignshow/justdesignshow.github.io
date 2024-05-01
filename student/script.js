// Get the student's ID from the URL, e.g. mysite.com/student.html?id=student1
const urlParams = new URLSearchParams(window.location.search);
const studentId = urlParams.get('id');    

// Fetch the student data from the JSON file
fetch('/students.json')
    .then(response => response.json())
    .then(students => {
        const student = students[studentId];

        // Generate the banner image filename from the student's name
        const bannerImage = '/images/' + student.n.replace(/ /g, '').toLowerCase() + '/banner';
        
        // // Update the page with the student's data
        document.querySelector('.student-banner').style.backgroundImage = `url(${bannerImage}.webp), url(${bannerImage}-1.webp)`;
        document.querySelector('.student-banner2').style.backgroundImage = `url(${bannerImage}.webp), url(${bannerImage}-1.webp)`;
        document.querySelector('.student-banner-name').textContent = student.n.toUpperCase();
        const symbols = new Set([...student.work1s, ...student.work2s, ...student.work3s]);
        document.querySelector('.student-banner-symbol').textContent = Array.from(symbols).join('');
        document.querySelector('.student-quote-container h1').textContent = '"' + student.q.toUpperCase() + '"';
        const portfolioLink = document.querySelector('.portfolio');
        const linkedinLink = document.querySelector('.linkedin');
        const instagramLink = document.querySelector('.instagram');
        const emailLink = document.querySelector('.email');

        portfolioLink.style.display = student.p ? "flex" : "none";
        linkedinLink.style.display = student.l ? "flex" : "none";
        instagramLink.style.display = student.i ? "flex" : "none";
        emailLink.style.display = student.e ? "flex" : "none";

        if (student.p) portfolioLink.href = student.p;
        if (student.l) linkedinLink.href = 'https://www.linkedin.com/in/' + student.l;
        if (student.i) instagramLink.href = 'https://www.instagram.com/' + student.i;
        if (student.e) emailLink.href = student.e;
        if (student.e) document.querySelector('.emaila').textContent = student.e.toUpperCase();

        // Function to copy text to clipboard
        function copyToClipboard(text) {
            if (navigator.clipboard && window.isSecureContext) {
                // Navigator clipboard api method'
                return navigator.clipboard.writeText(text);
            } else {
                // Fallback method
                const textArea = document.createElement("textarea");
                textArea.value = text;
                
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();

                try {
                    const successful = document.execCommand('copy');
                    if (successful) {
                        console.log("Fallback: Copying text command was successful");
                    } else {
                        console.error("Fallback: Copying text command was unsuccessful");
                    }
                } catch (err) {
                    console.error("Fallback: Oops, unable to copy", err);
                }

                document.body.removeChild(textArea);
            }
        }

        // Function to temporarily change the button text
        function temporaryButtonTextChange(linkElement, newText, originalText) {
            linkElement.textContent = newText;
            setTimeout(() => {
                linkElement.textContent = originalText;
            }, 2000); // Change back after 2 seconds
        }

        // Event listener for the email link
        emailLink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior
            const email = student.e;
            if (email) {
                copyToClipboard(email);
                temporaryButtonTextChange(document.querySelector('.emaila'), 'COPIED!', email.toUpperCase());
            }
        });

        // Set the initial text content for the email link
        if (student.email) {
            document.querySelector('.emaila').textContent = student.email.toUpperCase();
        }


        
        // Mapping of symbols to labels
        var symbolToLabel = {
            '!': 'BRANDING',
            '&': 'TYPOGRAPHY',
            '<': 'WEB/UI/UX',
            '~': 'ILLUSTRATION',
            '↗': 'EXPERIMENTAL',
            '?': 'EDITORIAL',
            '+': 'INFORMATION',
            '*': 'PACKAGING',
            '>': 'MOTION'
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
        
        function pngormp4(jpgPath, pngPath, mp4Path, imgElement, videoElement, anchorElement) {
            fileExists(jpgPath, exists => {
                if (exists) {
                    imgElement.style.display = 'block';
                    videoElement.style.display = 'none';
                    imgElement.src = jpgPath;
                    anchorElement.href = jpgPath
                } else {
                    fileExists(pngPath, exists => {
                        if (exists) {
                            imgElement.style.display = 'block';
                            videoElement.style.display = 'none';
                            imgElement.src = pngPath;
                            anchorElement.href = pngPath
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
            });
        }
        
        function updateWorkPage(workNumber, student) {
            var workId = '#work' + workNumber;
            var workPageId = workId + '-page';
            var workFileName = student.n.replace(/ /g, '').toLowerCase() + '/w' + workNumber;
            var workFilePath = '/images/' + workFileName;
            var imgElement = document.querySelector(workPageId + ' img.work-page-image');
            var videoElement = document.querySelector(workPageId + ' video.work-page-image');
            var anchorElement = document.querySelector(workPageId + ' a.image-link');
            
            if (student['work' + workNumber + 't'].trim() == "") {
                document.querySelector(workId).style.display = 'none';
            } else {
                pngormp4(workFilePath + '.jpg', workFilePath + '.png', workFilePath + '.mp4', imgElement, videoElement, anchorElement);
                document.querySelector(workId).style.backgroundImage = 'url(' + workFilePath + '.webp), url(' + workFilePath + '-1.webp)';
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
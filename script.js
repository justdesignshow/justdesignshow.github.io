window.onload = function() {
    let chk = document.getElementById('Toggle');
    let menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(function(item) {
        item.addEventListener('click', function() {chk.checked=false;});
    });
}

var typed = new Typed(".auto-type",{
    strings : ["JUST", "BRAND", "FILM", "UI UX", "TYPE", "JUST"],
    typeSpeed : 80,
    backSpeed : 30,
    looped : true,
    cursorChar: "I",
    onComplete(instance) {instance.cursor.remove();}
    }
)

// handle up/down scrollwheel on the scroller, as most folks don't have horizontal scroll

// scrollableElement.addEventListener('wheel', (ev) => {
//     if (document.documentElement.clientWidth > 600) {
//         ev.preventDefault();  // stop scrolling in another direction
//         scrollableElement.scrollLeft += (ev.deltaY + ev.deltaX);
// }});




// scrollableElement.addEventListener('wheel', (ev) => {
//   let targetElement = ev.target;
//   while (targetElement != null) {
//       if (targetElement.id === 'scroll') { // replace 'blacklisted-div' with the id of your div
//           return; // don't prevent default if the target is inside the blacklisted div
//       }
//       targetElement = targetElement.parentNode;
//   }

//   if (document.documentElement.clientWidth > 600) {
//       ev.preventDefault();  // stop scrolling in another direction
//       scrollableElement.scrollLeft += (ev.deltaY + ev.deltaX);
//   }
// });






// scrollableElement.addEventListener('wheel', (ev) => {
//   let targetElement = ev.target;
//   while (targetElement != null) {
//       if (targetElement.id === 'scroll') { // replace 'blacklisted-div' with the id of your div
//           if (targetElement.scrollTop === 0 && ev.deltaY < 0) {
//               ev.preventDefault();  // stop scrolling in another direction
//               scrollableElement.scrollLeft += (ev.deltaY + ev.deltaX);
//           }
//           return; // don't prevent default if the target is inside the blacklisted div
//       }
//       targetElement = targetElement.parentNode;
//   }

//   if (document.documentElement.clientWidth > 600) {
//       ev.preventDefault();  // stop scrolling in another direction
//       scrollableElement.scrollLeft += (ev.deltaY + ev.deltaX);
//   }
// });








// scrollableElement.addEventListener('wheel', (ev) => {
//   let targetElement = ev.target;
//   while (targetElement != null) {
//       if (targetElement.id === 'scroll') { // replace 'blacklisted-div' with the id of your div
//           if (targetElement.scrollTop === 0 && ev.deltaY < 0) {
//               ev.preventDefault();  // stop scrolling in another direction
//               scrollableElement.scrollLeft += (ev.deltaY + ev.deltaX);
//           }
//           return; // don't prevent default if the target is inside the blacklisted div
//       }
//       targetElement = targetElement.parentNode;
//   }

//   if (document.documentElement.clientWidth > 600) {
//       if (scrollableElement.scrollLeft < scrollableElement.scrollWidth - scrollableElement.clientWidth || ev.deltaY < 0) {
//           ev.preventDefault();  // stop scrolling in another direction
//           scrollableElement.scrollLeft += (ev.deltaY + ev.deltaX);
//       }
//   }
// });








// THIS IS THE OLD WORKING ONE

// scrollableElement.addEventListener('wheel', (ev) => {
//   let targetElement = ev.target;
//   while (targetElement != null) {
//       if (targetElement.id === 'scroll') { // replace 'blacklisted-div' with the id of your div
//           // If we're at the top or bottom of the div, allow horizontal scroll
//           if ((ev.deltaY < 0 && targetElement.scrollTop === 0) ||
//               (ev.deltaY > 0 && targetElement.scrollTop + targetElement.clientHeight >= targetElement.scrollHeight)) {
//               break;
//           }
//           // If horizontal scroll is at the end, allow default vertical scroll
//           if (scrollableElement.scrollLeft >= scrollableElement.scrollWidth - scrollableElement.clientWidth) {
//               return;
//           }
//           ev.preventDefault();  // stop scrolling in another direction
//           scrollableElement.scrollLeft += (ev.deltaY + ev.deltaX);
//           return; // don't prevent default if the target is inside the blacklisted div
//       }
//       targetElement = targetElement.parentNode;
//   }

//   if (document.documentElement.clientWidth > 600) {
//       ev.preventDefault();  // stop scrolling in another direction
//       scrollableElement.scrollLeft += (ev.deltaY + ev.deltaX);
//   }
// });





let startY;

// Save the initial touch position
scrollableElement.addEventListener('touchstart', (ev) => {
    startY = ev.touches[0].pageY;
}, { passive: true });

scrollableElement.addEventListener('touchmove', handleScroll, { passive: false });
scrollableElement.addEventListener('wheel', handleScroll);

function handleScroll(ev) {
    let deltaY;
    if (ev.type === 'wheel') {
        deltaY = ev.deltaY;
    } else if (ev.type === 'touchmove') {
        deltaY = startY - ev.touches[0].pageY;
        startY = ev.touches[0].pageY;
    }

    let targetElement = ev.target;
    while (targetElement != null) {
        if (targetElement.id === 'scroll') { // replace 'scroll' with the id of your div
            // If we're at the top or bottom of the div, allow horizontal scroll
            if ((deltaY < 0 && targetElement.scrollTop === 0) ||
                (deltaY > 0 && targetElement.scrollTop + targetElement.clientHeight >= targetElement.scrollHeight)) {
                break;
            }
            // If horizontal scroll is at the end, allow default vertical scroll
            if (scrollableElement.scrollLeft >= scrollableElement.scrollWidth - scrollableElement.clientWidth) {
                return;
            }
            ev.preventDefault();  // stop scrolling in another direction
            scrollableElement.scrollLeft += deltaY * 3; // Increase the multiplier to make scrolling faster
            return; // don't prevent default if the target is inside the blacklisted div
        }
        targetElement = targetElement.parentNode;
    }

    if (document.documentElement.clientWidth > 600) {
        ev.preventDefault();  // stop scrolling in another direction
        scrollableElement.scrollLeft += deltaY * 1.5; // Increase the multiplier to make scrolling faster
    }
}

// Reset startY at the end of the touch
scrollableElement.addEventListener('touchend', () => {
    startY = null;
}, { passive: true });


















document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// First, select all the sections and navigation links
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.topnav a');

// Next, create an intersection observer
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const navLink = document.querySelector(`.topnav a[href="#${id}"]`);
    if (entry.isIntersecting) {
      navLink.classList.add('active');
    } else {
      navLink.classList.remove('active');
    }
  });
}, { threshold: 0.5 });  // Adjust the threshold value according to your needs

// Finally, observe each section
sections.forEach(section => {
  observer.observe(section);
});








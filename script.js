document.addEventListener("DOMContentLoaded", function() {
    const projectContainer = document.querySelector('.project-container');
    const projectLists = document.querySelectorAll('.project-list');
    let currentIndex = 0;
    let autoSlideInterval;

    function showSlide(index) {
        projectLists.forEach(function(projectList) {
            projectList.style.display = 'none';
        });
        projectLists[index].style.display = 'block';
    }

    function nextSlide() {
        currentIndex++;
        if (currentIndex >= projectLists.length) {
            currentIndex = 0;
        }
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = projectLists.length - 1;
        }
        showSlide(currentIndex);
    }

    let touchStartX = 0;
    let touchEndX = 0;

    projectContainer.addEventListener('touchstart', function(event) {
        touchStartX = event.touches[0].clientX;
    });

    projectContainer.addEventListener('touchend', function(event) {
        touchEndX = event.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX) {
            nextSlide();
        } else if (touchEndX > touchStartX) {
            prevSlide(); 
        }
    }

    projectContainer.addEventListener('click', function(event) {
        const cardWidth = projectLists[currentIndex].offsetWidth;
        const clickX = event.clientX - projectLists[currentIndex].getBoundingClientRect().left;
        
        if (clickX < cardWidth / 2) {
            prevSlide();
        } else {
            nextSlide();
        }
    });

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    startAutoSlide();

    projectContainer.addEventListener('mouseenter', stopAutoSlide);

    projectContainer.addEventListener('mouseleave', startAutoSlide);

    showSlide(currentIndex);
});
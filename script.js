document.addEventListener("DOMContentLoaded", function () {
    function setupSmoothNavigation() {
        // smooth navigation when user clicks on an item on nav bar
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener("click", function (event) {
                const target = document.querySelector(
                    this.getAttribute("href")
                );
                if (!target) return;
                event.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            });
        });
    }

    function setupCurrentlySecret() {
        // when user clicks "Currently" on nav bar, show text bubble
        const currentlyBtn = document.getElementById("currentlyBtn");
        const secretBubble = document.getElementById("secretBubble");
        const navItem = currentlyBtn?.closest(".nav-item");

        if (!currentlyBtn || !secretBubble) return;

        currentlyBtn.addEventListener("click", function (event) {
            event.preventDefault();
            secretBubble.classList.toggle("show");
        });

        navItem.addEventListener("mouseleave", function () {
            secretBubble.classList.remove("show");
        });

    }

    //project section related functions
    const projects = document.querySelectorAll(".project-item");
    const prevButton = document.getElementById("projectPrev");
    const nextButton = document.getElementById("projectNext");

    let currentPage = 0;
    function getItemsPerPage() {
        if (window.innerWidth < 768) {
            return 1;
        }
        if (window.innerWidth < 992) {
            return 2;
        }
        return 4;
    }
    function updateProjects() {
        const itemsPerPage = getItemsPerPage();
        const totalPages = Math.ceil(projects.length / itemsPerPage);

        if (currentPage >= totalPages) {
            currentPage = totalPages - 1;
        }

        const start = currentPage * itemsPerPage;
        const end = start + itemsPerPage;

        projects.forEach((project, index) => {
            project.classList.toggle(
                "active",
                index >= start && index < end
            );
        });

        prevButton.disabled = currentPage === 0;
        nextButton.disabled = currentPage >= totalPages - 1;
    }
    function nextProjectPage() {
        const itemsPerPage = getItemsPerPage();
        const totalPages = Math.ceil(projects.length / itemsPerPage);

        if (currentPage < totalPages - 1) {
            currentPage++;
            updateProjects();
        }
    }
    function previousProjectPage() {
        if (currentPage > 0) {
            currentPage--;
            updateProjects();
        }
    }
    function resetProjectCarousel() {
        currentPage = 0;
        updateProjects();
    }

    prevButton.addEventListener("click", previousProjectPage);
    nextButton.addEventListener("click", nextProjectPage);
    window.addEventListener("resize", resetProjectCarousel);

    setupSmoothNavigation();
    setupCurrentlySecret();
    updateProjects();

});
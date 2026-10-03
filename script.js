const workCarousel = document.getElementById("workCarousel");
const workNext = document.getElementById("workNext");
const workPrev = document.getElementById("workPrev");

const cardWidth = 452; // 420px card + 32px gap


// =========================
// SMOOTH NAVIGATION
// =========================

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

document.addEventListener("DOMContentLoaded", function () {

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

        projects.forEach((project, index) => {

            const start = currentPage * itemsPerPage;
            const end = start + itemsPerPage;

            if (index >= start && index < end) {
                project.classList.add("active");
            } else {
                project.classList.remove("active");
            }

        });

        prevButton.disabled = currentPage === 0;
        nextButton.disabled = currentPage >= totalPages - 1;
    }


    nextButton.addEventListener("click", function () {

        const itemsPerPage = getItemsPerPage();
        const totalPages = Math.ceil(projects.length / itemsPerPage);

        if (currentPage < totalPages - 1) {
            currentPage++;
            updateProjects();
        }

    });


    prevButton.addEventListener("click", function () {

        if (currentPage > 0) {
            currentPage--;
            updateProjects();
        }

    });


    window.addEventListener("resize", function () {
        currentPage = 0;
        updateProjects();
    });


    updateProjects();

});
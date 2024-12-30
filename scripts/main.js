
window.addEventListener("scroll", function () {
    var header = document.querySelector(".site_heading");

    if (window.scrollY > 0) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section[id]");
    const sidebarList = document.getElementById("sidebarList");
    const headerOffset = 70; // Height of the fixed header

    // Generate sidebar items
    sections.forEach(section => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = `#${section.id}`;
        link.textContent = section.querySelector(".msg_heading") ? section.querySelector(".msg_heading").textContent : section.id;
        listItem.appendChild(link);
        sidebarList.appendChild(listItem);

        // Smooth scroll on link click with offset
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default anchor click behavior
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            const sectionPosition = targetSection.getBoundingClientRect().top + window.scrollY - headerOffset; // Calculate position with offset
            window.scrollTo({
                top: sectionPosition,
                behavior: "smooth" // Smooth scroll to the section
            });
        });
    });

    // Highlight the active section in the sidebar
    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the section is visible
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            const link = sidebarList.querySelector(`a[href="#${entry.target.id}"]`);
            if (entry.isIntersecting) {
                link.classList.add('active'); // Add active class
            } else {
                link.classList.remove('active'); // Remove active class
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => {
        observer.observe(section); // Observe each section
    });
});
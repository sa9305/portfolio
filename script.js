
// MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll("#navLinks a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});


// COPYRIGHT YEAR

document.getElementById("year").textContent =
    new Date().getFullYear();


// CONTACT FORM

const contactForm = document.getElementById("contactForm");
const submitButton = document.getElementById("submitButton");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    formStatus.textContent = "";
    formStatus.className = "form-status";

    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }

    // Basic spam protection
    if (contactForm.querySelector('[name="_gotcha"]').value) {
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    try {

        const response = await fetch(contactForm.action, {
            method: "POST",
            body: new FormData(contactForm),
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Message could not be sent.");
        }

        formStatus.textContent =
            "Thank you! Your message has been sent successfully.";

        formStatus.classList.add("success");

        contactForm.reset();

    } catch (error) {

        formStatus.textContent =
            "Unable to send your message. Please try again or email me directly.";

        formStatus.classList.add("error");

    } finally {

        submitButton.disabled = false;
        submitButton.textContent = "Send Message →";

    }

});

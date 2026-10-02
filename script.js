/* =========================================================
   CODENOVA - FULL JAVASCRIPT
========================================================= */


/* =========================================================
   1. MOBILE MENU
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if (navLinks.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    const navItems =
        document.querySelectorAll(".nav-links a");


    navItems.forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            const icon =
                menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        });

    });

}


/* =========================================================
   2. DARK MODE
========================================================= */

const themeBtn =
    document.getElementById("themeBtn");


if (themeBtn) {

    const savedTheme =
        localStorage.getItem("codenova-theme");


    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        themeBtn.innerHTML =
            '<i class="fas fa-sun"></i>';

    } else {

        themeBtn.innerHTML =
            '<i class="fas fa-moon"></i>';

    }


    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const darkMode =
            document.body.classList.contains("dark");


        if (darkMode) {

            themeBtn.innerHTML =
                '<i class="fas fa-sun"></i>';

            localStorage.setItem(
                "codenova-theme",
                "dark"
            );

        } else {

            themeBtn.innerHTML =
                '<i class="fas fa-moon"></i>';

            localStorage.setItem(
                "codenova-theme",
                "light"
            );

        }

    });

}


/* =========================================================
   3. CURRENT YEAR
========================================================= */

const yearElement =
    document.getElementById("year");


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   4. BACK TO TOP
========================================================= */

const backTop =
    document.getElementById("backTop");


window.addEventListener("scroll", () => {

    if (!backTop) return;


    if (window.scrollY > 500) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

});


if (backTop) {

    backTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================================
   5. ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll("section[id]");

const navigationLinks =
    document.querySelectorAll(".nav-links a");


function updateActiveNavigation() {

    let currentSection = "";


    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navigationLinks.forEach((link) => {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);


/* =========================================================
   6. EMAILJS INITIALIZATION
========================================================= */

if (typeof emailjs !== "undefined") {

    emailjs.init({

        publicKey:
            "eecKDtbbWTL-Tc3PB"

    });

} else {

    console.error(
        "EmailJS library was not loaded."
    );

}


/* =========================================================
   7. EMAILJS CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById("contactForm");

const formStatus =
    document.getElementById("formStatus");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const nameInput =
                document.getElementById("name");

            const emailInput =
                document.getElementById("email");

            const messageInput =
                document.getElementById("message");

            const submitButton =
                contactForm.querySelector(
                    'button[type="submit"]'
                );


            if (
                !nameInput ||
                !emailInput ||
                !messageInput
            ) {

                console.error(
                    "Contact form fields are missing."
                );

                return;

            }


            const name =
                nameInput.value.trim();

            const email =
                emailInput.value.trim();

            const message =
                messageInput.value.trim();


            const originalButtonText =
                submitButton
                    ? submitButton.innerHTML
                    : "";


            if (!name) {

                showFormMessage(
                    "Please enter your name.",
                    "error"
                );

                nameInput.focus();

                return;

            }


            if (!email) {

                showFormMessage(
                    "Please enter your email.",
                    "error"
                );

                emailInput.focus();

                return;

            }


            if (!isValidEmail(email)) {

                showFormMessage(
                    "Please enter a valid email address.",
                    "error"
                );

                emailInput.focus();

                return;

            }


            if (!message) {

                showFormMessage(
                    "Please enter your message.",
                    "error"
                );

                messageInput.focus();

                return;

            }


            if (submitButton) {

                submitButton.disabled = true;

                submitButton.innerHTML =
                    `<i class="fas fa-spinner fa-spin"></i>
                     Sending...`;

            }


            showFormMessage("", "");


            const templateParams = {

                name: name,

                email: email,

                message: message,

                time:
                    new Date().toLocaleString(
                        "en-IN",
                        {
                            dateStyle: "medium",
                            timeStyle: "short"
                        }
                    )

            };


            try {

                const response =
                    await emailjs.send(

                        "service_1itkk2j",

                        "template_tk1rdli",

                        templateParams

                    );


                console.log(
                    "EmailJS success:",
                    response
                );


                showFormMessage(

                    "Message sent successfully! Thank you for contacting me.",

                    "success"

                );


                contactForm.reset();


            } catch (error) {

                console.error(
                    "EmailJS error:",
                    error
                );


                showFormMessage(

                    "Message could not be sent. Please try again.",

                    "error"

                );

            }


            if (submitButton) {

                submitButton.disabled = false;

                submitButton.innerHTML =
                    originalButtonText;

            }

        }
    );

}


/* =========================================================
   8. EMAIL VALIDATION
========================================================= */

function isValidEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);

}


/* =========================================================
   9. FORM STATUS
========================================================= */

function showFormMessage(
    message,
    type
) {

    if (!formStatus) return;


    formStatus.textContent =
        message;


    formStatus.classList.remove(
        "success",
        "error"
    );


    if (type === "success") {

        formStatus.classList.add(
            "success"
        );

    }


    if (type === "error") {

        formStatus.classList.add(
            "error"
        );

    }

}


/* =========================================================
   10. SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        `
        .project-card,
        .training-card,
        .skill-category,
        .competency,
        .info-card
        `
    );


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "revealed"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    revealElements.forEach(
        (element) => {

            revealObserver.observe(
                element
            );

        }
    );

}


/* =========================================================
   11. SMOOTH ANCHOR LINKS
========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {

                    event.preventDefault();


                    const headerHeight =
                        document.querySelector(
                            ".header"
                        )?.offsetHeight || 75;


                    const targetPosition =
                        target.offsetTop -
                        headerHeight;


                    window.scrollTo({

                        top: targetPosition,

                        behavior: "smooth"

                    });

                }

            }
        );

    });


/* =========================================================
   12. PAGE LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateActiveNavigation();

        console.log(
            "CodeNova Portfolio loaded successfully."
        );

    }
);
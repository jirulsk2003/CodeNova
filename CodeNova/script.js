// ========================================
// CODENOVA PORTFOLIO
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        // =========================
        // MOBILE MENU
        // =========================

        const menuButton =
            document.querySelector(".menu-button");


        const navLinks =
            document.querySelector(".nav-links");


        if (menuButton && navLinks) {

            menuButton.addEventListener(
                "click",
                function () {

                    navLinks.classList.toggle(
                        "active"
                    );

                }
            );


            const links =
                navLinks.querySelectorAll("a");


            links.forEach(
                function (link) {

                    link.addEventListener(
                        "click",
                        function () {

                            navLinks.classList.remove(
                                "active"
                            );

                        }
                    );

                }
            );

        }



        // =========================
        // CURRENT YEAR
        // =========================

        const currentYear =
            document.getElementById(
                "current-year"
            );


        if (currentYear) {

            currentYear.textContent =
                new Date().getFullYear();

        }



        // =========================
        // CONTACT FORM
        // =========================

        const contactForm =
            document.getElementById(
                "contact-form"
            );


        if (!contactForm) {

            console.error(
                "Contact form not found."
            );

            return;

        }



        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const nameInput =
                    document.getElementById(
                        "contact-name"
                    );


                const emailInput =
                    document.getElementById(
                        "contact-email"
                    );


                const messageInput =
                    document.getElementById(
                        "contact-message"
                    );


                const timeInput =
                    document.getElementById(
                        "contact-time"
                    );


                const sendButton =
                    document.getElementById(
                        "send-button"
                    );


                if (
                    !nameInput ||
                    !emailInput ||
                    !messageInput ||
                    !timeInput ||
                    !sendButton
                ) {

                    console.error(
                        "Contact form elements missing."
                    );

                    alert(
                        "Contact form setup error."
                    );

                    return;

                }


                const name =
                    nameInput.value.trim();


                const email =
                    emailInput.value.trim();


                const message =
                    messageInput.value.trim();


                if (name === "") {

                    alert(
                        "Please enter your name."
                    );

                    nameInput.focus();

                    return;

                }


                if (email === "") {

                    alert(
                        "Please enter your email."
                    );

                    emailInput.focus();

                    return;

                }


                if (message === "") {

                    alert(
                        "Please enter your message."
                    );

                    messageInput.focus();

                    return;

                }


                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !emailPattern.test(email)
                ) {

                    alert(
                        "Please enter a valid email address."
                    );

                    emailInput.focus();

                    return;

                }


                timeInput.value =
                    new Date().toLocaleString();


                sendButton.disabled = true;

                sendButton.textContent =
                    "Sending...";


                emailjs.sendForm(

                    "service_1itkk2j",

                    "template_tk1rdli",

                    contactForm,

                    {
                        publicKey:
                            "eecKDtbbWTL-Tc3PB"
                    }

                )


                .then(
                    function (response) {

                        console.log(
                            "EMAILJS SUCCESS:",
                            response.status,
                            response.text
                        );


                        alert(
                            "✅ Message sent successfully!"
                        );


                        contactForm.reset();


                        sendButton.disabled =
                            false;


                        sendButton.textContent =
                            "Send Message";

                    }
                )


                .catch(
                    function (error) {

                        console.error(
                            "EMAILJS ERROR:",
                            error
                        );


                        let errorMessage =
                            "Unknown EmailJS error.";


                        if (error) {

                            if (error.text) {

                                errorMessage =
                                    error.text;

                            }

                            else if (
                                error.message
                            ) {

                                errorMessage =
                                    error.message;

                            }

                        }


                        alert(
                            "❌ Message could not be sent.\n\n" +
                            "EmailJS Error:\n" +
                            errorMessage
                        );


                        sendButton.disabled =
                            false;


                        sendButton.textContent =
                            "Send Message";

                    }
                );

            }
        );

    }
);
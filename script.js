function selectPackage(session, price) {

    const sessionSelect = document.getElementById("session");

    sessionSelect.value = `${session} - ${price}`;

    document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
    });
}


document
    .getElementById("bookingForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        alert(
            "Your appointment request has been prepared. " +
            "The next step will be connecting this form to WhatsApp."
        );

    });

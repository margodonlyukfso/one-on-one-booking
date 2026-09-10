const WHATSAPP_NUMBER = "2348103752448";

const form = document.getElementById("bookingForm");
const confirmation = document.getElementById("confirmation");
const timezoneSelect = document.getElementById("timezone");
const timezoneStatus = document.getElementById("timezoneStatus");

const editBooking = document.getElementById("editBooking");
const whatsappButton = document.getElementById("whatsappButton");


// -----------------------------------
// AUTOMATIC TIMEZONE DETECTION
// -----------------------------------

function detectTimezone() {

    const detectedTimezone =
        Intl.DateTimeFormat().resolvedOptions().timeZone;

    timezoneSelect.innerHTML = "";

    const option = document.createElement("option");

    option.value = detectedTimezone;
    option.textContent = detectedTimezone;

    timezoneSelect.appendChild(option);

    timezoneStatus.textContent =
        "Tu zona horaria se detectó automáticamente desde tu dispositivo.";
}

detectTimezone();


// -----------------------------------
// PACKAGE SELECTION
// -----------------------------------

function selectPackage(session, price) {

    const sessionSelect =
        document.getElementById("session");

    sessionSelect.value =
        `${session} - ${price}`;

    document
        .getElementById("booking")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// -----------------------------------
// FORM SUBMISSION
// -----------------------------------

form.addEventListener("submit", function(event) {

    event.preventDefault();


    const session =
        document.getElementById("session").value;

    const name =
        document.getElementById("name").value.trim();

    const whatsapp =
        document.getElementById("whatsapp").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const date =
        document.getElementById("date").value;

    const time =
        document.getElementById("time").value;

    const timezone =
        document.getElementById("timezone").value;

    const topic =
        document.getElementById("topic").value.trim();


    // Split session and price

    const parts = session.split(" - ");

    const sessionName = parts[0];
    const price = parts[1];


    // Format date

    const formattedDate =
        new Date(date + "T00:00:00")
            .toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric"
            });


    // Format time

    const formattedTime =
        new Date(`2000-01-01T${time}`)
            .toLocaleTimeString(undefined, {
                hour: "numeric",
                minute: "2-digit"
            });


    // -----------------------------------
    // PUT DATA INTO CONFIRMATION SCREEN
    // -----------------------------------

    document.getElementById("confirmSession")
        .textContent = sessionName;

    document.getElementById("confirmPrice")
        .textContent = price;

    document.getElementById("confirmName")
        .textContent = name;

    document.getElementById("confirmDate")
        .textContent = formattedDate;

    document.getElementById("confirmTime")
        .textContent = formattedTime;

    document.getElementById("confirmTimezone")
        .textContent = timezone;

    document.getElementById("confirmTopic")
        .textContent = topic;


    // Store booking information

    window.bookingData = {
        sessionName,
        price,
        name,
        whatsapp,
        email,
        date: formattedDate,
        time: formattedTime,
        timezone,
        topic
    };


    // Hide form

    form.style.display = "none";

    document.querySelector(".booking-intro").style.display = "none";

    // Show confirmation

    confirmation.classList.add("show");

    confirmation.scrollIntoView({
        behavior: "smooth"
    });

});


// -----------------------------------
// EDIT BOOKING
// -----------------------------------

editBooking.addEventListener("click", function() {

    confirmation.classList.remove("show");

    form.style.display = "block";

    document.querySelector(".booking-intro").style.display = "block";

    document
        .getElementById("booking")
        .scrollIntoView({
            behavior: "smooth"
        });

});


// -----------------------------------
// SEND TO WHATSAPP
// -----------------------------------

whatsappButton.addEventListener("click", function() {

    const data = window.bookingData;

    if (!data) {
        return;
    }


    const message =
`Hola, me gustaría reservar una videollamada 1 a 1.

SESIÓN: ${data.sessionName}

PRECIO: ${data.price}

NOMBRE: ${data.name}

MI NÚMERO DE WHATSAPP: ${data.whatsapp}

CORREO ELECTRÓNICO: ${data.email || "Not provided"}

FECHA PREFERIDA: ${data.date}

HORARIO PREFERIDO: ${data.time}

HUSO HORARIO: ${data.timezone}

LO QUE ME GUSTARÍA TRATAR:
${data.topic}

Por favor, confírmeme si la fecha y hora que solicité están disponibles y facilíteme las instrucciones de pago.

Gracias.`;


    const encodedMessage =
        encodeURIComponent(message);


    const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;


    window.location.href = whatsappURL;

});

function submitRSVP() {
    let guestName = document.getElementById("guestName").value.trim();
    let attendance = document.getElementById("attendance").value;
    let guestMessage = document.getElementById("guestMessage").value.trim();

    if (guestName === "") {
        alert("Nama tidak boleh kosong!");
        return;
    }

    let rsvps = JSON.parse(localStorage.getItem("rsvpList")) || [];
    rsvps.push({ name: guestName, status: attendance, message: guestMessage });
    localStorage.setItem("rsvpList", JSON.stringify(rsvps));

    document.getElementById("guestName").value = "";
    document.getElementById("guestMessage").value = "";
    displayRSVPs();
}

function displayRSVPs() {
    let rsvps = JSON.parse(localStorage.getItem("rsvpList")) || [];
    let rsvpContainer = document.getElementById("rsvpList");
    rsvpContainer.innerHTML = "";

    rsvps.forEach(rsvp => {
        let rsvpDiv = document.createElement("div");
        rsvpDiv.classList.add("rsvp-entry");
        rsvpDiv.innerHTML = `<p><strong>${rsvp.name}</strong> (${rsvp.status})</p>
                            <p>💌 ${rsvp.message || "Tidak ada pesan."}</p>`;
        rsvpContainer.appendChild(rsvpDiv);
    });
}

window.onload = displayRSVPs;

const eventDate = new Date("2025-01-25T10:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = eventDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML = `${days} Hari ${hours} Jam ${minutes} Menit ${seconds} Detik`;

    if (timeLeft < 0) {
        document.getElementById("timer").innerHTML = "Acara telah dimulai!";
    }
}

setInterval(updateCountdown, 1000);
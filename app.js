const loginSection = document.getElementById("loginSection");
const bookingSection = document.getElementById("bookingSection");
const confirmationSection = document.getElementById("confirmationSection");
const loginForm = document.getElementById("loginForm");
const userStatus = document.getElementById("userStatus");
const bookBtn = document.getElementById("bookBtn");
const bookingSummary = document.getElementById("bookingSummary");
const emailPreview = document.getElementById("emailPreview");
const newBooking = document.getElementById("newBooking");

let currentUser = null;

const today = new Date().toISOString().split("T")[0];
document.getElementById("fromDate").min = today;
document.getElementById("toDate").min = today;

const updateUserStatus = () => {
  if (!currentUser) {
    userStatus.innerHTML = '<span class="status-label">Nicht eingeloggt</span>';
    return;
  }

  userStatus.innerHTML = `<span class="status-label">Eingeloggt als ${currentUser.name}</span>`;
};

const resetBookingForm = () => {
  document.getElementById("ship").selectedIndex = 0;
  document.getElementById("fromDate").value = "";
  document.getElementById("toDate").value = "";
  bookingSummary.innerHTML = "";
  emailPreview.innerHTML = "";
};

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  currentUser = {
    name: formData.get("name"),
    email: formData.get("email"),
  };

  updateUserStatus();
  loginSection.hidden = true;
  bookingSection.hidden = false;
});

bookBtn.addEventListener("click", () => {
  const ship = document.getElementById("ship").value;
  const fromDate = document.getElementById("fromDate").value;
  const toDate = document.getElementById("toDate").value;

  if (!fromDate || !toDate) {
    alert("Bitte wähle einen Zeitraum für deine Buchung aus.");
    return;
  }

  if (fromDate > toDate) {
    alert("Das Enddatum muss nach dem Startdatum liegen.");
    return;
  }

  const bookingId = `BK-${Math.floor(Math.random() * 90000 + 10000)}`;
  const createdAt = new Date().toLocaleString("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  bookingSummary.innerHTML = `
    <strong>Buchungsdetails</strong><br />
    Schiff: <strong>${ship}</strong><br />
    Zeitraum: <strong>${fromDate}</strong> bis <strong>${toDate}</strong><br />
    Buchungsnummer: <strong>${bookingId}</strong>
  `;

  emailPreview.textContent = `Betreff: Deine Buchung für ${ship}

Hallo ${currentUser.name},

vielen Dank für deine Buchungsanfrage! Wir haben deine Reservierung für das Clubschiff "${ship}" erhalten.

Zeitraum: ${fromDate} bis ${toDate}
Buchungsnummer: ${bookingId}
Erstellt am: ${createdAt}

Wir freuen uns auf dich an Bord!

Dein Club-Team`;

  bookingSection.hidden = true;
  confirmationSection.hidden = false;
});

newBooking.addEventListener("click", () => {
  resetBookingForm();
  confirmationSection.hidden = true;
  bookingSection.hidden = false;
});

updateUserStatus();

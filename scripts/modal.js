const modalCloseButton = document.getElementById("modal-close-button");
const overlay = document.getElementById("overlay");
const modalForm = document.getElementById("modal");
const priceCardBookButtons = document.querySelectorAll(".price-card button.book-button");
const footerBookButton = document.querySelector("footer button.book-button");
const footerNameInput = document.querySelector("footer .name-input");
const footerPhoneInput = document.querySelector("footer .phone-input");
const modalNameInput = document.querySelector("#modal .name-input");
const modalPhoneInput = document.querySelector("#modal .phone-input");

const modalBookButton = document.querySelector("#modal button.book-button");


modalCloseButton.addEventListener('click', () => {
    closeModal();
});

overlay.addEventListener('click', (event) => {
    if (!modalForm.contains(event.target)) {
        closeModal();
    }
});

priceCardBookButtons.forEach((button) => {
    button.addEventListener('click', () => {
        overlay.classList.toggle("open");
        document.body.classList.toggle("modal-open");
    })
});

footerBookButton.addEventListener('click', () => {
    modalNameInput.value = footerNameInput.value;
    modalPhoneInput.value = footerPhoneInput.value;
    overlay.classList.toggle("open");
});

modalBookButton.addEventListener('click', () => {
    console.log(`You are booked: {"name": "${modalNameInput.value}", "phone": "${modalPhoneInput.value}"}}`)
    closeModal();

});

function closeModal() {
    overlay.classList.remove("open");
    document.body.classList.remove("modal-open");
    modalPhoneInput.value = "";
    modalNameInput.value = "";
}
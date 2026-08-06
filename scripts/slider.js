const slideAreas = document.querySelectorAll(".slide-area");
const slider = document.getElementById("portfolio-slider");
const viewport = document.getElementById("portfolio");

const slideAreaLeft = slideAreas[0];
const slideAreaRight = slideAreas[1];

const STEP = 25;
const INTERVAL = 30;

let interval;

let offset = 0;
let maxOffset = 0;
let minOffset = 0;

let sliderStartPosition = 0;


// =======================
// Calculate limits
// =======================

function calculateLimitAndUpdateSlider() {
    const sliderWidth = slider.scrollWidth;
    const viewportWidth = viewport.clientWidth;

    const viewportRect = viewport.getBoundingClientRect();

    const sliderStart = sliderStartPosition;
    const leftGap = sliderStart - viewportRect.left;


    if (sliderWidth <= viewportWidth) {
        offset = (viewportWidth - sliderWidth) / 2 - leftGap;

        minOffset = offset;
        maxOffset = offset;

    } else {
        maxOffset = -leftGap;

        minOffset = viewportWidth - sliderWidth - leftGap;

        offset = -(sliderWidth - viewportWidth) / 2 - leftGap;
        offset = Math.max(minOffset, Math.min(offset, maxOffset));
    }

    updateSlider();
}


function updateSlider() {
    slider.style.transform = `translateX(${offset}px)`;
}


// =======================
// Hover scroll
// =======================

function slideLeft() {
    offset = Math.min(offset + STEP, maxOffset);
    updateSlider();
}


function slideRight() {
    offset = Math.max(offset - STEP, minOffset);
    updateSlider();
}


function stopSliding() {
    clearInterval(interval);
    interval = null;
}


slideAreaLeft.addEventListener("mouseenter", () => {
    stopSliding();
    interval = setInterval(slideLeft, INTERVAL);
});


slideAreaLeft.addEventListener("mouseleave", stopSliding);


slideAreaRight.addEventListener("mouseenter", () => {
    stopSliding();
    interval = setInterval(slideRight, INTERVAL);
});


slideAreaRight.addEventListener("mouseleave", stopSliding);


// =======================
// Swipe
// =======================

let startX = 0;
let startOffset = 0;
let isDragging = false;


slider.addEventListener("pointerdown", (event) => {
    isDragging = true;

    startX = event.clientX;
    startOffset = offset;

    slider.setPointerCapture(event.pointerId);
});


slider.addEventListener("pointermove", (event) => {
    if (!isDragging) return;

    const diff = event.clientX - startX;

    offset = Math.max(
        minOffset,
        Math.min(startOffset + diff, maxOffset)
    );

    updateSlider();
});


slider.addEventListener("pointerup", () => {
    isDragging = false;
});


slider.addEventListener("pointercancel", () => {
    isDragging = false;
});


// =======================
// Init + resize
// =======================

window.addEventListener("load", () => {
    sliderStartPosition = slider.getBoundingClientRect().left;
    calculateLimitAndUpdateSlider();
});


window.addEventListener("resize", () => {
    sliderStartPosition = slider.getBoundingClientRect().left;
    calculateLimitAndUpdateSlider();
});
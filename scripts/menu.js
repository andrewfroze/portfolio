const nav = document.querySelector("nav");
const logo = document.querySelector(".logo");
const burger = document.getElementById("burger-wrapper");
const burgerIcon = document.getElementById("burger-icon");
const menuLinks = document.querySelectorAll("nav ul a");

burger.addEventListener("click", () => {
    nav.classList.toggle("open");

    document.body.classList.toggle("menu-open");
});

[logo, ...menuLinks].forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
        document.body.classList.remove("menu-open");
    });
});
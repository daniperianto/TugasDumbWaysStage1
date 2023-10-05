let isHamburgerOpen = false;

const openHamburger = () => {
    let hamburgerNavContainer = document.getElementById("hamburger-nav-container");

    if (isHamburgerOpen) {
        hamburgerNavContainer.style.display = "none";
        isHamburgerOpen = false;
    } else {
        hamburgerNavContainer.style.display = "block";
        isHamburgerOpen = true;
    }
}
function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
    if (support == true) {
        document.querySelector('body').classList.add('webp');
    } else {
        document.querySelector('body').classList.add('no-webp');
    }
});

const body = document.querySelector("body");
const header = document.querySelector(".header");
const headerList = document.querySelector(".header__list");
const headerBody = document.querySelector(".header__body");
const headerSocials = document.querySelector(".header__socials");
const headerMenu = document.querySelector(".header__menu");

headerMenu.addEventListener("click", function () {
    body.classList.toggle("lock-header");
    header.classList.toggle("active");
    headerMenu.classList.toggle("active");
    headerList.classList.toggle("active");
});

function moveSocials() {
    const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if (viewport_width < 425) {
        headerList.insertBefore(headerSocials, headerList.children[0]);
    } else {
        headerBody.insertBefore(headerSocials, headerBody.children[1])
    }
}
moveSocials();
window.addEventListener("resize", moveSocials);

if (document.querySelector(".home .gallery__body")) {
    const gallerySwiper = new Swiper(".gallery__body", {
        slidesPerView: 1,
        spaceBetween: 27,
        pagination: {
            el: ".swiper-pagination",
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            970: {
                slidesPerView: 4,
            },
            767: {
                slidesPerView: 3,
            },
            650: {
                slidesPerView: 2,
            },
        },
    });
}

if (document.querySelector("form")) {
    const phoneInput = document.getElementById('phone');

    phoneInput.addEventListener('focus', () => {
        if (!phoneInput.value) {
            phoneInput.value = '+38 (';
        }
    });

    phoneInput.addEventListener('blur', () => {
        if (phoneInput.value === '+38 (') {
            phoneInput.value = '';
        }
    });

    phoneInput.addEventListener('input', function(e) {
        let input = e.target;
        let value = input.value.replace(/\D/g, '');
        let formatted = '+38 (';

        if (value.length > 2) {
            formatted += value.substring(2, 5);
        }
        if (value.length > 5) {
            formatted += ') ' + value.substring(5, 8);
        }
        if (value.length > 8) {
            formatted += ' ' + value.substring(8, 10);
        }
        if (value.length > 10) {
            formatted += ' ' + value.substring(10, 12);
        }

        input.value = formatted;
    });
}

if (document.querySelector(".gallery")) {
    const sliderSlides = document.querySelectorAll(".gallery__item");
    const popupSlides = document.querySelectorAll(".gallery-popup");
    const popupCloses = document.querySelectorAll(".gallery-popup__close");

    for (let i = 0; i < sliderSlides.length; i++) {
        sliderSlides[i].addEventListener("click", function () {
            body.classList.add("lock");
            popupSlides[i].classList.add("active");
        });
    }
    for (let i = 0; i < popupCloses.length; i++) {
        popupCloses[i].addEventListener("click", function () {
            body.classList.remove("lock");
            popupSlides[i].classList.remove("active");
        });
    }

    document.addEventListener("keydown", function (event) {
        if (event.which == 27) {
            for (let i = 0; i < popupCloses.length; i++) {
                body.classList.remove("lock");
                popupSlides[i].classList.remove("active");
            }
        }
    });
    for (let i = 0; i < popupSlides.length; i++) {
        popupSlides[i].addEventListener("click", function (event) {
            if (!event.target.closest(".gallery-popup__items")) {
                body.classList.remove("lock");
                popupSlides[i].classList.remove("active");
            }
        });
    }
}
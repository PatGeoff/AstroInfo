const swiperElements = document.querySelectorAll(".swiper");
const delay = 30000;

swiperElements.forEach((el, i) => {
    const swiper = new Swiper(el, {
        effect: "flip",
        grabCursor: true,
        pagination: false,
        navigation: false,
        allowTouchMove: false,
        updateOnWindowResize: false,
        autoplay: {
            delay: delay,
            disableOnInteraction: false
        },
        on: {
            autoplayTimeLeft(s, time, progress) {
                const progressCircle = s.el.querySelector(".autoplay-progress");
                progressCircle.style.setProperty("--progress", 1 - progress);
            }
        }
    });

    swiper.autoplay.stop();
    setTimeout(() => swiper.autoplay.start(), (i * (delay / swiperElements.length)))
})

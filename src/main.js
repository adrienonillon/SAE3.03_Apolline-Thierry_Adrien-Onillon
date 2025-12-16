import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import lottie from 'lottie-web';

gsap.registerPlugin(ScrollTrigger);

/**
 * Animation du compteur numérique sur la slide 1
 * Anime de 0 à 7000 avec formatage des milliers
 */
function animateCounter() {
    const counter = { value: 0 };
    const counterElement = document.querySelector('#counter-7000');
    
    if (!counterElement) return;
    
    ScrollTrigger.create({
        trigger: "#slide-1",
        start: "top center",
        onEnter: () => {
            gsap.to(counter, {
                value: 7000,
                duration: 0.8,
                ease: "power1.out",
                onUpdate: () => {
                    const formatted = Math.floor(counter.value).toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
                    counterElement.textContent = formatted;
                }
            });
        },
        once: false
    });
}

/**
 * Configuration principale du scroll et de toutes les animations des slides
 * Utilise GSAP Timeline avec ScrollTrigger pour synchroniser les animations
 * Barre de progression mise à jour en fonction du scroll
 */
function setupScrollFlow() {
    const container = document.querySelector('.scroll-container');
    const fallingItems = document.querySelectorAll('.falling__item');
    
    fallingItems.forEach(item => {
        item.style.left = Math.random() * 90 + "%"; 
        item.style.width = (Math.random() * 80 + 120) + "px"; 
    });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".scroll-container",
            start: "top top",
            end: "+=35000",
            scrub: 1,
            pin: true,
            onUpdate: (self) => {
                gsap.to(".progress__bar", { width: (self.progress * 100) + "%", duration: 0.1 });
            }
        }
    });

    // Slide 1: Vêtements tombent avec compteur
    tl.addLabel("slide1");
    tl.to(container, { x: 0, y: "-100vh", ease: "none" }, "slide1");
    tl.fromTo(".falling__item", { y: "-50vh", rotation: -45 }, { y: "150vh", rotation: "random(-180, 180)", x: "random(-200, 200)", ease: "none", stagger: { amount: 0.5, from: "random" } }, "slide1");
    tl.fromTo("#slide-1 .slide__content", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, ease: "back.out(1.7)" }, "slide1+=0.3");

    // Slide 2: Grille de t-shirts 7/10
    tl.to(container, { x: "-100vw", y: "-100vh", ease: "none" }); 
    tl.addLabel("slide2-anim");
    tl.to(".tshirts__icon", { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)", stagger: 0.1 }, "slide2-anim");
    tl.to(".slide__content--reveal", { opacity: 1, y: 0, duration: 0.8 }, ">-=0.3");

    // Slide 3: Animation fermeture éclair
    tl.to(container, { x: "-100vw", y: "-200vh", ease: "none" }); 
    tl.addLabel("slide3-anim");
    tl.fromTo(".zipper__pull", { top: "-15vh" }, { top: "115vh", ease: "none" }, "slide3-anim");
    tl.fromTo(".zipper__panel--left", { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }, { clipPath: "polygon(0 0, 0% 0, 60% 100%, 0% 100%)", ease: "none" }, "slide3-anim");
    tl.fromTo(".zipper__panel--right", { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }, { clipPath: "polygon(100% 0, 100% 0, 100% 100%, 40% 100%)", ease: "none" }, "slide3-anim");
    tl.to("#slide-3 .slide__content", { opacity: 0, scale: 0.9, duration: 0.5 }, "slide3-anim");

    // Slide 4: Armoire qui s'ouvre avec vêtements
    tl.to(container, { x: "-100vw", y: "-300vh", ease: "none" }); 
    tl.addLabel("slide4-anim");
    tl.fromTo(".wardrobe__text", { opacity: 0, x: -50 }, { opacity: 1, x: 0, ease: "power2.out" }, "slide4-anim");
    tl.to(".wardrobe__door--top", { xPercent: 110, ease: "power2.inOut", duration: 1.5 }, "slide4-anim+=0.2");
    tl.to(".wardrobe__clothes", { bottom: "10%", opacity: 1, ease: "back.out(1.5)", stagger: 0.15, duration: 0.8 }, "slide4-anim+=0.8");

    // Slide 5: Graphique en étiquettes
    tl.to(container, { x: "-200vw", y: "-300vh", ease: "none" }); 
    tl.addLabel("slide5-anim");
    tl.to(".chart__bar", { 
        height: (i, target) => getComputedStyle(target).getPropertyValue('--target-height'), 
        duration: 1.5, 
        ease: "power3.out", 
        stagger: 0.2 
    }, "slide5-anim");
    tl.to(".tag__content", { 
        opacity: 1, 
        duration: 0.8, 
        ease: "power2.out", 
        stagger: 0.2 
    }, "slide5-anim+=0.5");

    // Slide 6: Horloge et pièces tombantes
    tl.to(container, { x: "-300vw", y: "-300vh", ease: "none" }); 
    tl.addLabel("slide6-anim");
    tl.to(".clock__hand--minute", { rotation: 720, duration: 2, ease: "none" }, "slide6-anim");
    tl.to(".clock__hand--hour", { rotation: 60, duration: 2, ease: "none" }, "slide6-anim");
    tl.fromTo(".coins__item", { y: -500, opacity: 1 }, { y: 0, opacity: 1, duration: 1, ease: "bounce.out", stagger: 0.1 }, "slide6-anim+=0.5");

    // Slide 7: Remplissage d'eau
    tl.to(container, { x: "-300vw", y: "-400vh", ease: "none" }); 
    tl.addLabel("slide7-anim");
    tl.to(".water__jet", { height: "100%", duration: 0.5, ease: "power1.in" }, "slide7-anim");
    tl.to(".water__level", { height: "70%", duration: 2.5, ease: "power1.inOut" }, "slide7-anim");
    tl.to(".water__jet", { height: "0%", top: "100%", duration: 0.5, ease: "power1.out" }, "slide7-anim+=2");

    // Slide 8: Rana Plaza - effondrement
    tl.to(container, { x: "-400vw", y: "-400vh", ease: "none" }); 
    tl.addLabel("slide8-anim");
    tl.to(".tragedy", { opacity: 1, duration: 0.5 }, "slide8-anim");
    tl.call(() => { document.querySelector('.building__img').classList.add('lights-out'); }, null, "slide8-anim+=1");
    const collapseTl = gsap.timeline();
    collapseTl.to(".building__img", { x: "+=15", yoyo: true, repeat: 5, duration: 0.05 })
              .to(".building__img", { y: "100vh", rotation: 10, opacity: 0, duration: 1.5, ease: "power2.in" });
    tl.add(collapseTl, "slide8-anim+=1.5");

    // Slide 9: Recyclage
    tl.to(container, { x: "-400vw", y: "-500vh", ease: "none" }); 
    tl.addLabel("slide9-anim");
    tl.fromTo(".recycling__item--1", { y: 0, x: 100 }, { y: 650, x: -150, rotation: 360, duration: 2, ease: "power1.in" }, "slide9-anim");
    tl.fromTo(".recycling__item--2", { y: 0, x: -50 }, { y: 600, x: -50, rotation: -200, duration: 1.8, ease: "power1.in" }, "slide9-anim+=0.2");
    tl.fromTo(".recycling__item--3", { y: 0, x: 0 }, { y: 680, x: 100, rotation: 180, duration: 2.2, ease: "power1.in" }, "slide9-anim+=0.1");
    tl.fromTo(".recycling__item--4", { y: 0, x: 200 }, { y: 620, x: 180, rotation: 90, duration: 1.9, ease: "power1.in" }, "slide9-anim+=0.3");
    tl.fromTo(".recycling__item--5", { y: 0, x: -150 }, { y: 660, x: -120, rotation: -150, duration: 2.1, ease: "power1.in" }, "slide9-anim+=0.2");

    // Slide 10: Carte Afrique et Ghana
    tl.to(container, { x: "-500vw", y: "-500vh", ease: "none" }); 
    tl.addLabel("slide10-anim");
    tl.to(".map", { opacity: 1, duration: 1 }, "slide10-anim");
    tl.to(".africa__block--1", { opacity: 1, duration: 1 }, "slide10-anim");
    tl.to(".map__overlay", { opacity: 1, duration: 0.5 }, "slide10-anim+=1.5");
    tl.to(".africa__block--2", { opacity: 1, duration: 1 }, "slide10-anim+=1.5");

    // Slide 11: Usine avec fumée en points
    tl.to(container, { x: "-600vw", y: "-500vh", ease: "none" }); 
    tl.addLabel("slide11-anim");
    tl.to(".factory__img", { transform: "translateY(0%)", duration: 1, ease: "power3.out" }, "slide11-anim");
    tl.to(".smoke__dot", { opacity: 1, scale: 1, duration: 0.1, stagger: { amount: 2, grid: [10, 10], from: "end" } }, "slide11-anim+=0.5");
    tl.to(".factory__text", { opacity: 1, y: 0, duration: 1 }, "slide11-anim+=2");

    // Slide 12: Chapeaux empilés avec conseils
    tl.to(container, { x: "-600vw", y: "-400vh", ease: "none" }); 
    tl.addLabel("slide12-anim");
    const hatTl = gsap.timeline();
    hatTl.to(".hats__item--1", { y: 0, opacity: 1, duration: 0.5, ease: "bounce.out" })
         .to(".hats__tip--3", { opacity: 1, x: 0, duration: 0.3 }, ">-0.2").to(".hats__tip--6", { opacity: 1, x: 0, duration: 0.3 }, "<");
    hatTl.to(".hats__item--2", { y: 0, opacity: 1, duration: 0.5, ease: "bounce.out" }, ">-0.1")
         .to(".hats__tip--2", { opacity: 1, x: 0, duration: 0.3 }, ">-0.2").to(".hats__tip--5", { opacity: 1, x: 0, duration: 0.3 }, "<");
    hatTl.to(".hats__item--3", { y: 0, opacity: 1, duration: 0.5, ease: "bounce.out" }, ">-0.1").to(".hats__tip--1", { opacity: 1, x: 0, duration: 0.3 }, ">-0.2");
    hatTl.to(".hats__item--4", { y: 0, opacity: 1, duration: 0.5, ease: "bounce.out" }, ">-0.1").to(".hats__tip--4", { opacity: 1, x: 0, duration: 0.3 }, ">-0.2");
    hatTl.to(".hats__item--5", { y: 0, opacity: 1, duration: 0.5, ease: "bounce.out" }, ">-0.1");
    hatTl.to(".hats__item--6", { y: 0, opacity: 1, duration: 0.5, ease: "bounce.out" }, ">-0.1");
    tl.add(hatTl, "slide12-anim");

    // Slide 13: Conclusion
    tl.to(container, { x: "-600vw", y: "-300vh", ease: "none" }); 
    tl.addLabel("slide13-anim");
    tl.to(".final", { opacity: 1, scale: 1, duration: 1.5, ease: "power4.out" }, "slide13-anim");
    tl.to(".final__line", { width: "300px", duration: 1, ease: "power2.out" }, "slide13-anim+=0.5");

    return tl;
}

setupScrollFlow();
animateCounter();

// Lottie animations
initLottieSimple("#lottie-3", "assets/json/fast_fashion.json");
initLottieSimple("#lottie-4", "assets/json/armoire.json");
initLottieSimple("#lottie-5", "assets/json/impact_environnement.json");
initLottieSimple("#lottie-6", "assets/json/cadence_travail.json");
initLottieSimple("#lottie-7", "assets/json/jean_water.json");
initLottieSimple("#lottie-8", "assets/json/rana_plaza.json");
initLottieSimple("#lottie-9", "assets/json/recyclage.json");
initLottieSimple("#lottie-10", "assets/json/afrique.json");
initLottieSimple("#lottie-11", "assets/json/made_in_france.json");
initLottieSimple("#lottie-12", "assets/json/conseils.json");
initLottieSimple("#lottie-13", "assets/json/conseils.json");

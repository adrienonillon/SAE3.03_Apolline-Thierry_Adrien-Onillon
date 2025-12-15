import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import lottie from 'lottie-web';

gsap.registerPlugin(ScrollTrigger);

function setupScrollFlow() {
    const container = document.querySelector('.scroll-container');
    const fallingItems = document.querySelectorAll('.falling-item');
    
    // Setup Slide 1
    fallingItems.forEach(item => {
        item.style.left = Math.random() * 90 + "%"; 
        item.style.width = (Math.random() * 80 + 120) + "px"; 
    });

    // Augmentation significative de la durée totale pour accommoder toutes les étapes
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".scroll-container",
            start: "top top",
            end: "+=35000", // Durée très longue pour bien détailler chaque anim
            scrub: 1,
            pin: true,
            onUpdate: (self) => {
                gsap.to(".progress-bar", { width: (self.progress * 100) + "%", duration: 0.1 });
            }
        }
    });

    // --- SLIDE 1 ---
    tl.addLabel("slide1");
    tl.to(container, { x: 0, y: "-100vh", ease: "none" }, "slide1");
    tl.fromTo(".falling-item", { y: "-50vh", rotation: -45 }, { y: "150vh", rotation: "random(-180, 180)", x: "random(-200, 200)", ease: "none", stagger: { amount: 0.5, from: "random" } }, "slide1");
    tl.fromTo("#slide-1 .content", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, ease: "back.out(1.7)" }, "slide1+=0.3");

    // --- SLIDE 2 (RETOUR ANCIENNE GRILLE STAGGER) ---
    tl.to(container, { x: "-100vw", y: "-100vh", ease: "none" }); tl.addLabel("slide2-anim");
    tl.to(".ts-icon-orig", { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)", stagger: 0.1 }, "slide2-anim");
    tl.to("#slide-2 .text-reveal", { opacity: 1, y: 0, duration: 0.8 }, ">-=0.3");

    // --- SLIDE 3 (ZIP) ---
    tl.to(container, { x: "-100vw", y: "-200vh", ease: "none" }); tl.addLabel("slide3-anim");
    tl.fromTo(".zipper-pull", { top: "-15vh" }, { top: "115vh", ease: "none" }, "slide3-anim");
    tl.fromTo(".panel-left", { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }, { clipPath: "polygon(0 0, 0% 0, 60% 100%, 0% 100%)", ease: "none" }, "slide3-anim");
    tl.fromTo(".panel-right", { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }, { clipPath: "polygon(100% 0, 100% 0, 100% 100%, 40% 100%)", ease: "none" }, "slide3-anim");
    tl.to(".zip-content", { opacity: 0, scale: 0.9, duration: 0.5 }, "slide3-anim");

    // --- SLIDE 4 (ARMOIRE SLIDE DROITE + VÊTEMENTS) ---
    tl.to(container, { x: "-100vw", y: "-300vh", ease: "none" }); tl.addLabel("slide4-anim");
    tl.fromTo(".wardrobe-text-wrapper", { opacity: 0, x: -50 }, { opacity: 1, x: 0, ease: "power2.out" }, "slide4-anim");
    // Partie haute glisse à droite
    tl.to(".wardrobe-door-top.sliding-right", { xPercent: 110, ease: "power2.inOut", duration: 1.5 }, "slide4-anim+=0.2");
    // Vêtements sortent du bas
    tl.to(".clothes-pile", { bottom: "10%", opacity: 1, ease: "back.out(1.5)", stagger: 0.15, duration: 0.8 }, "slide4-anim+=0.8");

    // --- SLIDE 5 (GRAPHIQUE PLUS HAUT) ---
    tl.to(container, { x: "-200vw", y: "-300vh", ease: "none" }); tl.addLabel("slide5-anim");
    tl.to(".chart-bar", { height: (i, target) => getComputedStyle(target).getPropertyValue('--target-height'), duration: 1.5, ease: "power3.out", stagger: 0.3 }, "slide5-anim");

    // --- SLIDE 6 (HORLOGE ESPACÉE) ---
    tl.to(container, { x: "-300vw", y: "-300vh", ease: "none" }); tl.addLabel("slide6-anim");
    tl.to(".minute-hand", { rotation: 720, duration: 2, ease: "none" }, "slide6-anim");
    tl.to(".hour-hand", { rotation: 60, duration: 2, ease: "none" }, "slide6-anim");
    tl.fromTo(".coin", { y: -500, opacity: 1 }, { y: 0, opacity: 1, duration: 1, ease: "bounce.out", stagger: 0.1 }, "slide6-anim+=0.5");

    // --- SLIDE 7 (EAU JET + NIVEAU) ---
    tl.to(container, { x: "-300vw", y: "-400vh", ease: "none" }); tl.addLabel("slide7-anim");
    // Jet d'eau qui tombe et remplit
    tl.to(".water-jet", { height: "100%", duration: 0.5, ease: "power1.in" }, "slide7-anim");
    tl.to(".water-level", { height: "70%", duration: 2.5, ease: "power1.inOut" }, "slide7-anim");
    // Le jet s'arrête quand c'est plein
    tl.to(".water-jet", { height: "0%", top: "100%", duration: 0.5, ease: "power1.out" }, "slide7-anim+=2");

    // --- SLIDE 8 (RANA PLAZA : LUMIERES PUIS EFFONDREMENT) ---
    tl.to(container, { x: "-400vw", y: "-400vh", ease: "none" }); tl.addLabel("slide8-anim");
    tl.to(".tragedy-text-rana", { opacity: 1, duration: 0.5 }, "slide8-anim");
    // 1. Lumières s'éteignent (ajout classe CSS)
    tl.call(() => { document.querySelector('.building-svg-rana').classList.add('lights-out'); }, null, "slide8-anim+=1");
    // 2. Effondrement
    const collapseTl = gsap.timeline();
    collapseTl.to(".building-svg-rana", { x: "+=15", yoyo: true, repeat: 5, duration: 0.05 }) // Tremblement fort
              .to(".building-svg-rana", { y: "100vh", rotation: 10, opacity: 0, duration: 1.5, ease: "power2.in" }); // Chute
    tl.add(collapseTl, "slide8-anim+=1.5");

    // --- SLIDE 9 (RECYCLAGE DOUBLES BACS) ---
    tl.to(container, { x: "-400vw", y: "-500vh", ease: "none" }); tl.addLabel("slide9-anim");
    // Vêtements tombent en désordre vers les bacs
    tl.fromTo(".recy-item.m1", { y: 0, x: 100 }, { y: 650, x: -150, rotation: 360, duration: 2, ease: "power1.in" }, "slide9-anim");
    tl.fromTo(".recy-item.m2", { y: 0, x: -50 }, { y: 600, x: -50, rotation: -200, duration: 1.8, ease: "power1.in" }, "slide9-anim+=0.2");
    tl.fromTo(".recy-item.m3", { y: 0, x: 0 }, { y: 680, x: 100, rotation: 180, duration: 2.2, ease: "power1.in" }, "slide9-anim+=0.1");
    tl.fromTo(".recy-item.m4", { y: 0, x: 200 }, { y: 620, x: 180, rotation: 90, duration: 1.9, ease: "power1.in" }, "slide9-anim+=0.3");
    tl.fromTo(".recy-item.m5", { y: 0, x: -150 }, { y: 660, x: -120, rotation: -150, duration: 2.1, ease: "power1.in" }, "slide9-anim+=0.2");

    // --- SLIDE 10 (AFRIQUE DROITE, TEXTE GAUCHE SÉQUENTIEL) ---
    tl.to(container, { x: "-500vw", y: "-500vh", ease: "none" }); tl.addLabel("slide10-anim");
    // 1. Carte Afrique + Texte 1
    tl.to(".map-wrapper-africa", { opacity: 1, duration: 1 }, "slide10-anim");
    tl.to(".africa-txt-block.txt-1", { opacity: 1, duration: 1 }, "slide10-anim");
    // 2. Ghana apparaît + Texte 2
    tl.to(".ghana-overlay", { opacity: 1, duration: 0.5 }, "slide10-anim+=1.5");
    tl.to(".africa-txt-block.txt-2", { opacity: 1, duration: 1 }, "slide10-anim+=1.5");

    // --- SLIDE 11 (USINE FUMÉE POINTS) ---
    tl.to(container, { x: "-600vw", y: "-500vh", ease: "none" }); tl.addLabel("slide11-anim");
    // Usine monte
    tl.to(".factory-svg-new", { transform: "translateY(0%)", duration: 1, ease: "power3.out" }, "slide11-anim");
    // Points apparaissent un par un (stagger)
    tl.to(".dot", { opacity: 1, scale: 1, duration: 0.1, stagger: { amount: 2, grid: [10, 10], from: "end" } }, "slide11-anim+=0.5");
    // Texte apparaît
    tl.to(".factory-text-dots", { opacity: 1, y: 0, duration: 1 }, "slide11-anim+=2");

    // --- SLIDE 12 (CHAPEAUX EMPILES SÉQUENTIEL) ---
    tl.to(container, { x: "-600vw", y: "-400vh", ease: "none" }); tl.addLabel("slide12-anim");
    // Séquence : Chapeau tombe -> Texte Gauche -> Texte Droite
    const hatTl = gsap.timeline();
    // Chapeau 1 (Bleu bas)
    hatTl.to(".hat-1", { y: 0, opacity: 1, duration: 0.5, ease: "bounce.out" })
         .to(".tip-3", { opacity: 1, x: 0, duration: 0.3 }, ">-0.2").to(".tip-6", { opacity: 1, x: 0, duration: 0.3 }, "<");
    // Chapeau 2 (Jaune)
    hatTl.to(".hat-2", { y: 0, opacity: 1, duration: 0.5, ease: "bounce.out" }, ">-0.1")
         .to(".tip-2", { opacity: 1, x: 0, duration: 0.3 }, ">-0.2").to(".tip-5", { opacity: 1, x: 0, duration: 0.3 }, "<");
    // Chapeau 3... etc
    hatTl.to(".hat-3", { y: 0, opacity: 1, duration: 0.5, ease: "bounce.out" }, ">-0.1").to(".tip-1", { opacity: 1, x: 0, duration: 0.3 }, ">-0.2");
    hatTl.to(".hat-4", { y: 0, opacity: 1, duration: 0.5, ease: "bounce.out" }, ">-0.1").to(".tip-4", { opacity: 1, x: 0, duration: 0.3 }, ">-0.2");
    hatTl.to(".hat-5", { y: 0, opacity: 1, duration: 0.5, ease: "bounce.out" }, ">-0.1");
    hatTl.to(".hat-6", { y: 0, opacity: 1, duration: 0.5, ease: "bounce.out" }, ">-0.1");
    tl.add(hatTl, "slide12-anim");

    // --- SLIDE 13 (CONCLUSION) ---
    tl.to(container, { x: "-600vw", y: "-300vh", ease: "none" }); tl.addLabel("slide13-anim");
    tl.to(".final-content", { opacity: 1, scale: 1, duration: 1.5, ease: "power4.out" }, "slide13-anim");
    tl.to(".final-line", { width: "300px", duration: 1, ease: "power2.out" }, "slide13-anim+=0.5");

    return tl;
}

setupScrollFlow();

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
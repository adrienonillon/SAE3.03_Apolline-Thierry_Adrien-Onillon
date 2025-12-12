import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 1. CONFIGURATION DU PARCOURS (NAVIGATION)
function setupScrollFlow() {
    const container = document.querySelector('.scroll-container');
    
    // On crée une grande Timeline qui contrôle tout le déplacement
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".scroll-container",
            start: "top top",
            end: "+=12000", // La longueur virtuelle du scroll (plus c'est grand, plus c'est lent)
            scrub: 1,       // Lissage de l'animation
            pin: true,      // On épingle le conteneur pendant qu'on le bouge
            // markers: true // Décommenter pour debug
        }
    });

    // SÉQUENCE DE MOUVEMENT
    // Pour aller en BAS, on bouge le conteneur vers le HAUT (Y négatif)
    // Pour aller à DROITE, on bouge le conteneur vers la GAUCHE (X négatif)
    
    tl.to(container, { x: 0, y: "-100vh", ease: "none" })          // Vers Slide 1 (Bas)
      .to(container, { x: "-100vw", y: "-100vh", ease: "none" })   // Vers Slide 2 (Droite)
      .to(container, { x: "-100vw", y: "-200vh", ease: "none" })   // Vers Slide 3 (Bas)
      .to(container, { x: "-200vw", y: "-200vh", ease: "none" })   // Vers Slide 4 (Droite)
      .to(container, { x: "-300vw", y: "-200vh", ease: "none" })   // Vers Slide 5 (Droite)
      .to(container, { x: "-400vw", y: "-200vh", ease: "none" })   // Vers Slide 6 (Droite)
      .to(container, { x: "-400vw", y: "-300vh", ease: "none" })   // Vers Slide 7 (Bas)
      .to(container, { x: "-500vw", y: "-300vh", ease: "none" })   // Vers Slide 8 (Droite)
      .to(container, { x: "-500vw", y: "-400vh", ease: "none" })   // Vers Slide 9 (Bas)
      .to(container, { x: "-600vw", y: "-400vh", ease: "none" })   // Vers Slide 10 (Droite)
      .to(container, { x: "-700vw", y: "-400vh", ease: "none" })   // Vers Slide 11 (Droite)
      .to(container, { x: "-700vw", y: "-500vh", ease: "none" });  // Vers Slide 12 (Bas)

    return tl;
}

// 2. GESTION DES LOTTIES
// Note : Scroller à l'intérieur d'un conteneur épinglé est complexe. 
// Ici, on lance l'animation quand le Lottie est chargé, en boucle simple pour l'instant.
function initLottieSimple(containerId, animationPath) {
    let anim = lottie.loadAnimation({
        container: document.querySelector(containerId),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: animationPath
    });
}

// LANCEMENT
setupScrollFlow();

initLottieSimple("#lottie-1", "assets/json/vetements_volants.json");
initLottieSimple("#lottie-2", "assets/json/tshirts_grid.json");
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
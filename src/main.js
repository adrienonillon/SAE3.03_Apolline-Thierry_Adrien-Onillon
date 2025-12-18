import "./style.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let itemsDeBase = document.querySelectorAll(".falling__item");
for (let i = 0; i < itemsDeBase.length; i++) {
  itemsDeBase[i].style.left = Math.random() * 90 + "%";
  itemsDeBase[i].style.width = Math.random() * 80 + 120 + "px";
}

// --- LA TIMELINE ---
let tl = gsap.timeline({
  scrollTrigger: {
    // CHANGEMENT ICI : On cible le wrapper, pas le container
    trigger: ".pin-wrapper", 
    start: "top top",
    end: "+=35000",
    scrub: 1,
    pin: true,
    onUpdate: function (self) {
      let barre = document.querySelector(".progress__bar");
      barre.style.width = self.progress * 100 + "%";
    },
  },
});

let container = document.querySelector(".scroll-container");

// ============================================================
// SLIDE 1 : INTRO
// ============================================================
tl.to(container, { x: 0, y: "-100vh", ease: "none", duration: 1 });
tl.fromTo(
  ".falling__item",
  { y: "-50vh", rotation: -45 },
  {
    y: "150vh",
    rotation: "random(-180, 180)",
    x: "random(-200, 200)",
    ease: "none",
    stagger: 0.1,
    duration: 1,
  },
  "<"
);
tl.fromTo(
  "#slide-1 .slide__content",
  { opacity: 0, scale: 0.8 },
  { opacity: 1, scale: 1, ease: "back.out(1.7)", duration: 0.5 },
  "-=0.5"
);
ScrollTrigger.create({
  trigger: "#slide-1",
  start: "top center",
  onEnter: function () {
    let obj = { val: 0 };
    let span = document.querySelector("#counter-7000");
    gsap.to(obj, {
      val: 7000,
      duration: 1,
      onUpdate: function () {
        span.textContent = Math.floor(obj.val);
      },
    });
  },
});

// ============================================================
// SLIDE 2 : T-SHIRTS (DROITE)
// ============================================================
tl.to(container, { x: "-100vw", y: "-100vh", ease: "none", duration: 1 });
tl.to(".tshirts__icon", {
  opacity: 1,
  scale: 1,
  duration: 0.5,
  ease: "back.out(2)",
  stagger: 0.1,
});
tl.to(".slide__content--reveal", { opacity: 1, y: 0, duration: 0.5 });

// ============================================================
// SLIDE 3 : FAST FASHION (BAS)
// ============================================================
tl.to(container, { 
    x: "-100vw", 
    y: "-200vh", 
    ease: "none", 
    duration: 1 
});

tl.fromTo(".ff-number", 
    { scale: 0, opacity: 0 }, 
    { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
);
tl.fromTo(".ff-label", 
    { y: 50, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 0.5 }, 
    "<0.2"
);
tl.fromTo(".ff-text", 
    { y: -50, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 0.5 }, 
    "<"
);
tl.fromTo(".ff-shape--left", { x: "-100%" }, { x: "0%", duration: 0.8, ease: "power2.out" }, "<");
tl.fromTo(".ff-shape--right", { x: "100%" }, { x: "0%", duration: 0.8, ease: "power2.out" }, "<");

// ============================================================
// SLIDE 4 : ARMOIRE (BAS)
// ============================================================
tl.to(container, { x: "-100vw", y: "-300vh", ease: "none", duration: 1 });
tl.fromTo(
  ".wardrobe__text",
  { opacity: 0, x: -50 },
  { opacity: 1, x: 0, ease: "power2.out", duration: 0.5 }
);
tl.to(".wardrobe__door--top", {
  xPercent: 110,
  ease: "power2.inOut",
  duration: 1.5,
});
tl.to(".wardrobe__clothes", {
  bottom: "10%",
  opacity: 1,
  ease: "back.out(1.5)",
  stagger: 0.2,
  duration: 0.8,
});

// ============================================================
// SLIDE 5 : GRAPHIQUE (DROITE)
// ============================================================
tl.to(container, { x: "-200vw", y: "-300vh", ease: "none", duration: 1 });
let barres = document.querySelectorAll(".chart__bar");
tl.to(barres, {
  height: function (index, target) {
    return getComputedStyle(target).getPropertyValue("--target-height");
  },
  duration: 1.5,
  ease: "power3.out",
  stagger: 0.2,
});
tl.to(".tag__content", { opacity: 1, duration: 0.8, stagger: 0.2 });

// ============================================================
// SLIDE 6 : CADENCE TRAVAIL (BAS - DEBUT DESCENTE)
// ============================================================
tl.to(container, { x: "-200vw", y: "-400vh", ease: "none", duration: 1 });
tl.to(".hand-minute", {
  rotation: 720,
  duration: 3,
  transformOrigin: "bottom center",
});
tl.to(
  ".hand-hour",
  { rotation: 120, duration: 3, transformOrigin: "bottom center" },
  "<"
);
tl.to(".clock-pie", { strokeDashoffset: 300, duration: 3 }, "<");
tl.fromTo(
  ".coin",
  { y: -600, opacity: 0, rotation: -180 },
  {
    y: 0,
    opacity: 1,
    rotation: 0,
    duration: 1,
    ease: "bounce.out",
    stagger: 0.2,
  }
);

// ============================================================
// SLIDE 7 : EAU (BAS)
// ============================================================
tl.to(container, { x: "-200vw", y: "-500vh", ease: "none", duration: 1 });
tl.to(".water__jet", { height: "100%", duration: 0.8 });
tl.to(".water__layer", { y: "0%", duration: 2 });
tl.to(".water__bottom-text", { opacity: 1, y: -20, duration: 1 });
gsap.to(".water__wave--front", {
  x: "-5%",
  duration: 1.5,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
});
gsap.to(".water__wave--back", {
  x: "5%",
  duration: 1,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
});

// ============================================================
// SLIDE 8 : RANA PLAZA (BAS)
// ============================================================
tl.to(container, { x: "-200vw", y: "-600vh", ease: "none", duration: 1 });
tl.fromTo(".building__svg", { y: "100%" }, { y: "0%", duration: 1 });
tl.to(".rana__header", { opacity: 1, duration: 0.5 });
tl.to(".rana__col-right", { opacity: 1, duration: 0.5 });
let fenetresList = document.querySelectorAll(
  ".building__svg rect[fill='#fbd236']"
);
let fenetresArray = Array.from(fenetresList);
fenetresArray.sort(function (a, b) {
  let yA = parseFloat(a.getAttribute("y"));
  let yB = parseFloat(b.getAttribute("y"));
  return yA - yB;
});
tl.to(fenetresArray, { fill: "#000000", duration: 0.1, stagger: 0.05 });
tl.to(".building__svg", { x: "+=15", yoyo: true, repeat: 10, duration: 0.05 });
tl.to(".building__svg", { y: "150vh", rotation: 5, opacity: 0, duration: 1.5 });

// ============================================================
// SLIDE 9 : RECYCLAGE (BAS)
// ============================================================
tl.to(container, { x: "-200vw", y: "-700vh", ease: "none", duration: 1 });
tl.to(".bins", { y: 0, opacity: 1, duration: 1, ease: "power3.out" });
let itemsRecyclage = document.querySelectorAll(".recycling__item");
let animationRecyclage = gsap.timeline();
for (let i = 0; i < itemsRecyclage.length; i++) {
  let item = itemsRecyclage[i];
  let positionX;
  if (i % 2 == 0) {
    positionX = -350 + Math.random() * 200;
  } else {
    positionX = 150 + Math.random() * 200;
  }
  gsap.set(item, {
    y: "-50vh",
    x: positionX,
    rotation: Math.random() * 360,
    opacity: 1,
    scale: 1,
  });
  animationRecyclage.to(
    item,
    { y: "60vh", rotation: "+=180", duration: 1.2, ease: "power1.in" },
    i * 0.3
  );
  animationRecyclage.to(
    item,
    { y: "75vh", opacity: 0, scale: 0.5, duration: 0.2 },
    ">"
  );
}
tl.add(animationRecyclage);

// ============================================================
// SLIDE 10 : AFRIQUE (BAS - FIN DESCENTE)
// ============================================================
tl.to(container, { x: "-200vw", y: "-800vh", ease: "none", duration: 1 });
tl.to(".map-main", { opacity: 1, duration: 1 });
tl.to(".afrique__block--1", { opacity: 1, duration: 1 }, "<");
tl.to(".map-ghana", { opacity: 1, duration: 0.5 });
tl.to(".afrique__block--2", { opacity: 1, duration: 1 }, "<");

// ============================================================
// SLIDE 11 : USINE (DROITE)
// ============================================================
tl.to(container, { x: "-300vw", y: "-800vh", ease: "none", duration: 1 });
// Animation simplifiée pour l'usine (juste le texte qui arrive, le lottie joue tout seul)
tl.fromTo(
  ".factory-content",
  { x: 100, opacity: 0 },
  { x: 0, opacity: 1, duration: 1 },
  "+=0.5"
);

// ============================================================
// SLIDE 12 : CONSEILS (HAUT - REMONTEE)
// ============================================================
tl.to(container, { x: "-300vw", y: "-700vh", ease: "none", duration: 1 });
tl.to(".hats__item--6", {
  y: 0,
  opacity: 1,
  duration: 0.5,
  ease: "back.out(1.7)",
});
tl.to(".hats__tip--3", { opacity: 1, x: 0, duration: 0.3 }, "<0.2");
tl.to(
  ".hats__item--5",
  { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
  "-=0.2"
);
tl.to(".hats__tip--6", { opacity: 1, x: 0, duration: 0.3 }, "<0.2");
tl.to(
  ".hats__item--4",
  { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
  "-=0.2"
);
tl.to(".hats__tip--2", { opacity: 1, x: 0, duration: 0.3 }, "<0.2");
tl.to(
  ".hats__item--3",
  { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
  "-=0.2"
);
tl.to(".hats__tip--5", { opacity: 1, x: 0, duration: 0.3 }, "<0.2");
tl.to(
  ".hats__item--2",
  { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
  "-=0.2"
);
tl.to(".hats__tip--1", { opacity: 1, x: 0, duration: 0.3 }, "<0.2");
tl.to(
  ".hats__item--1",
  { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
  "-=0.2"
);
tl.to(".hats__tip--4", { opacity: 1, x: 0, duration: 0.3 }, "<0.2");

// ============================================================
// SLIDE 13 : FIN (HAUT - REMONTEE)
// ============================================================
tl.to(container, { x: "-300vw", y: "-600vh", ease: "none", duration: 1 });
tl.to(".final", { opacity: 1, scale: 1, duration: 1.5, ease: "power4.out" });
tl.to(".final__line", { width: "300px", duration: 1 });
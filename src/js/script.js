"use strict";
import Swup from "swup";
import SwupHeadPlugin from "@swup/head-plugin";
import SwupBodyClassPlugin from "@swup/body-class-plugin";

document.addEventListener("DOMContentLoaded", () => {
  runSwupHooks();
  activateHamburgerMenu();
  updateActiveNavLink();
  initStickyHeader();
  initLanguageChange();
  updateCopyrightYear();
  initAccordion();
  initSpeedColors();
  gsapSwupAnimations();
  gsapRocketFlame();
  stopTransitionOnResize();

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  requestAnimationFrame(() => {
    gsapOpeningHomeAnimations();
  });

  window.addEventListener("load", () => {
    document.documentElement.classList.remove("is-loading");

    setTimeout(() => {
      requestAnimationFrame(() => {
        gsapScrollAnimations();
        ScrollTrigger.refresh();
      });
    }, 100);
  });
});

///////////////////////////////////////////////////////////* Swup page navigation *////////////////////////////////////////////////////////////////////////////////////////*

const swup = new Swup({
  containers: ["#swup", "#swup-header", "#footer"],
  animateHistoryBrowsing: true,
  respectScroll: false,

  plugins: [
    new SwupHeadPlugin({
      awaitAssets: false,
      persistAssets: true,
    }),
    new SwupBodyClassPlugin(),
  ],
});

function runSwupHooks() {
  swup.hooks.on("page:view", () => {
    activateHamburgerMenu();
    updateActiveNavLink();
    initStickyHeader();
    initLanguageChange();
    initAccordion();
    initSpeedColors();
    gsapRocketFlame();
    resetColors();
    updateCopyrightYear();

    const footerVideo = document.querySelector(".footer-video-container video");

    footerVideo?.load();
    footerVideo?.play().catch(() => {});

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsapScrollAnimations();
  });

  swup.hooks.on("visit:start", () => {
    document.documentElement.classList.remove("has-smooth-scroll");
  });

  swup.hooks.on("visit:end", () => {});
}

/////////////////////////////////////////////////////////////* Opening + Swup animations *///////////////////////////////////////////////////////////////////////////*

function gsapOpeningHomeAnimations() {
  const body = document.body;

  if (!document.body.classList.contains("home")) return;

  /* return; */

  window.addEventListener("load", () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    }, 0);
  });

  const tl = gsap.timeline({
    defaults: { ease: "power3.out" },
    delay: 0.2,
  });

  gsap.set(".cmp-main-btn--dark-btn", {
    transition: "none",
  });

  tl.fromTo(
    ".cmp-hero-heading",
    {
      clipPath: "inset(0 0 100% 0)",
    },
    {
      clipPath: "inset(0 0 0% 0)",
      duration: 2,
      ease: "power2.inOut",
    },
  )
    .from(
      ".cmp-main-text",
      {
        y: -30,
        opacity: 0,
        duration: 2,
      },
      "+=0.1",
    )
    .from(
      ".cmp-topper-heading",
      {
        y: 30,
        opacity: 0,
        duration: 2,
      },
      "-=1.75",
    )
    .from(
      ".hero-btn-container a:first-of-type",
      {
        opacity: 0,
        x: -50,
        duration: 2,
      },
      "-=1.5",
    )
    .from(
      ".hero-btn-container a:last-of-type",
      {
        opacity: 0,
        x: 50,
        duration: 2,
        clearProps: "all",
      },
      "-=2",
    )
    .from(
      ".header",
      {
        y: -30,
        opacity: 0,
        duration: 2,
      },
      "-=2",
    )
    .from(
      ".hero-image-container",
      {
        y: 30,
        opacity: 0,
        duration: 2,
      },
      "-=1",
    );
}

function gsapSwupAnimations() {
  swup.hooks.on("visit:start", () => {
    return gsap
      .timeline()
      .to(
        ".transition-slide",
        {
          y: 30,
          duration: 0.4,
          ease: "power2.in",
        },
        0,
      )
      .to(
        ".transition-slide",
        {
          opacity: 0,
          duration: 0.2,
          ease: "power1.out",
        },
        0.2,
      );
  });

  swup.hooks.on("page:view", () => {
    gsap
      .timeline()
      .fromTo(
        ".transition-slide",
        {
          y: -30,
          opacity: 0,
        },
        {
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        0,
      )
      .to(
        ".transition-slide",
        {
          opacity: 1,
          duration: 0.4,
          ease: "power1.in",
        },
        0.1,
      );
  });
}

function gsapRocketFlame() {
  if (!document.querySelector(".home-rocket-svg")) return;

  gsap.to(".rocket-flame", {
    keyframes: [
      { scaleY: 1.015 },
      { scaleY: 0.99 },
      { scaleY: 1.01 },
      { scaleY: 1 },
    ],
    duration: 0.2,
    repeat: -1,
    ease: "none",
    transformOrigin: "85% 50%",
    transformBox: "fill-box",
  });
}

////////////////////////////////////////////////////////////* GSAP scrolling animations *////////////////////////////////////////////////////////////////////////////////*

function gsapScrollAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  /* return; */

  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 10);

  /*   ScrollTrigger.defaults({ markers: true }); */

  const animatedElements = document.querySelectorAll(
    "[data-animate]:not([data-animate-group] [data-animate])",
  );

  animatedElements.forEach((el) => {
    const animationType = el.dataset.animate;
    const isReversible = el.hasAttribute("data-reversible");
    const addScrub = el.hasAttribute("data-scrub");
    let animationStyles = { opacity: 0, duration: 1, ease: "power3.out" };

    switch (animationType) {
      case "slide-up":
        animationStyles = { ...animationStyles, y: 150 };
        break;
      case "slide-down":
        animationStyles = { ...animationStyles, y: -150 };
        break;
      case "slide-left":
        animationStyles = { ...animationStyles, x: -150 };
        break;
      case "slide-right":
        animationStyles = { ...animationStyles, x: 150 };
        break;
      case "slide-up-fast":
        animationStyles = { ...animationStyles, y: 150, duration: 0.2 };
        break;
      case "slide-down-fast":
        animationStyles = { ...animationStyles, y: -150, duration: 0.2 };
        break;
      case "slide-left-fast":
        animationStyles = { ...animationStyles, x: -150, duration: 0.2 };
        break;
      case "slide-right-fast":
        animationStyles = { ...animationStyles, x: 150, duration: 0.2 };
        break;
      case "fade-in":
      default:
        animationStyles = { ...animationStyles, scale: 0.8, duration: 1 };
        break;
      case "scale-up":
        animationStyles = { ...animationStyles, scale: 0.85, duration: 1.5 };
        break;
      case "scale-down":
        gsap.from(el, {
          scale: 1.75,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          clearProps: "transform, opacity",
          scrollTrigger: {
            scrub: addScrub ? 5 : false,
            once: isReversible ? false : true,
            trigger: el,
            start: "top 70%",
          },
        });
        return;
      case "shutter-left":
        animationStyles = {
          ...animationStyles,
          clipPath: "inset(0 100% 0 0)",
          opacity: 1,
          duration: 0.85,
          scrub: addScrub ? 5 : false,
          once: isReversible ? false : true,
        };
        break;
      case "shutter-horizontal":
        gsap.fromTo(
          el,
          { clipPath: "inset(0 50% 0 50%)" },
          {
            clipPath: "inset(0 0% 0 0%)",
            duration: 0.75,
            ease: "power1.out",
            clearProps: "transform, opacity",
            scrollTrigger: {
              scrub: addScrub ? 5 : false,
              once: isReversible ? false : true,
              trigger: el,
              start: "top 80%",
            },
          },
        );
        return;
      case "shutter-vertical":
        gsap.fromTo(
          el,
          { clipPath: "inset(50% 0 50% 0)" },
          {
            clipPath: "inset(-10% -10% -10% -10%)",
            duration: 2.5,
            ease: "power2.out",
            clearProps: "transform, opacity",
            scrollTrigger: {
              scrub: addScrub ? 5 : false,
              once: isReversible ? false : true,
              trigger: el,
              start: "top 75%",
            },
          },
        );
        return;
    }

    gsap.from(el, {
      ...animationStyles,
      clearProps: "transform, opacity",
      scrollTrigger: {
        trigger: el,
        start: "top 75%",
        end: "top 45%",
        scrub: addScrub ? 5 : false,
        once: isReversible ? false : true,
        toggleActions: isReversible
          ? "play none none reverse"
          : "play none none none",
      },
    });
  });

  document.querySelectorAll("[data-animate-group]").forEach((group) => {
    const triggerStartPoint = group.dataset.animateStart || "top 70%";
    const hasStagger = group.dataset.animateStagger || "0";

    group.querySelectorAll("[data-animate]").forEach((el) => {
      const animationType = el.dataset.animate;
      let animationStyles = { opacity: 0, ease: "power3.out" };

      switch (animationType) {
        case "slide-left":
          animationStyles.x = -120;
          break;
        case "slide-right":
          animationStyles.x = 120;
          break;
        case "slide-up":
          animationStyles.y = 120;
          break;
        case "slide-down":
          animationStyles.y = -120;
          break;
      }

      gsap.set(el, animationStyles);
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: group,
        start: triggerStartPoint,
        once: true,
      },
    });

    tl.to(group.querySelectorAll("[data-animate]"), {
      x: 0,
      y: 0,
      opacity: 1,
      ease: "power1.out",
      duration: 0.5,
      stagger: hasStagger,
    });
  });
}

////////////////////////////////////////////////////////* Speed section langauge + colour change *///////////////////////////////////////////////////////////////////////////////*

function initLanguageChange() {
  const text = document.querySelectorAll(".language-card-text-container span");
  const buttons = document.querySelectorAll(
    ".langauge-card-button-container button",
  );

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const lang = button.dataset.lang;

      text.forEach((span) => {
        span.style.display = span.dataset.lang === lang ? "block" : "none";
      });

      buttons.forEach((btn) => {
        btn.classList.remove("language-active");
      });

      e.currentTarget.classList.add("language-active");
    });
  });
}

function initSpeedColors() {
  document.querySelectorAll("[data-theme-button]").forEach((button) => {
    button.addEventListener("click", (e) => {
      const theme = button.dataset.themeButton;

      if (theme === document.documentElement.dataset.theme) return;

      const applyTheme = () => {
        document.documentElement.dataset.theme = theme;
      };

      if (!document.startViewTransition) {
        applyTheme();
        return;
      }

      document.startViewTransition(applyTheme);
    });
  });
}

function resetColors() {
  document.documentElement.dataset.theme = "ocean";
}

//////////////////////////////////////////////////////////////////* FAQ accordion */////////////////////////////////////////////////////////////////////////////*

function initAccordion() {
  let currentOpenItem =
    null; /* No open item by default but checks when one is clicked and then it becomes that specific 'item' */

  document.querySelectorAll(".faq-item").forEach((item) => {
    const button = item.querySelector("button");
    const answer = item.querySelector(".faq-item__answer");
    const icon = item.querySelector("svg");

    button.addEventListener("click", () => {
      if (currentOpenItem && currentOpenItem !== item) {
        gsap.to(currentOpenItem.querySelector(".faq-item__answer"), {
          height: 0,
          duration: 0.75,
          ease: "power3.inOut",
        });

        gsap.to(currentOpenItem.querySelector("button"), {
          color: "#f5f6f8",
          duration: 0.75,
          ease: "power3.inOut",
        });

        gsap.to(currentOpenItem.querySelector("svg"), {
          rotate: 45,
          stroke: "#f5f6f8",
          duration: 0.75,
          ease: "power3.inOut",
        });

        currentOpenItem = null;
      }

      if (answer.offsetHeight > 0) {
        gsap.to(answer, {
          height: 0,
          duration: 0.5,
          ease: "power3.inOut",
        });

        gsap.to(button, {
          color: "#f5f6f8",
          duration: 0.35,
          ease: "power3.inOut",
        });

        gsap.to(icon, {
          rotate: 45,
          stroke: "#f5f6f8",
          duration: 0.4,
          ease: "power3.inOut",
        });

        currentOpenItem = null;
      } else {
        gsap.to(answer, {
          height: "auto",
          duration: 0.75,
          ease: "power2.inOut",
        });

        gsap.to(button, {
          color: "#48d1e0",
          duration: 0.75,
          ease: "power2.inOut",
        });

        gsap.to(icon, {
          rotate: 180,
          stroke: "#48d1e0",
          duration: 0.75,
          ease: "power2.inOut",
        });

        currentOpenItem = item;
      }
    });
  });
}

////////////////////////////////////////////////////* Hamburger menu and Navigation accessibility attributes */////////////////////////////////////////////////////////*

function activateHamburgerMenu() {
  const hamburgerBtn = document.querySelector(".hamburger-btn");
  const navBar = document.querySelector(".nav-bar");
  const navBarList = document.querySelector(".nav-bar ul");
  let isAnimating = false;

  hamburgerBtn.addEventListener("click", () => {
    if (isAnimating) return;
    const isOpen = navBar.classList.contains("hamburger-btn__open");

    if (isOpen) {
      isAnimating = true;
      hamburgerBtn.classList.remove("active");
      navBar.classList.remove("hamburger-btn__open");
    } else {
      navBar.style.display = "block";
      requestAnimationFrame(() => {
        isAnimating = true;
        hamburgerBtn.classList.add("active");
        navBar.classList.add("hamburger-btn__open");
      });
    }

    setNavAttributes();

    setTimeout(() => {
      isAnimating = false;
    }, 800);
  });

  navBar.addEventListener("transitionend", (e) => {
    if (e.propertyName !== "transform") return;

    isAnimating = false;
  });

  document.addEventListener("click", (e) => {
    if (
      !navBar.classList.contains("hamburger-btn__open") ||
      e.target === navBar ||
      e.target === hamburgerBtn ||
      e.target === navBarList
    )
      return;

    isAnimating = true;
    navBar.classList.remove("hamburger-btn__open");
    hamburgerBtn.classList.remove("active");

    setNavAttributes();
  });
}

function setNavAttributes() {
  const navBar = document.querySelector(".nav-bar");
  const navBarLinks = document.querySelectorAll(".nav-bar a");
  const navBarHasActiveClass = navBar.classList.contains("hamburger-btn__open");
  const hamburgerBtn = document.querySelector(".hamburger-btn");

  if (!navBarHasActiveClass && navBar.contains(document.activeElement)) {
    document.activeElement.blur();
  }

  navBar.setAttribute("aria-hidden", String(!navBarHasActiveClass));
  hamburgerBtn.setAttribute("aria-expanded", String(navBarHasActiveClass));

  navBarLinks.forEach((link) => {
    link.tabIndex = navBarHasActiveClass ? 0 : -1;
  });
}

//////////////////////////////////////////////////////////////////* Show the current page on nav-bar *////////////////////////////////////////////////////////////////*

function updateActiveNavLink() {
  const navBarLinks = document.querySelectorAll(".nav-bar a");
  const currentPath = window.location.pathname;

  for (const link of navBarLinks) {
    const linkPath = new URL(link.href).pathname;

    if (linkPath === currentPath || currentPath === "/") {
      link.classList.add("active-link");

      requestAnimationFrame(() => {
        link.classList.add("animate-underline");
      });

      break; // Break the loop so only the homepage link has the active-link class.
    } else {
      link.classList.remove("active-link", "animate-underline");
    }
  }
}

///////////////////////////////////////////////////////////////* Sticky navigation bar *//////////////////////////////////////////////////////////////////////////////*

function initStickyHeader() {
  const hamburgerBtn = document.querySelector(".hamburger-btn");
  const navBar = document.querySelector(".nav-bar");

  function closeMenuSafely() {
    navBar.classList.remove("hamburger-btn__open");
    hamburgerBtn.classList.remove("active");
    setNavAttributes();
  }

  window.addEventListener("scroll", () => {
    const header = document.querySelector("#header");
    const isScrolled = window.scrollY > 400;
    const headerWasSticking = header.classList.contains("sticking");

    if (isScrolled && !headerWasSticking) {
      header.classList.add("sticking");
      closeMenuSafely();
    } else if (window.scrollY < 5 && headerWasSticking) {
      header.classList.remove("sticking");
      closeMenuSafely();
    }
  });
}

//////////////////////////////////////////////////////////////* Footer copyright-year update *////////////////////////////////////////////////////////////////////////*

function updateCopyrightYear() {
  const currentYear = new Date().getFullYear();
  const copyrightSymbol = "\u00A9";

  document.getElementById("year").innerHTML =
    `${copyrightSymbol} ${currentYear} Algarve WebCraft. All Rights Reserved`;
}

////////////////////////////////////////////////////////* Prevent navigation transitions happening on resize *////////////////////////////////////////////////////////////////////////*

function stopTransitionOnResize() {
  const navBar = document.querySelector(".nav-bar");
  let resizeTimeout;

  window.addEventListener("resize", () => {
    navBar.classList.add("no-transition");

    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      navBar.classList.remove("no-transition");
    }, 1);
  });
}

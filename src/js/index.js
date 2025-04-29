document.addEventListener("DOMContentLoaded", () => {
  const mySwiper = new Swiper(".mySwiper", {
    spaceBetween: 16,
    navigation: {
      nextEl: ".swiper-next",
      prevEl: ".swiper-prev",
    },
    breakpoints: {
      0: { slidesPerView: 1.2 },
      640: { slidesPerView: 2.2 },
      1024: { slidesPerView: 3.2 },
      1280: { slidesPerView: 4.2 },
    },
    on: {
      init: function () {
        updateProgressRing(this);
      },
      slideChange: function () {
        updateProgressRing(this);
      },
    },
  });

  // Function to update progress ring for the first Swiper
  function updateProgressRing(swiper) {
    const nextRing = document.querySelector(".progress-ring-next");
    if (!nextRing) {
      console.error("Next progress ring not found!");
      return;
    }

    const totalSlides = swiper.slides.length;
    const radius = 16;
    const dashArray = 2 * Math.PI * radius; // ≈ 188.5

    const index = swiper.realIndex;
    const slidesPerView = swiper.params.slidesPerView;
    const totalScrollable = totalSlides - Math.floor(slidesPerView);
    const progress = totalScrollable > 0 ? index / totalScrollable : 1;

    const nextOffset = dashArray * (1 - progress);

    nextRing.style.opacity = "1";
    nextRing.style.strokeDashoffset = nextOffset;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const mySwiperTwo = new Swiper(".mySwiperTwo", {
    spaceBetween: 16,
    navigation: {
      nextEl: ".swiper-nextTwo",
      prevEl: ".swiper-prevTwo",
    },
    breakpoints: {
      0: { slidesPerView: 1.2 },
      640: { slidesPerView: 2.2 },
      1024: { slidesPerView: 3.2 },
      1280: { slidesPerView: 4.2 },
    },
    on: {
      init: function () {
        updateProgressRingTwo(this);
      },
      slideChange: function () {
        updateProgressRingTwo(this);
      },
    },
  });

  // Function to update progress ring for the second Swiper
  function updateProgressRingTwo(swiper) {
    const nextRing = document.querySelector(".progress-ring-nextTwo");
    if (!nextRing) {
      console.error("Next progress ring for mySwiperTwo not found!");
      return;
    }

    const totalSlides = swiper.slides.length;
    const radius = 16; // Must match your <circle r="16">
    const dashArray = 2 * Math.PI * radius; // ~100.53

    const index = swiper.realIndex;
    let slidesPerView = swiper.params.slidesPerView;

    const totalScrollable = totalSlides - Math.floor(slidesPerView);
    const progress = totalScrollable > 0 ? index / totalScrollable : 1;

    const nextOffset = dashArray * (1 - progress);

    nextRing.style.strokeDasharray = dashArray;
    nextRing.style.strokeDashoffset = nextOffset;
    nextRing.style.opacity = "1";
  }
});

//new scroll
document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper(".localSwiper", {
    slidesPerView: 1,
    spaceBetween: 16,
    navigation: {
      nextEl: ".local-next",
      prevEl: ".local-prev",
    },
    on: {
      init: (swiper) => updateProgress(swiper),
      slideChange: (swiper) => updateProgress(swiper),
    },
  });

  function updateProgress(swiper) {
    const currentIndex = swiper.realIndex + 1;
    const totalSlides = swiper.slides.length || 1; // Prevent division by zero

    const currentStep = document.getElementById("currentStep");
    const totalSteps = document.getElementById("totalSteps");
    const progressBar = document.getElementById("progressBar");
    const progressRing = document.getElementById("progressRing");

    if (currentStep)
      currentStep.textContent = String(currentIndex).padStart(2, "0");
    if (totalSteps)
      totalSteps.textContent = String(totalSlides).padStart(2, "0");
    if (progressBar)
      progressBar.style.width = `${(currentIndex / totalSlides) * 100}%`;
    if (progressRing) {
      const radius = 16;
      const dashArray = 2 * Math.PI * radius;
      progressRing.style.strokeDashoffset =
        dashArray * (1 - currentIndex / totalSlides);
    }
  }
});



//menu
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const closeMenu = document.querySelector(".close-menu");
  const overlayMenu = document.querySelector(".overlay-menu");
  const body = document.body;

  // Open Menu
  hamburger.addEventListener("click", () => {
    overlayMenu.classList.remove("hidden");
    setTimeout(() => {
      overlayMenu.classList.add("active");
      body.classList.add("menu-open");
    }, 10);
  });

  // Close Menu
  closeMenu.addEventListener("click", () => {
    overlayMenu.classList.remove("active");
    body.classList.remove("menu-open");
    setTimeout(() => {
      overlayMenu.classList.add("hidden");
    }, 300);
  });

  // Close menu when clicking a menu link
  const menuLinks = overlayMenu.querySelectorAll(".menu-list a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      overlayMenu.classList.remove("active");
      body.classList.remove("menu-open");
      setTimeout(() => {
        overlayMenu.classList.add("hidden");
      }, 300);
    });
  });
});

// Select all anchor links starting with "#"

//approch
function initializeApproachSection(approachSection) {
  // Skip if section is already initialized
  if (approachSection.dataset.initialized) {
    console.warn("Approach section already initialized. Skipping...");
    return;
  }

  // Mark section as initialized
  approachSection.dataset.initialized = "true";

  // Find Swiper element within this section
  const swiperElement = approachSection.querySelector(
    ".approach-swiper, .newApproach-swiper"
  );
  if (!swiperElement) {
    console.error("Swiper element not found in approach section.");
    return;
  }

  // Check if Swiper is already initialized
  if (swiperElement.swiper) {
    console.warn("Swiper already initialized on this element. Skipping...");
    return;
  }

  // Initialize Swiper with transition effect
  const approachSwiper = new Swiper(swiperElement, {
    direction: "vertical",
    slidesPerView: 1,
    spaceBetween: 0,
    mousewheel: false, // Disable Swiper's mousewheel control
    speed: 600, // Transition speed in milliseconds
    effect: "fade", // Use fade effect for smooth transitions (or "slide", "cube", etc.)
    fadeEffect: {
      crossFade: true, // Ensures smooth fading between slides
    },
  });

  // Get DOM elements within this section
  const totalSlides = approachSwiper.slides.length;
  const currentSlideNumber = approachSection.querySelector(
    ".current-slide-number"
  );
  const totalSlideNumber = approachSection.querySelector(".total-slide-number");
  const progressBarFill = approachSection.querySelector(
    ".approach-progress-bar-fill"
  );

  // Validate required elements
  if (!currentSlideNumber || !totalSlideNumber || !progressBarFill) {
    console.error(
      "Required elements (current-slide-number, total-slide-number, or progress-bar-fill) not found."
    );
    return;
  }

  // Set the total slide number (e.g., "03")
  totalSlideNumber.textContent = totalSlides.toString().padStart(2, "0");

  // Pin the section and control the Swiper slides with scroll
  ScrollTrigger.create({
    trigger: approachSection,
    start: "top top",
    end: () => `+=${window.innerHeight * (totalSlides - 1)}`,
    pin: true,
    pinSpacing: true,
    scrub: 0.5, // Reduced scrub value for smoother scroll response
    onUpdate: (self) => {
      // Calculate the current slide based on scroll progress
      const progress = self.progress;
      const slideIndex = Math.round(progress * (totalSlides - 1));

      // Smoothly transition to the calculated slide
      approachSwiper.slideTo(slideIndex, 600); // Match transition speed (600ms)

      // Update the current slide number (e.g., "01" to "03")
      currentSlideNumber.textContent = (slideIndex + 1)
        .toString()
        .padStart(2, "0");

      // Update the progress bar height
      progressBarFill.style.height = `${progress * 100}%`;
    },
  });

  // Initialize progress bar height
  progressBarFill.style.height = `${(1 / totalSlides) * 100}%`;
}

// Initialize all .approach sections
document.querySelectorAll(".approach").forEach((section) => {
  initializeApproachSection(section);
});
//twoapprochSwipper
const twoApprochswiper = new Swiper(".twoApprochSwiper", {
  spaceBetween: 16,
  slidesPerView: 1,
  pagination: false,
  navigation: false,
  loop: true,
  autoSlide: {
    delay: 1000,
    disableOnInteraction: false,
  },
});
//twoapprochSwipper
function initializeGlobalApproachSection(globalSection) {
  // Skip if section is already initialized
  if (globalSection.dataset.initialized) {
    console.warn("Global Approach section already initialized. Skipping...");
    return;
  }

  // Mark as initialized
  globalSection.dataset.initialized = "true";

  // Find Swiper inside
  const swiperElement = globalSection.querySelector(".globalsSwiper");
  if (!swiperElement) {
    console.error("globalsSwiper not found inside Global Approach section.");
    return;
  }

  // Check if Swiper already initialized
  if (swiperElement.swiper) {
    console.warn("Swiper already initialized on globalsSwiper. Skipping...");
    return;
  }

  // Initialize Swiper
  const globalsSwiper = new Swiper(swiperElement, {
    direction: "vertical",
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 600,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    allowTouchMove: false,
    mousewheel: false,
  });

  const totalSlides = globalsSwiper.slides.length;

  // ScrollTrigger for controlling the scroll
  ScrollTrigger.create({
    trigger: globalSection,
    start: "top top",
    end: () => `+=${window.innerHeight * (totalSlides - 1)}`,
    pin: true,
    pinSpacing: true,
    scrub: 0.5,
    onUpdate: (self) => {
      const progress = self.progress;
      const slideIndex = Math.min(
        Math.round(progress * (totalSlides - 1)),
        totalSlides - 1
      );
      globalsSwiper.slideTo(slideIndex);
    },
  });
}

// Initialize .globalapproch section
document.querySelectorAll(".globalapproch").forEach((section) => {
  initializeGlobalApproachSection(section);
});

//twoapprochSwipper
const investApprochSwiper = new Swiper(".investApprochSwiper", {
  spaceBetween: 16,
  slidesPerView: 1,
  pagination: false,
  navigation: false,
  loop: true,
  autoSlide: {
    delay: 1000,
    disableOnInteraction: false,
  },
});

// Select all radio inputs
const checkboxInputs = document.querySelectorAll(
  'input[name="my-accordion-group"]'
);

checkboxInputs.forEach((input) => {
  input.addEventListener("change", () => {
    const allAccordions = document.querySelectorAll(".collapse");
    const allIcons = document.querySelectorAll(".icon");
    const allArrows = document.querySelectorAll(".faq-arrow");

    // Reset everything
    allAccordions.forEach((accordion) => {
      accordion.classList.remove("faq-active");
      accordion.classList.add("faq-default");

      // Show all divider borders
      const prevDivider = accordion.previousElementSibling;
      const nextDivider = accordion.nextElementSibling;
      if (prevDivider?.classList.contains("divider-border-line")) {
        prevDivider.style.display = "block";
      }
      if (nextDivider?.classList.contains("divider-border-line")) {
        nextDivider.style.display = "block";
      }
    });

    allIcons.forEach((icon) => {
      icon.classList.remove("ri-arrow-up-long-line");
      icon.classList.add("ri-arrow-down-long-line");
    });

    allArrows.forEach((arrow) => {
      arrow.classList.remove("rotate");
    });

    const parentAccordion = input.closest(".collapse");
    const icon = parentAccordion.querySelector(".icon");
    const arrow = parentAccordion.querySelector(".faq-arrow");

    if (input.checked) {
      parentAccordion.classList.remove("faq-default");
      parentAccordion.classList.add("faq-active");

      if (icon) {
        icon.classList.remove("ri-arrow-down-long-line");
        icon.classList.add("ri-arrow-up-long-line");
      }

      if (arrow) {
        arrow.classList.add("rotate");
      }

      // Hide top and bottom .divider-border-line
      const prevDivider = parentAccordion.previousElementSibling;
      const nextDivider = parentAccordion.nextElementSibling;

      if (prevDivider?.classList.contains("divider-border-line")) {
        prevDivider.style.display = "none";
      }
      if (nextDivider?.classList.contains("divider-border-line")) {
        nextDivider.style.display = "none";
      }
    }

    // Uncheck other inputs
    checkboxInputs.forEach((otherInput) => {
      if (otherInput !== input) {
        otherInput.checked = false;
      }
    });
  });
});

// Nevis Slider
const nevisSwiper = new Swiper(".nevisSwiper", {
  navigation: false,
  slidesPerView: 1.5,
  centeredSlides: true,
  loop: false,
  on: {
    init: function () {
      updateNevisProgress(this);
    },
    slideChange: function () {
      updateNevisProgress(this);
    },
  },
});

function updateNevisProgress(swiper) {
  const totalSlides = swiper.slides.length;
  const currentIndex = swiper.realIndex + 1;
  const progress = (currentIndex / totalSlides) * 100;

  document.querySelector(".current-slide-nevis").textContent = currentIndex
    .toString()
    .padStart(2, "0");
  document.querySelector(".total-slides-nevis").textContent = totalSlides
    .toString()
    .padStart(2, "0");
  document.querySelector(".progress-nevis-fill").style.width = `${progress}%`;
}

// Apply Slider
const applySwiper = new Swiper(".applySwiper", {
  slidesPerView: 1.2,
  navigation: false,
  centeredSlides: true,
  loop: false,
  on: {
    init: function () {
      updateApplyProgress(this);
    },
    slideChange: function () {
      updateApplyProgress(this);
    },
  },
});

function updateApplyProgress(swiper) {
  const totalSlidesApply = swiper.slides.length;
  const currentIndexApply = swiper.realIndex + 1;
  const progressApply = (currentIndexApply / totalSlidesApply) * 100;

  // Updated class names to match the HTML
  document.querySelector(".current-slide-apply").textContent = currentIndexApply
    .toString()
    .padStart(2, "0");
  document.querySelector(".total-slides-apply").textContent = totalSlidesApply
    .toString()
    .padStart(2, "0");
  document.querySelector(
    ".progress-apply-fill"
  ).style.width = `${progressApply}%`;
}

// wow
var wow = new WOW({
  boxClass: "wow", // Class to trigger animations
  animateClass: "animate__animated", // Animation class prefix
  offset: 0, // Default trigger offset
  mobile: true, // Enable animations on mobile
  live: true, // Detect dynamically added elements
});
wow.init();

// After initializing Lenis
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

// Sync ScrollTrigger with Lenis
ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    if (arguments.length) {
      lenis.scrollTo(value, { immediate: true });
    }
    return lenis.scroll;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: "transform",
});

// Update ScrollTrigger on Lenis scroll
lenis.on("scroll", ScrollTrigger.update);

// Animation frame loop
function raf(time) {
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// menuss
function animateIcon(btn) {
  btn.classList.add("rotate-[60deg]");
  setTimeout(() => {
    btn.classList.remove("rotate-[60deg]");
  }, 1500); // 1 second
}

const hamburgerBtn = document.getElementById("hamburgerBtn");
const closeBtn = document.getElementById("closeBtn");

hamburgerBtn.addEventListener("click", () => animateIcon(hamburgerBtn));
closeBtn.addEventListener("click", () => animateIcon(closeBtn));

// Animate lines to the left
gsap.utils.toArray(".hero-line-left").forEach((line) => {
  gsap.to(line, {
    x: -100, // move left
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
});

// Animate lines to the right
gsap.utils.toArray(".hero-line-right").forEach((line) => {
  gsap.to(line, {
    x: 100, // move right
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
});

// JavaScript for smooth header visibility on scroll
// Declare variables once
let prevScrollpos = window.pageYOffset;
const header = document.getElementById("header");

// Initialize header state
header.style.top = "0";
header.classList.remove("blur-bg");

function handleScroll() {
  const currentScrollPos = window.pageYOffset;
  const isMobile = window.innerWidth < 768; // Mobile breakpoint at 768px
  const blurThreshold = isMobile ? 200 : 400; // 200px for mobile, 400px for desktop

  // Show header when scrolling up or at the very top
  if (prevScrollpos >= currentScrollPos || currentScrollPos <= 0) {
    header.style.top = "0";
  } else {
    header.style.top = "-120px";
  }

  // Add/remove blur based on dynamic threshold
  if (currentScrollPos > blurThreshold) {
    header.classList.add("blur-bg");
  } else {
    header.classList.remove("blur-bg");
  }

  prevScrollpos = currentScrollPos;
}

// Throttle scroll event using requestAnimationFrame for smoother updates
let isScrolling = false;
window.onscroll = function () {
  if (!isScrolling) {
    isScrolling = true;
    window.requestAnimationFrame(() => {
      handleScroll();
      isScrolling = false;
    });
  }
};

// Handle window resize to update blur effect
window.addEventListener("resize", handleScroll);

// Textarea auto-resize functionality
const textarea = document.querySelector("textarea");

textarea.addEventListener("input", () => {
  // Reset the height and then set it based on scrollHeight
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
});
///

// Function to adjust the header style based on section's theme class

const headers = document.getElementById("header");
const logo = document.getElementById("logo");
const hamburgerIcon = document.querySelector("#hamburgerBtn i");
const contactUsBtn = document.querySelector(".contact-us");
const separatorLine = document.getElementById("separatorLine");
const sections = document.querySelectorAll("section");

const initialTheme = headers.dataset.initialTheme; // 'light' or 'dark'

function applyInitialStyles() {
  headers.classList.remove("header-light", "header-dark", "header-default");
  if (initialTheme === "light") {
    headers.classList.add("header-light");
    logo.src = "./img/logo.svg";
    hamburgerIcon.classList.remove("text-white");
    hamburgerIcon.classList.add("text-black");
    contactUsBtn.classList.remove(
      "text-white",
      "hover:text-black",
      "hover:bg-white",
      "border-white"
    );
    contactUsBtn.classList.add(
      "text-black",
      "hover:text-white",
      "hover:bg-black",
      "border-black"
    );
    separatorLine.classList.remove("bg-white");
    separatorLine.classList.add("bg-black");
  } else {
    headers.classList.add("header-dark");
    logo.src = "./img/logo-white.svg";
    hamburgerIcon.classList.remove("text-black");
    hamburgerIcon.classList.add("text-white");
    contactUsBtn.classList.remove(
      "text-black",
      "hover:text-white",
      "hover:bg-black",
      "border-black"
    );
    contactUsBtn.classList.add(
      "text-white",
      "hover:text-black",
      "hover:bg-white",
      "border-white"
    );
    separatorLine.classList.remove("bg-black");
    separatorLine.classList.add("bg-white");
  }
}

function changeHeaderStyle() {
  let scrollPos = window.scrollY;
  let isMobile = window.innerWidth <= 768;
  const scrollThreshold = isMobile ? 800 : 800;

  if (scrollPos >= 0 && scrollPos <= scrollThreshold) {
    applyInitialStyles();
    return;
  }

  let activeSection = null;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if (scrollPos >= top && scrollPos < bottom) {
      activeSection = section;
    }
  });

  if (activeSection) {
    headers.classList.remove("header-default", "header-light", "header-dark");
    if (activeSection.classList.contains("light")) {
      headers.classList.add("header-light");
      logo.src = "./img/logo.svg";
      hamburgerIcon.classList.remove("text-white");
      hamburgerIcon.classList.add("text-black");
      contactUsBtn.classList.remove(
        "text-white",
        "hover:text-black",
        "hover:bg-white",
        "border-white"
      );
      contactUsBtn.classList.add(
        "text-black",
        "hover:text-white",
        "hover:bg-black",
        "border-black"
      );
      separatorLine.classList.remove("bg-white");
      separatorLine.classList.add("bg-black");
    } else if (activeSection.classList.contains("dark")) {
      headers.classList.add("header-dark");
      logo.src = "./img/logo-white.svg";
      hamburgerIcon.classList.remove("text-black");
      hamburgerIcon.classList.add("text-white");
      contactUsBtn.classList.remove(
        "text-black",
        "hover:text-white",
        "hover:bg-black",
        "border-black"
      );
      contactUsBtn.classList.add(
        "text-white",
        "hover:text-black",
        "hover:bg-white",
        "border-white"
      );
      separatorLine.classList.remove("bg-black");
      separatorLine.classList.add("bg-white");
    }
  }
}

window.addEventListener("scroll", changeHeaderStyle);
window.addEventListener("resize", changeHeaderStyle);
window.addEventListener("load", changeHeaderStyle);
// group

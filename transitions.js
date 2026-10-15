// Handle page transitions and fade-in animations

document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll("a.nav-link");
  const body = document.body;

  // Function to animate page exit and navigate after
  function animateOut(event) {
    // CHANGED: let Ctrl/Cmd/Shift-clicks open in a new tab as normal
    if (event.metaKey || event.ctrlKey || event.shiftKey) return;
    event.preventDefault();
    const targetHref = this.href;

    // Add exit animation class to body
    body.classList.add("page-exit");

    // Wait for animation to finish, then navigate
    setTimeout(() => {
      window.location.href = targetHref;
    }, 500); // Duration matches CSS transition time
  }

  // Attach click handler to all nav links
  links.forEach((link) => {
    link.addEventListener("click", animateOut);
  });

  // Add fade-in class on page load after short delay
  setTimeout(() => {
    body.classList.add("fade-in");
  }, 50);

  // Fade-in on scroll for elements
  function onScrollFade() {
    const fadeEls = document.querySelectorAll(".fade-in:not(.visible)");
    const windowBottom = window.innerHeight;

    fadeEls.forEach((el) => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < windowBottom - 100) {
        el.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", onScrollFade);
  // Run once on page load in case some elements are already in view
  window.addEventListener("load", onScrollFade);
});

// CHANGED: if someone presses the browser's Back button, remove the exit
// animation so the page doesn't stay faded out
window.addEventListener("pageshow", function () {
  document.body.classList.remove("page-exit");
});

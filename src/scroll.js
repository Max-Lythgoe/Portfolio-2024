const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.project').forEach(project => {
  gsap.fromTo(project, 
    { scale: 0.8, opacity: 0.7 }, 
    { 
      scale: 1, opacity: 1,
      scrollTrigger: {
        trigger: project,
        start: "top 100%",
        end: "top 10%",
        scrub: true
      }
    }
  );

  gsap.fromTo(project, 
    { scale: 1, opacity: 1 }, 
    { 
      scale: 0.8, opacity: 0.7,
      scrollTrigger: {
        trigger: project,
        start: "top 0%",
        end: "top -60%",
        scrub: true
      }
    }
  );
});

document.querySelectorAll('.nav-link, .header-logo').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    lenis.scrollTo(targetElement);
  });
});


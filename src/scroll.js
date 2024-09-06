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

gsap.utils.toArray('.float').forEach(element => {
  gsap.to(element, {
    y: 40,
    scrollTrigger: {
      trigger: element,
      start: "top 80%", 
      end: "top 20%",
      scrub: true
    }
  });

});


gsap.utils.toArray('.fade').forEach(element => {
  gsap.to(element, {
    opacity: 0.3,
    scrollTrigger: {
      trigger: element,
      start: "top 0%", 
      end: "top -60%",   
      scrub: true
    }
  });

});



gsap.fromTo('.about-flex', 
  { opacity: 1 }, 
  { 
    opacity: 0.3,
    scrollTrigger: {
      trigger: ".contact-flex",
      start: "center center", 
      end: "top 20%",
      scrub: true
    }
  }
);







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
    { opacity: 1 }, 
    { 
      opacity: 0.3,
      scrollTrigger: {
        trigger: project,
        start: "top 0%",
        end: "top -60%",
        scrub: true
      }
    }
  );
});

gsap.utils.toArray('.canvas').forEach(canvas => {
  gsap.fromTo(canvas, 
    { opacity: 0.3 }, 
    { 
      opacity: .7,
      scrollTrigger: {
        trigger: canvas,
        start: "top 100%",
        end: "top 10%",
        scrub: true
      }
    }
  );

  gsap.fromTo(canvas, 
    { opacity: .7 }, 
    { 
      opacity: 0.3,
      scrollTrigger: {
        trigger: canvas,
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


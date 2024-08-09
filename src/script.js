//Cursor glow effect
const cursorOffSet = function (e) {
  const rect = this.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  this.style.setProperty("--cursor-x", x + "px");
  this.style.setProperty("--cursor-y", y + "px");
};
document.querySelector("body").addEventListener("mousemove", cursorOffSet);

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const header = document.querySelector(".header-mobile");
  const navLinks = document.querySelectorAll(".header-mobile a");

  // Menu toggle click event
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("menu-open");
    header.classList.toggle("menu-open");
  });

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      header.classList.remove("menu-open");
      menuToggle.classList.remove("menu-open");
    });
  });

  // Check window size and toggle menu visibility
  const checkWindowSize = () => {
    if (window.innerWidth <= 768) {
      menuToggle.classList.add("active");
    } else {
      menuToggle.classList.remove("active");
    }
  };

  // Initial check and event listeners
  checkWindowSize();
  window.addEventListener("resize", checkWindowSize);

  // Scroll event for menu toggle
  window.addEventListener("scroll", () => {
    if (window.innerWidth > 768) {
      if (window.scrollY > 200) {
        menuToggle.classList.add("active");
      } else {
        menuToggle.classList.remove("active");
      }
    }
  });
});






// pac man mode
// document.getElementById("pac-man").addEventListener("click", function(){
//   document.body.classList.toggle("pac-man-mode");
// });

// video blur overlay
class VideoWithBackground {
  constructor(videoIds, canvasIds) {
    this.videos = videoIds.map(id => document.getElementById(id));
    this.canvases = canvasIds.map(id => document.getElementById(id));
    this.steps = [];
    this.ctxs = [];
    this.posterImages = [];

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!mediaQuery.matches) {
      window.addEventListener("load", this.init, false);
      window.addEventListener("unload", this.cleanup, false);
    }
  }

  draw = (index) => {
    this.ctxs[index].drawImage(this.videos[index], 0, 0, this.canvases[index].width, this.canvases[index].height);
  };

  drawLoop = (index) => {
    this.draw(index);
    this.steps[index] = window.requestAnimationFrame(() => this.drawLoop(index));
  };

  drawPause = (index) => {
    window.cancelAnimationFrame(this.steps[index]);
    this.steps[index] = undefined;
  };

  drawPoster = (index) => {
    if (this.posterImages[index].complete) {
      this.ctxs[index].drawImage(this.posterImages[index], 0, 0, this.canvases[index].width, this.canvases[index].height);
    } else {
      this.posterImages[index].onload = () => {
        this.ctxs[index].drawImage(this.posterImages[index], 0, 0, this.canvases[index].width, this.canvases[index].height);
      };
    }
  };

  init = () => {
    this.videos.forEach((video, index) => {
      this.ctxs[index] = this.canvases[index].getContext("2d");
      this.ctxs[index].filter = "blur(1px)";

      this.posterImages[index] = new Image();
      this.posterImages[index].src = video.getAttribute("poster");

      video.addEventListener("loadeddata", () => this.draw(index), false);
      video.addEventListener("seeked", () => this.draw(index), false);
      video.addEventListener("play", () => this.drawLoop(index), false);
      video.addEventListener("pause", () => this.drawPause(index), false);
      video.addEventListener("ended", () => this.drawPause(index), false);

      this.drawPoster(index);
    });
  };

  cleanup = () => {
    this.videos.forEach((video, index) => {
      video.removeEventListener("loadeddata", () => this.draw(index));
      video.removeEventListener("seeked", () => this.draw(index));
      video.removeEventListener("play", () => this.drawLoop(index));
      video.removeEventListener("pause", () => this.drawPause(index));
      video.removeEventListener("ended", () => this.drawPause(index));
    });
  };
}

const videoIds = ["js-video-1", "js-video-2"];
const canvasIds = ["js-canvas-1", "js-canvas-2"];
const el = new VideoWithBackground(videoIds, canvasIds);




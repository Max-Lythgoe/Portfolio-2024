//Cursor glow effect
if (window.innerWidth > 768) {
  const cursorOffSet = function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.style.setProperty("--cursor-x", x + "px");
    this.style.setProperty("--cursor-y", y + "px");
  };
  document.querySelector("body").addEventListener("mousemove", cursorOffSet);
}



// Menu
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const header = document.querySelector(".header-mobile");
  const navLinks = document.querySelectorAll(".header-mobile a");

  const toggleMenu = () => {
    menuToggle.classList.toggle("menu-open");
    header.classList.toggle("menu-open");
  };

  menuToggle.addEventListener("click", toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      header.classList.remove("menu-open");
      menuToggle.classList.remove("menu-open");
    });
  });

  const checkWindowSize = () => {
    menuToggle.classList.toggle("active", window.innerWidth <= 768);
  };

  checkWindowSize();
  window.addEventListener("resize", checkWindowSize);

  window.addEventListener("scroll", () => {
    if (window.innerWidth > 768) {
      menuToggle.classList.toggle("active", window.scrollY > 200);
    }
  });
});

// Video blur overlay
class VideoWithBackground {
  constructor(videoIds, canvasIds) {
    this.videos = videoIds.map(id => document.getElementById(id));
    this.canvases = canvasIds.map(id => document.getElementById(id));
    this.steps = [];
    this.ctxs = [];
    this.posterImages = [];

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!mediaQuery.matches) {
      window.addEventListener("load", this.init.bind(this), false);
      window.addEventListener("pagehide", this.cleanup.bind(this), false);
    }
  }

  draw(index) {
    this.ctxs[index].drawImage(this.videos[index], 0, 0, this.canvases[index].width, this.canvases[index].height);
  }

  drawLoop(index) {
    this.draw(index);
    this.steps[index] = window.requestAnimationFrame(() => this.drawLoop(index));
  }

  drawPause(index) {
    window.cancelAnimationFrame(this.steps[index]);
    this.steps[index] = undefined;
  }

  drawPoster(index) {
    if (this.posterImages[index].complete) {
      this.ctxs[index].drawImage(this.posterImages[index], 0, 0, this.canvases[index].width, this.canvases[index].height);
    } else {
      this.posterImages[index].onload = () => {
        this.ctxs[index].drawImage(this.posterImages[index], 0, 0, this.canvases[index].width, this.canvases[index].height);
      };
    }
  }

  init() {
    this.videos.forEach((video, index) => {
      this.ctxs[index] = this.canvases[index].getContext("2d");
      this.ctxs[index].filter = "blur(1px)";
      this.ctxs[index].webkitFilter = "blur(1px)";

      this.posterImages[index] = new Image();
      this.posterImages[index].src = video.getAttribute("poster");

      video.addEventListener("loadeddata", () => this.draw(index), false);
      video.addEventListener("seeked", () => this.draw(index), false);
      video.addEventListener("play", () => this.drawLoop(index), false);
      video.addEventListener("pause", () => this.drawPause(index), false);
      video.addEventListener("ended", () => this.drawPause(index), false);

      this.drawPoster(index);
    });
  }

  cleanup() {
    this.videos.forEach((video, index) => {
      video.removeEventListener("loadeddata", () => this.draw(index));
      video.removeEventListener("seeked", () => this.draw(index));
      video.removeEventListener("play", () => this.drawLoop(index));
      video.removeEventListener("pause", () => this.drawPause(index));
      video.removeEventListener("ended", () => this.drawPause(index));
    });
  }
}

const videoIds = ["js-video-1", "js-video-2", "js-video-3", "js-video-4"];
const canvasIds = ["js-canvas-1", "js-canvas-2", "js-canvas-3", "js-canvas-4"];
const el = new VideoWithBackground(videoIds, canvasIds);

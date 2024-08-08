document.getElementById("pac-man").addEventListener("click", function(){
  document.body.classList.toggle("pac-man-mode");
});

class VideoWithBackground {
  video;
  canvas;
  step;
  ctx;
  posterImage;

  constructor(videoId, canvasId) {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!mediaQuery.matches) {
      this.video = document.getElementById(videoId);
      this.canvas = document.getElementById(canvasId);

      window.addEventListener("load", this.init, false);
      window.addEventListener("unload", this.cleanup, false);
    }
  }

  draw = () => {
    this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
  };

  drawLoop = () => {
    this.draw();
    this.step = window.requestAnimationFrame(this.drawLoop);
  };

  drawPause = () => {
    window.cancelAnimationFrame(this.step);
    this.step = undefined;
  };

  drawPoster = () => {
    if (this.posterImage.complete) {
      this.ctx.drawImage(this.posterImage, 0, 0, this.canvas.width, this.canvas.height);
    } else {
      this.posterImage.onload = () => {
        this.ctx.drawImage(this.posterImage, 0, 0, this.canvas.width, this.canvas.height);
      };
    }
  };

  init = () => {
    this.ctx = this.canvas.getContext("2d");
    this.ctx.filter = "blur(1px)";

    this.posterImage = new Image();
    this.posterImage.src = this.video.getAttribute("poster");

    this.video.addEventListener("loadeddata", this.draw, false);
    this.video.addEventListener("seeked", this.draw, false);
    this.video.addEventListener("play", this.drawLoop, false);
    this.video.addEventListener("pause", this.drawPause, false);
    this.video.addEventListener("ended", this.drawPause, false);

    // Draw the poster image if the video has not started playing yet
    this.drawPoster();
  };

  cleanup = () => {
    this.video.removeEventListener("loadeddata", this.draw);
    this.video.removeEventListener("seeked", this.draw);
    this.video.removeEventListener("play", this.drawLoop);
    this.video.removeEventListener("pause", this.drawPause);
    this.video.removeEventListener("ended", this.drawPause);
  };
}

const el = new VideoWithBackground("js-video", "js-canvas");

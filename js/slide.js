export default class Slide {
  constructor() {
    this.slide = document.querySelector(".slide");
    this.wrapper = document.querySelector(".wrapper");
    this.dist = {
      finalPosition: 0,
      distX: 0,
      movement: 0,
      movePosition: 0,
    };
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  onStart(event) {
    let movetype;
    if (event.type === "mousedown") {
      event.preventDefault();
      this.dist.distX = event.pageX;
      movetype = "mousemove";
    } else {
      this.dist.distX = event.changedTouches[0].clientX;
      movetype = "touchmove";
    }
    this.wrapper.addEventListener(movetype, this.onMove);
  }

  moveSlide(distX) {
    this.slide.style.transform = "translate3d(" + distX + "px, 0px, 0px) ";
    this.dist.movePosition = distX;
  }

  attPosicao(pageX) {
    const posicaoFinal = (this.dist.distX - pageX) * 1.6;
    return this.dist.finalPosition - posicaoFinal;
  }

  onMove(event) {
    let posicao;
    if (event.type === "mousemove") {
      posicao = event.pageX;
    } else {
      posicao = event.changedTouches[0].clientX;
    }
    const positionFinal = this.attPosicao(posicao);
    this.moveSlide(positionFinal);
  }

  addEventSlide() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
    this.wrapper.addEventListener("touchstart", this.onStart);
    this.wrapper.addEventListener("touchend", this.onEnd);
  }

  onEnd(event) {
    let movimento;
    if (event.type === "mouseup") {
      this.wrapper.removeEventListener("mousemove", this.onMove);
    } else {
      this.wrapper.removeEventListener("touchmove", this.onMove);
    }
    this.dist.finalPosition = this.dist.movePosition;
  }

  init() {
    this.addEventSlide();
    return this;
  }
}

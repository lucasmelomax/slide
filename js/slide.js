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
    event.preventDefault();
    this.wrapper.addEventListener("mousemove", this.onMove);
    this.dist.distX = event.pageX;
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
    const posicao = this.attPosicao(event.pageX);
    this.moveSlide(posicao);
  }

  addEventSlide() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
  }

  onEnd() {
    this.wrapper.removeEventListener("mousemove", this.onMove);
    this.dist.finalPosition = this.dist.movePosition;
  }

  init() {
    this.addEventSlide();
    return this;
  }
}

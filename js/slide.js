export default class Slide {
  constructor() {
    this.slide = document.querySelector(".slide");
    this.wrapper = document.querySelector(".wrapper");
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  onStart(event) {
    event.preventDefault();
    this.wrapper.addEventListener("mousemove", this.onMove);
  }

  onMove(event){

  }

  onEnd(){
    this.wrapper.removeEventListener("mousemove", this.onMove);
  }

  addEventSlide() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("mouseup", this.onEnd);
  }

  init(){
    this.addEventSlide();
    return this;
  }
}
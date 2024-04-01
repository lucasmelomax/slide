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
    this.onResize = this.onResize.bind(this);
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
    this.transitionSlide(false);
  }

  moveSlide(distX) {
    this.slide.style.transform = "translate3d(" + distX + "px, 0px, 0px) ";
    this.dist.movePosition = distX;
  }

  attPosicao(pageX) {
    this.dist.movement = (this.dist.distX - pageX) * 1.6;
    return this.dist.finalPosition - this.dist.movement;
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
    this.transitionSlide(true);
    this.changeSlideOnEnd();
  }

  posicaoSlide(itemm) {
    const margin = (this.wrapper.offsetWidth - itemm.offsetWidth) / 2;
    return -(itemm.offsetLeft - margin);
  }

  slideConfig() {
    this.arraySlide = Array.from(this.slide.children).map((item) => {
      const posicao = this.posicaoSlide(item);
      return {
        item,
        posicao,
      };
    });
  }

  slideNav(index) {
    const ultimo = this.arraySlide.length - 1;
    this.indexNav = {
      anterior: index ? index - 1 : undefined,
      atual: index,
      proximo: index === ultimo ? undefined : index + 1,
    };
  }

  changeSlide(index) {
    this.moveSlide(this.arraySlide[index].posicao);
    this.slideNav(index);
    this.dist.finalPosition = this.arraySlide[index].posicao;
    this.addAtivo();
  }

  changeSlideOnEnd() {
    if (this.dist.movement > 180 && this.indexNav.proximo !== undefined) {
      this.ativarProxSlide();
    } else if (
      this.dist.movement < -180 &&
      this.indexNav.anterior !== undefined
    ) {
      this.ativarAntSlide();
    } else {
      this.changeSlide(this.indexNav.atual);
    }
  }

  transitionSlide(ativo) {
    this.slide.style.transition = ativo ? "0.5s" : "";
  }

  addAtivo() {
    this.arraySlide.forEach((itemm) => {
      itemm.item.classList.remove("ativo");
    });
    this.arraySlide[this.indexNav.atual].item.classList.add("ativo");
  }

  ativarProxSlide() {
    if (this.indexNav.proximo !== undefined) {
      this.changeSlide(this.indexNav.proximo);
    }
  }

  ativarAntSlide() {
    if (this.indexNav.anterior !== undefined) {
      this.changeSlide(this.indexNav.anterior);
    }
  }

  onResize() {
    setTimeout(() => {
      this.slideConfig();
      this.changeSlide(this.indexNav.atual);
    }, 1000);
  }

  addRezise() {
    window.addEventListener("resize", this.onResize);
  }

  init() {
    this.addEventSlide();
    this.transitionSlide(true);
    this.slideConfig();
    this.addRezise();
    return this;
  }
}

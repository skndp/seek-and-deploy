import { defineStore } from 'pinia';

export const useSiteStore = defineStore('site', {
  state: () => ({
    initialSlide: true,
    changingSlides: false,
    slideIndex: 0,
    slidePrevState: '',
    slideActiveState: 'slide-0-active',
    slideNextState: ''
  }),
  actions: {
    setInitialSlide(s) {
    	this.initialSlide = s;
    },
    setChangingSlides(s) {
    	this.changingSlides = s;
    },
    setSlideIndex(s) {
    	this.slideIndex = s;
    },
    setSlidePrevState(s) {
    	this.slidePrevState = s;
    },
    setSlideActiveState(s) {
    	this.slideActiveState = s;
    },
    setSlideNextState(s) {
    	this.slideNextState = s;
    }
  }
})

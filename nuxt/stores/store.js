import { defineStore } from 'pinia';

export const useSiteStore = defineStore('site', {
  state: () => ({
    introSlide: true,
    changingSlides: false,
    slideIndex: 0,
    slidePrevState: '',
    slideActiveState: 'slide-0-active',
    slideNextState: '',
    titleSlideMsg: 'We fight for the user.'
  }),
  actions: {
    setIntroSlide(s) {
    	this.introSlide = s;
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
    },
    setTitleSlideMsg(t) {
      this.titleSlideMsg = t;
    }
  }
})

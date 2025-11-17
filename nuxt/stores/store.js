import { defineStore } from 'pinia';

export const useSiteStore = defineStore('site', {
  state: () => ({
    introSlide: true,
    titleSlideMsg: 'We fight for the user.',
    slidePrevState: '',
    slideActiveState: 'slide-0-active',
    slideNextState: ''
  }),
  actions: {
    setIntroSlide(s) {
    	this.introSlide = s;
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

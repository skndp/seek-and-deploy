import { defineStore } from 'pinia';

export const useSiteStore = defineStore('site', {
  state: () => ({
    accessibility: false,
    loading: true,
    menuOpen: false,
    titleSlideMsg: 'We fight for the user.',
    slidePrevState: '',
    slideActiveState: 'slide-0-active',
    slideNextState: ''
  }),
  actions: {
    setLoaderComplete() {
      this.loading = false;
    },
    setMenu(bool) {
      this.menuOpen = bool;
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
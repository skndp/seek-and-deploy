import { defineStore } from 'pinia';

export const useSiteStore = defineStore('site', {
  state: () => ({
    accessibility: false,
    loading: true,
    menuOpen: false,
    titleSlideMsg: 'We fight for the user.',
    slideNum: 0
  }),
  actions: {
    setLoaderComplete() {
      this.loading = false;
    },
    setMenu(bool) {
      this.menuOpen = bool;
    },
    setSlideNum(n) {
    	this.slideNum = n;
    },
    setTitleSlideMsg(t) {
      this.titleSlideMsg = t;
    }
  }
})
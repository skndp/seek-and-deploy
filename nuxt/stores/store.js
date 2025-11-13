import { defineStore } from 'pinia';

export const useSiteStore = defineStore('site', {
  state: () => ({
    accessibility: false,
    loading: true,
    menuOpen: false,
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
    }
  }
})
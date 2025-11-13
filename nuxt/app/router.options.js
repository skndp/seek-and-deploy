export default {
	scrollBehavior() {
		if ('scrollRestoration' in history) {
				history.scrollRestoration = 'manual';
		}

		return { top: 0, left: 0 };
	}
};
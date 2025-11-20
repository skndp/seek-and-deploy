export default defineNuxtPlugin(() => {
  if (typeof window === 'undefined') return

  ;(function () {
    if (typeof window.CustomEvent === 'function') return
    function CustomEventPoly(type: string, params?: any) {
      params = params || { bubbles: false, cancelable: false, detail: null }
      const e = document.createEvent('CustomEvent')
      e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail)
      return e
    }
    CustomEventPoly.prototype = window.Event.prototype
    // @ts-ignore
    window.CustomEvent = CustomEventPoly
  })()

  const SNAP_TOLERANCE = 3
  const SETTLE_DELAY = 120

  let snapTargets: { el: Element; pos: number }[] = []
  let snapPositions: number[] = []
  let rafId: number | null = null
  let settleTimer: any = null
  let activeIndex = -1
  let lastFiredChange = -1
  let firedSlideExit: Record<number, boolean> = {}

  function computeSnapTargets() {
    snapTargets = []
    snapPositions = []
    firedSlideExit = {}

    const all = document.querySelectorAll('*')
    all.forEach((el) => {
      const cs = getComputedStyle(el)
      const align = cs.scrollSnapAlign
      if (!align || align === 'none') return

      const rect = el.getBoundingClientRect()
      if (rect.width === 0 && rect.height === 0) return

      const vAlign = /center|end/.test(align)
        ? align.match(/center|end/)![0]
        : 'start'

      const pos =
        vAlign === 'center'
          ? rect.top + window.scrollY + rect.height / 2
          : vAlign === 'end'
          ? rect.top + window.scrollY + rect.height
          : rect.top + window.scrollY

      snapTargets.push({ el, pos: Math.round(pos) })
    })

    snapTargets.sort((a, b) => a.pos - b.pos)
    snapPositions = snapTargets.map((t) => t.pos)
  }

  computeSnapTargets()

  function nearestIndex(y: number) {
    let best = -1,
      bestDist = Infinity
    for (let i = 0; i < snapPositions.length; i++) {
      const d = Math.abs(snapPositions[i] - y)
      if (d < bestDist) {
        bestDist = d
        best = i
      }
    }
    return best
  }

  function maybeFireSnapChanging(currentIndex: number, nextIndex: number) {
    if (currentIndex < 0 || firedSlideExit[currentIndex]) return

    const rect = snapTargets[currentIndex].el.getBoundingClientRect()
    const viewportHeight = window.innerHeight

    const visibleHeight =
      Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)

    const visibilityRatio = visibleHeight / rect.height

    if (visibilityRatio < 0.5) {
      firedSlideExit[currentIndex] = true

      const nextTarget =
        nextIndex >= 0 && snapTargets[nextIndex]
          ? snapTargets[nextIndex].el
          : snapTargets[currentIndex].el

      window.dispatchEvent(
        new CustomEvent('sd_snapchanging', {
          detail: {
            index: currentIndex,
            target: nextTarget,
          },
        })
      )
    }
  }

  function fireSnapChange(index: number) {
    if (index < 0) return
    window.dispatchEvent(
      new CustomEvent('sd_snapchange', {
        detail: {
          index,
          target: snapTargets[index].el,
        },
      })
    )
    lastFiredChange = index
    firedSlideExit[index] = false
  }

  function onRaf() {
    rafId = null
    const y = window.scrollY || window.pageYOffset
    const nearest = nearestIndex(y)

    if (nearest !== activeIndex) {
      maybeFireSnapChanging(activeIndex, nearest)
      activeIndex = nearest
    }
  }

  function scheduleRaf() {
    if (rafId == null) rafId = requestAnimationFrame(onRaf)
  }

  function onScroll() {
    scheduleRaf()
    clearTimeout(settleTimer)

    settleTimer = setTimeout(() => {
      const y = window.scrollY || window.pageYOffset
      const nearest = nearestIndex(y)
      if (nearest >= 0) {
        const dist = Math.abs(snapPositions[nearest] - y)
        if (dist <= SNAP_TOLERANCE && nearest !== lastFiredChange) {
          fireSnapChange(nearest)
        }
      }
    }, SETTLE_DELAY)
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', computeSnapTargets, { passive: true })
  window.addEventListener('orientationchange', computeSnapTargets, {
    passive: true,
  })
})
import type { Ref } from 'vue'

/** Match each navigation item's foreground to the painted surface directly behind it. */
export function useNavigationContrast(navigation: Readonly<Ref<HTMLElement | null>>) {
  const onColor = shallowRef<ReadonlySet<string>>(new Set())
  let cleanup = () => {}

  onMounted(() => {
    const root = navigation.value
    if (!root) return

    let frame = 0
    const transitions = new Set<HTMLElement>()
    const controller = new AbortController()
    const listenerOptions = { passive: true, signal: controller.signal }

    function contains(rect: DOMRect, x: number, y: number) {
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
    }

    function update() {
      frame = 0
      if (!root) return
      const navRect = root.getBoundingClientRect()
      const backdrops = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-backdrop]'))
        .flatMap((element) => {
          const rect = element.getBoundingClientRect()
          if (rect.bottom < navRect.top || rect.top > navRect.bottom || rect.right < navRect.left || rect.left > navRect.right) return []
          // Follow the actual fade, including the reverse transition after pointer leave.
          if (Number(getComputedStyle(element, '::before').opacity) < 0.55) return []
          const lightAreas = Array.from(element.querySelectorAll<HTMLElement>('[data-nav-backdrop-ignore]'), image => image.getBoundingClientRect())
          return [{ rect, lightAreas }]
        })

      const next = new Set<string>()
      for (const item of root.querySelectorAll<HTMLElement>('[data-nav-item]')) {
        const rect = item.getBoundingClientRect()
        const x = rect.left + rect.width / 2
        const y = rect.top + rect.height / 2
        if (backdrops.some(backdrop => contains(backdrop.rect, x, y) && !backdrop.lightAreas.some(area => contains(area, x, y)))) {
          next.add(item.dataset.navItem!)
        }
      }
      if (next.size !== onColor.value.size || [...next].some(key => !onColor.value.has(key))) {
        onColor.value = next
      }

      for (const element of transitions) {
        if (!element.isConnected) transitions.delete(element)
      }
      if (transitions.size) schedule()
    }

    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    function trackTransition(event: TransitionEvent) {
      const element = event.target
      if (event.propertyName !== 'opacity' || event.pseudoElement !== '::before' || !(element instanceof HTMLElement) || !element.hasAttribute('data-nav-backdrop')) return
      if (event.type === 'transitionrun') transitions.add(element)
      else transitions.delete(element)
      schedule()
    }

    window.addEventListener('scroll', schedule, listenerOptions)
    window.addEventListener('resize', schedule, listenerOptions)
    document.addEventListener('pointerover', schedule, listenerOptions)
    document.addEventListener('pointerout', schedule, listenerOptions)
    document.addEventListener('focusin', schedule, listenerOptions)
    document.addEventListener('focusout', schedule, listenerOptions)
    document.addEventListener('transitionrun', trackTransition, listenerOptions)
    document.addEventListener('transitionend', trackTransition, listenerOptions)
    document.addEventListener('transitioncancel', trackTransition, listenerOptions)

    const resizeObserver = new ResizeObserver(schedule)
    resizeObserver.observe(root)
    resizeObserver.observe(document.body)
    schedule()

    cleanup = () => {
      controller.abort()
      resizeObserver.disconnect()
      window.cancelAnimationFrame(frame)
      transitions.clear()
    }
  })

  onBeforeUnmount(() => cleanup())
  return readonly(onColor)
}

/**
 * Composable to track which element from an array of refs is visible in the viewport
 * using IntersectionObserver.
 *
 * @param {Object} props - The props object
 * @param {Ref<HTMLElement | null>[]} props.refs - Array of refs to observe
 * @param {IntersectionObserverInit} [props.options] - Optional IntersectionObserver options
 *
 * @returns {Object} Returns an object containing:
 * - visibleElement: Readonly ref containing the ID of the currently visible element
 * - isElementVisible: Function to check if a specific element ID is currently visible
 *
 * @example
 * ```ts
 * const section1 = ref<HTMLElement | null>(null);
 * const section2 = ref<HTMLElement | null>(null);
 *
 * const { visibleElement, isElementVisible } = useIsVisible({
 *   refs: [section1, section2],
 *   options: { threshold: 0.5 }
 * });
 *
 * *** Check if specific section is visible ***
 * const isSection1Visible = computed(() => isElementVisible('section1'));
 * ```
 */
interface UseIsVisibleProps {
  refs: Ref<HTMLElement | null>[];
  options?: IntersectionObserverInit;
}

export const useIsVisible = ({ refs, options = {} }: UseIsVisibleProps) => {
  const visibleElement = ref<string | null>(null);
  let observer: IntersectionObserver | null = null;

  const defaultOptions: IntersectionObserverInit = {
    threshold: [0, 0.25, 0.5, 0.75, 1],
    rootMargin: "-45% 0px -45% 0px",
    ...options,
  };

  const setupObserver = () => {
    if (typeof window === "undefined") return;

    observer = new IntersectionObserver((entries) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);

      if (visibleEntries.length > 0) {
        const mostCentralEntry = visibleEntries.reduce((prev, current) => {
          const prevDistance = getDistanceFromCenter(prev.target);
          const currentDistance = getDistanceFromCenter(current.target);
          return currentDistance < prevDistance ? current : prev;
        });

        visibleElement.value = mostCentralEntry.target.id;
      }
    }, defaultOptions);
  };

  const getDistanceFromCenter = (element: Element): number => {
    const rect = element.getBoundingClientRect();
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = window.innerHeight / 2;
    return Math.abs(elementCenter - viewportCenter);
  };

  const observeElements = () => {
    if (!observer) return;

    refs.forEach((ref) => {
      if (ref.value && ref.value.id) {
        observer?.observe(ref.value);
      } else {
        console.warn("Element ref is missing or has no id attribute");
      }
    });
  };

  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    visibleElement.value = null;
  };

  onMounted(() => {
    setupObserver();
    observeElements();
  });

  onUnmounted(() => {
    cleanup();
  });

  // Helper
  const isElementVisible = (id: string) => visibleElement.value === id;

  return {
    visibleElement: readonly(visibleElement),
    isElementVisible,
  };
};

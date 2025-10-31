/**
 * Composable to detect the device capabilities and adjust the render quality.
 * Adjust the render quality of Three.js according to the available capabilities.
 *
 * @returns {Object} Object with detection flags and recommended configuration
 */
export const useDeviceCapabilities = () => {
  const isMobile = ref(false);
  const isTablet = ref(false);
  const isLowEnd = ref(false);
  const shouldReduceQuality = ref(false);
  const gpuInfo = ref<{
    vendor: string;
    renderer: string;
    isIntegrated: boolean;
  } | null>(null);

  const detectDeviceType = () => {
    if (typeof window === "undefined") return;

    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileUA =
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent
      );
    const isTabletUA = /ipad|android(?!.*mobile)/i.test(userAgent);

    const width = window.innerWidth;
    const mobileBreakpoint = 768;
    const tabletBreakpoint = 1024;

    isMobile.value = isMobileUA || (width < mobileBreakpoint && !isTabletUA);
    isTablet.value =
      isTabletUA || (width >= mobileBreakpoint && width < tabletBreakpoint);
  };

  const detectGPU = () => {
    if (typeof window === "undefined") return;

    try {
      const canvas = document.createElement("canvas");
      const glContext =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

      if (!glContext) {
        isLowEnd.value = true;
        shouldReduceQuality.value = true;
        return;
      }

      const gl = glContext as WebGLRenderingContext;

      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      if (debugInfo) {
        const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);

        gpuInfo.value = {
          vendor,
          renderer,
          isIntegrated: false,
        };

        const rendererLower = renderer.toLowerCase();
        const vendorLower = vendor.toLowerCase();

        const isIntegratedGPU =
          rendererLower.includes("intel") ||
          rendererLower.includes("integrated") ||
          rendererLower.includes("mali") ||
          rendererLower.includes("adreno") ||
          rendererLower.includes("powerVR") ||
          rendererLower.includes("apple m") ||
          vendorLower.includes("intel") ||
          vendorLower.includes("arm");

        // Consider weak GPU if it has little texture memory
        const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        const isWeakGPU = maxTextureSize < 4096;

        gpuInfo.value.isIntegrated = isIntegratedGPU;
        isLowEnd.value = isIntegratedGPU || isWeakGPU;
      } else {
        isLowEnd.value = isMobile.value || isTablet.value;
      }
    } catch (error) {
      console.warn("Error detecting GPU:", error);
      isLowEnd.value = true;
    }
  };

  const determineQualityReduction = () => {
    shouldReduceQuality.value =
      isMobile.value || isTablet.value || isLowEnd.value;
  };

  const getRecommendedConfig = computed(() => {
    return {
      multisampling: shouldReduceQuality.value ? 0 : 8,
      pixelRatio: shouldReduceQuality.value
        ? Math.min(window.devicePixelRatio || 1, 1.5)
        : Math.min(window.devicePixelRatio || 1, 2),
      shadows: !shouldReduceQuality.value,
      useAdvancedPostProcessing: !shouldReduceQuality.value,
      instanceCount: shouldReduceQuality.value
        ? isMobile.value
          ? 800
          : 2000
        : 2000,
      useComplexMaterials: !shouldReduceQuality.value,
    };
  });

  onMounted(() => {
    detectDeviceType();
    detectGPU();
    determineQualityReduction();

    window.addEventListener("resize", () => {
      detectDeviceType();
      determineQualityReduction();
    });
  });

  return {
    isMobile: readonly(isMobile),
    isTablet: readonly(isTablet),
    isLowEnd: readonly(isLowEnd),
    shouldReduceQuality: readonly(shouldReduceQuality),
    gpuInfo: readonly(gpuInfo),
    recommendedConfig: getRecommendedConfig,
  };
};

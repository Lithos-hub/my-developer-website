<template>
  <canvas ref="canvas" class="white-noise-canvas" />
</template>

<script setup lang="ts">
const canvas = useTemplateRef<HTMLCanvasElement | null>("canvas");

onMounted(() => {
  if (canvas.value) {
    const context = canvas.value.getContext("2d");
    if (!context) return;

    const { offsetHeight, offsetWidth } = canvas.value;
    canvas.value.width = offsetWidth;
    canvas.value.height = offsetHeight;

    const idata = context.createImageData(offsetWidth, offsetHeight);
    const buffer = new Uint32Array(idata.data.buffer);

    function noise(ctx: CanvasRenderingContext2D) {
      let len = buffer.length - 1;
      while (len--) buffer[len] = Math.random() < 0.5 ? 0 : -1 >> 0;
      ctx.putImageData(idata, 0, 0);
    }

    (function loop() {
      noise(context);
      requestAnimationFrame(loop);
    })();
  }
});
</script>

<style lang="scss" scoped>
.white-noise-canvas {
  @apply fixed left-0 top-0 z-0 h-screen w-screen opacity-5 mix-blend-luminosity;
}
</style>

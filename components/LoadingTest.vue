<template>
  <FadeTransition>
    <svg v-if="loading" viewBox="0 0 1320 300">
      <text x="50%" y="50%" dy=".35em" text-anchor="middle">manbalboy</text>
    </svg>
  </FadeTransition>
</template>

<script>
  import { FadeTransition } from 'vue2-transitions';
  export default {
    name: 'LoadingTest.vue',
    components: {
      FadeTransition,
    },

    data: () => ({
      loading: false,
    }),
    methods: {
      start() {
        this.loading = true;
      },
      finish() {
        this.loading = false;
      },
    },
  };
</script>

<style scoped>
  body {
    background: #e3f2fd;
  }

  svg {
    z-index: 1000;
    font-family: 'Russo One', sans-serif;
    position: absolute;
    width: 100%;
    height: 100%;
  }
  svg text {
    text-transform: uppercase;
    animation: stroke 5s infinite alternate;
    stroke-width: 2;
    stroke: #0022ff;
    font-size: 140px;
  }
  @keyframes stroke {
    0% {
      fill: rgba(72, 138, 20, 0);
      stroke: rgb(54, 75, 160);
      stroke-dashoffset: 25%;
      stroke-dasharray: 0 50%;
      stroke-width: 2;
    }
    70% {
      fill: rgba(72, 138, 20, 0);
      stroke: rgb(54, 79, 160);
    }
    80% {
      fill: rgba(72, 138, 20, 0);
      stroke: rgb(54, 75, 160);
      stroke-width: 3;
    }
    100% {
      fill: rgb(72, 109, 204);
      stroke: rgba(54, 95, 160, 0);
      stroke-dashoffset: -25%;
      stroke-dasharray: 50% 0;
      stroke-width: 0;
    }
  }
</style>

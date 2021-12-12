<template>
  <span>{{ animatedNumber }}</span>
</template>
<script>
  // - [tween.js](https://github.com/tweenjs/tween.js/)
  import TWEEN from 'tween.js';

  export default {
    name: 'AnimatedNumber',
    props: {
      /**
       * 도달할 값
       */
      value: {
        type: Number,
        default: 0,
      },
      /**
       * 이동 시간 ms
       */
      duration: {
        type: Number,
        default: 500,
      },
    },
    data() {
      return {
        animatedNumber: 0,
      };
    },
    watch: {
      value(newValue, oldValue) {
        this.initAnimation(newValue, oldValue);
      },
    },
    mounted() {
      this.initAnimation(this.value, 0);
    },
    methods: {
      initAnimation(newValue, oldValue) {
        const vm = this;

        function animate() {
          if (TWEEN.update()) {
            requestAnimationFrame(animate);
          }
        }

        new TWEEN.Tween({ tweeningNumber: oldValue })
          .easing(TWEEN.Easing.Quadratic.Out)
          .to({ tweeningNumber: newValue }, this.duration)
          .onUpdate(function () {
            vm.animatedNumber = this.tweeningNumber.toFixed(0);
          })
          .start();

        animate();
      },
    },
  };
</script>
<style></style>

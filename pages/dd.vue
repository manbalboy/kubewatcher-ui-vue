<template>
  <div>
    test
    <img src="test/test/test.png" alt="" />
  </div>
</template>

<script>
  export default {
    name: 'Dd',
    created() {
      const LOG_LEVELS = {
        error: 0,
        alert: 1,
        access: 2,
        warn: 3,
        info: 4,
        debug: 5,
      };

      for (const level in LOG_LEVELS) {
        this.$logger[level](`Hello nuxt-logger-winston !!!  log level : ${level}`);
      }
    },
  };
</script>

<style scoped></style>

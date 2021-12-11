<template>
  <div class="bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-animate" :class="switchClass">
    <div class="bootstrap-switch-container" @click="triggerToggle()">
      <span class="bootstrap-switch-handle-on">
        <slot v-if="onText || $slots.on" name="on"> {{ onText }} </slot>
      </span>
      <span class="bootstrap-switch-label"></span>
      <span class="bootstrap-switch-handle-off bootstrap-switch-default">
        <slot v-if="offText || $slots.off" name="off"> {{ offText }} </slot>
      </span>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'BaseSwitch',
    props: {
      /**
       * v-model value
       */
      value: { type: [Boolean, Array], default: true },

      /**
       * on 라벨
       */
      onText: { type: String, default: '' },

      /**
       * off 라벨
       */
      offText: { type: String, default: '' },
    },
    computed: {
      switchClass() {
        const classes = `bootstrap-switch-${this.model ? 'on' : 'off'}`;
        return classes;
      },
      model: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit('input', value);
        },
      },
    },
    methods: {
      triggerToggle() {
        this.model = !this.model;
      },
    },
  };
</script>
<style></style>

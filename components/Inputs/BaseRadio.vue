<template>
  <div class="form-check form-check-radio" :class="[inlineClass, { disabled: disabled }]">
    <label :for="cbId" class="form-check-label">
      <input :id="cbId" v-model="model" class="form-check-input" type="radio" :disabled="disabled" :value="name" />
      <slot></slot> <span class="form-check-sign"></span>
    </label>
  </div>
</template>

<script>
  export default {
    name: 'BaseRadio',
    props: {
      /**
       * 라디오의 벨류값
       */
      name: {
        type: [String, Number],
        description: 'Radio label',
      },

      /**
       * disabled 여부
       */
      disabled: {
        type: Boolean,
        description: 'Whether radio is disabled',
      },

      /**
       * v-model 의 value 값
       */
      value: {
        type: [String, Boolean],
        description: 'Radio value',
      },

      /**
       * inline class 여부
       */
      inline: {
        type: Boolean,
        description: 'Whether radio is inline',
      },
    },
    data() {
      return {
        cbId: '',
      };
    },
    computed: {
      model: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit('input', value);
        },
      },
      inlineClass() {
        if (this.inline) {
          return `form-check-inline`;
        }
        return '';
      },
    },
    mounted() {
      this.cbId = Math.random().toString(16).slice(2);
    },
  };
</script>

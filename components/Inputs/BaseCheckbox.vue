<template>
  <div class="form-check" :class="[{ disabled: disabled }, inlineClass]">
    <label :for="cbId" class="form-check-label">
      <input :id="cbId" v-model="model" class="form-check-input" type="checkbox" :disabled="disabled" />
      <span class="form-check-sign"></span>
      <slot> <span v-if="inline" class="default-inline">&nbsp;</span> </slot>
    </label>
  </div>
</template>

<script>
  export default {
    name: 'BaseCheckbox',
    model: {
      prop: 'checked',
    },
    props: {
      checked: {
        type: [Array, Boolean],
        default: false,
      },

      /**
       * disabled 여부
       */
      disabled: {
        type: Boolean,
        default: false,
      },

      /**
       * inline class 여부
       */
      inline: {
        type: Boolean,
      },

      /**
       * 사용 안함
       */
      hasError: {
        type: Boolean,
      },
    },

    data() {
      return {
        cbId: '',
        touched: false,
      };
    },

    computed: {
      model: {
        get() {
          return this.checked;
        },
        set(check) {
          if (!this.touched) {
            this.touched = true;
          }
          this.$emit('input', check);
        },
      },

      inlineClass() {
        if (this.inline) {
          return `form-check-inline`;
        }
        return null;
      },
    },

    mounted() {
      this.cbId = Math.random().toString(16).slice(2);
    },
  };
</script>

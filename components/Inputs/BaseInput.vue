<template>
  <div
    class="form-group"
    :class="{
      'input-group-focus': focused,
      'has-danger': error,
      'has-success': !error && touched,
      'has-label': label,
      'has-icon': hasIcon,
    }"
  >
    <slot name="label">
      <label v-if="label"> {{ label }} {{ required ? '*' : '' }} </label>
    </slot>
    <div class="mb-0" :class="{ 'input-group': hasIcon }">
      <slot name="addonLeft">
        <div v-if="addonLeftIcon" class="input-group-prepend">
          <div class="input-group-text">
            <i :class="addonLeftIcon"></i>
          </div>
        </div>
      </slot>
      <slot>
        <input
          :value="value"
          v-bind="$attrs"
          class="form-control"
          aria-describedby="addon-right addon-left"
          v-on="listeners"
        />
      </slot>
      <slot name="addonRight">
        <div v-if="addonRightIcon" class="input-group-append">
          <div class="input-group-text"><i :class="addonRightIcon"></i></div>
        </div>
      </slot>
    </div>

    <slot v-if="error || $slots.error" name="error">
      <label class="error">{{ error }}</label>
    </slot>
    <slot name="helperText"></slot>
  </div>
</template>
<script>
  export default {
    name: 'BaseInput',
    inheritAttrs: false,
    model: {
      prop: 'value',
      event: 'input',
    },
    props: {
      /**
       * 필수여부 라벨
       */
      required: { type: Boolean },

      /**
       * input label
       */
      label: {
        type: String,
        default: '',
        description: 'Input label',
      },

      /**
       * error 메시지
       */
      error: {
        type: String,
        description: 'Input error',
        default: '',
      },

      /**
       * v-model value
       */
      value: {
        type: [String, Number],
        default: '',
        description: 'Input value',
      },

      /**
       * rightIcon class
       */
      addonRightIcon: {
        type: String,
        default: '',
        description: 'Input icon on the right',
      },

      /**
       * leftIcon class
       */
      addonLeftIcon: {
        type: String,
        default: '',
        description: 'Input icon on the left',
      },
    },
    data() {
      return {
        focused: false,
        touched: false,
      };
    },
    computed: {
      hasIcon() {
        return this.hasLeftAddon || this.hasRightAddon;
      },

      hasLeftAddon() {
        const { addonLeft } = this.$slots;
        return addonLeft !== undefined || this.addonLeftIcon !== '';
      },

      hasRightAddon() {
        const { addonRight } = this.$slots;
        return addonRight !== undefined || this.addonRightIcon !== '';
      },

      listeners() {
        return {
          ...this.$listeners,
          input: this.onInput,
          blur: this.onBlur,
          focus: this.onFocus,
        };
      },
    },

    methods: {
      onInput(evt) {
        if (!this.touched) {
          this.touched = true;
        }
        this.$emit('input', evt.target.value);
      },

      onFocus(evt) {
        this.focused = true;
        this.$emit('focus', evt);
      },

      onBlur(evt) {
        this.focused = false;
        this.$emit('blur', evt);
      },
    },
  };
</script>
<style></style>

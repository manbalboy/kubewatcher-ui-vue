<template>
  <component
    :is="tag"
    :type="tag === 'button' ? nativeType : ''"
    :disabled="disabled || loading"
    class="btn"
    :class="className"
    @click="handleClick"
  >
    <slot name="loading">
      <i v-if="loading" class="fas fa-spinner fa-spin"></i>
    </slot>
    <slot> button </slot>
  </component>
</template>
<script>
  export default {
    name: 'BaseButton',
    props: {
      /**
       * html tag ex) a|button|span ...
       */
      tag: {
        type: String,
        default: 'button',
        description: 'Button html tag',
      },

      /**
       * 둥근형태 여부
       */
      round: {
        type: Boolean,
        default: false,
      },

      /**
       * icon 형태 버튼
       */
      icon: { type: Boolean },

      /**
       * class 블록 여부
       */
      block: {
        type: Boolean,
        default: false,
      },

      /**
       * 로딩 여부
       */
      loading: { type: Boolean },

      /**
       * wide 여부
       */
      wide: { type: Boolean },

      /**
       * disabled 여부
       */
      disabled: {
        type: Boolean,
      },

      /**
       * 버튼 타입
       */
      type: {
        type: String,
        default: 'default',
        validator: value => {
          const typeArr = ['default', 'primary', 'info', 'success', 'warning', 'danger'];
          return typeArr.includes(value);
        },
        description: 'Button type (primary|secondary|danger etc)',
      },

      /**
       * 버튼의 타입 : button|reset|submit
       */
      nativeType: {
        type: String,
        default: 'button',
        validator: value => {
          const btnTypeArr = ['button', 'reset', 'submit'];
          return btnTypeArr.includes(value);
        },
        description: 'Button native type (e.g button, input etc)',
      },

      /**
       * 버튼 사이즈 sm|lg
       */
      size: {
        type: String,
        default: '',
        validator: value => {
          const sizeArr = ['sm', 'lg', ''];
          return sizeArr.includes(value);
        },
        description: 'Button size (sm|lg)',
      },

      /**
       * 아웃라인 형태 버튼 여부
       */
      simple: {
        type: Boolean,
        description: 'Whether button is simple (outlined)',
      },

      /**
       * 링크 형태 여부 (글자만 있는 버튼형태)
       */
      link: {
        type: Boolean,
        description: 'Whether button is a link (no borders or background)',
      },
    },
    computed: {
      className() {
        return [
          { 'btn-round': this.round },
          { 'btn-block': this.block },
          { 'btn-wd': this.wide },
          { 'btn-icon btn-fab': this.icon },
          { [`btn-${this.type}`]: this.type.trim() === '' ? false : this.type },
          { [`btn-${this.size}`]: this.size },
          { 'btn-simple': this.simple },
          { 'btn-link': this.link },
          { disabled: this.disabled && this.tag !== 'button' },
        ];
      },
    },
    methods: {
      handleClick(evt) {
        this.$emit('click', evt);
      },
    },
  };
</script>
<style scoped lang="scss">
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    /deep/ i {
      padding: 0 3px;
    }
  }
</style>

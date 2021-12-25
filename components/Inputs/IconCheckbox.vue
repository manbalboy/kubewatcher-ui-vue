<template>
  <div class="choice" :class="{ active: checked }" data-toggle="wizard-checkbox" @click="updateValue">
    <input type="checkbox" :name="name" :disabled="disabled" :checked="checked" />
    <div class="icon">
      <slot name="icon"> <i :class="icon"></i> </slot>
    </div>
    <slot name="title">
      <h6>{{ title }}</h6>
    </slot>
  </div>
</template>
<script>
  export default {
    name: 'IconCheckbox',
    model: {
      prop: 'checked',
    },

    props: {
      /**
       * v-model value 값
       */
      checked: {
        type: Boolean,
        default: false,
      },

      /**
       * checkbox name 속성
       */
      name: {
        type: String,
        default: '',
      },

      /**
       * 아이콘 체크박스의 타이틀
       */
      title: {
        type: String,
        default: '',
      },

      /**
       * default slot 의 icon class
       */
      icon: {
        type: String,
        default: '',
      },

      /**
       * 비활성화 여부
       */
      disabled: {
        type: Boolean,
        default: false,
      },
    },

    methods: {
      updateValue() {
        this.$emit('input', !this.checked);
      },
    },
  };
</script>
<style></style>

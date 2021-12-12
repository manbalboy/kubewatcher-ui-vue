<template>
  <div
    class="progress-container"
    :class="{
      [`progress-${type}`]: type,
      [`progress-${size}`]: size,
    }"
  >
    <span v-if="label" class="progress-badge">{{ label }}</span>
    <div class="progress">
      <span v-if="showValue && valuePosition === 'left'" class="progress-value">{{ value }}%</span>

      <div
        class="progress-bar"
        :class="computedClasses"
        role="progressbar"
        :aria-valuenow="value"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="`width: ${value}%;`"
      >
        <slot>
          <span v-if="showValue && valuePosition === 'right'" class="progress-value">{{ value }}%</span>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'BaseProgress',
    props: {
      /**
       * progress-bar-striped class 포함 여부
       */
      striped: {
        type: Boolean,
      },

      /**
       * value visible 여부
       */
      showValue: {
        type: Boolean,
        default: true,
      },

      /**
       * progress-bar-animated class 포함 여부
       */
      animated: {
        type: Boolean,
      },

      /**
       * label
       */
      label: {
        type: String,
        default: null,
      },

      /**
       * showValue true 일 때만 적용
       * value 가 보여질 position setup
       */
      valuePosition: {
        type: String,
        validator: value => ['left', 'right'].includes(value),
        default: 'left', // left | right
      },

      /**
       * 사용하지 않음
       */
      height: {
        type: Number,
        default: 1,
      },

      /**
       * progress-${type} class 적용
       */
      type: {
        type: String,
        validator: value => {
          const testValidatorValueArray = ['primary', 'info', 'success', 'warning', 'danger', 'neutral', 'default'];
          return testValidatorValueArray.includes(value);
        },
        default: 'default',
      },

      /**
       * progress-${size} class 적용
       */
      size: {
        type: String,
        validator: value => value === 'sm',
        default: 'sm',
      },

      /**
       * showValue true 일때 허용
       * 프로그래스 value
       */
      value: {
        type: Number,
        default: 0,
        validator: value => {
          return value >= 0 && value <= 100;
        },
      },
    },

    computed: {
      computedClasses() {
        return [{ 'progress-bar-striped': this.striped }, { 'progress-bar-animated': this.animated }];
      },
    },
  };
</script>
<style></style>

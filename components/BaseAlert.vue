<template>
  <FadeTransition>
    <div v-if="visible" class="alert" :class="[`alert-${type}`, { 'alert-with-icon': icon }]" role="alert">
      <slot v-if="!dismissible"></slot>

      <template v-else>
        <slot name="dismiss-icon">
          <button type="button" class="close" aria-label="Close" @click="dismissAlert">
            <i class="tim-icons icon-simple-remove"></i>
          </button>
        </slot>

        <template v-if="icon || $slots.icon">
          <slot name="icon">
            <span data-notify="icon" :class="icon"></span>
          </slot>
        </template>

        <span data-notify="message"> <slot></slot> </span>
      </template>
    </div>
  </FadeTransition>
</template>
<script>
  import { FadeTransition } from 'vue2-transitions';

  export default {
    name: 'BaseAlert',
    components: {
      FadeTransition,
    },

    props: {
      /**
       * alert type
       */
      type: {
        type: String,
        default: 'default',
        validator: value => {
          const typeArr = ['default', 'primary', 'info', 'success', 'warning', 'danger'];
          return typeArr.includes(value);
        },
        description: 'Alert type',
      },

      /**
       * x 버튼 여부
       */
      dismissible: {
        type: Boolean,
        default: false,
        description: 'Whether alert is dismissible (closeable)',
      },

      /**
       * icon class
       */
      icon: {
        type: String,
        default: '',
        description: 'Alert icon to display',
      },
    },

    data() {
      return {
        visible: true,
      };
    },

    methods: {
      dismissAlert() {
        this.visible = false;
      },
    },
  };
</script>

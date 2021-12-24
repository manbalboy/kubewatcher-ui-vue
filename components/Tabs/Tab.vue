<template>
  <div v-show="active" :id="id || label" class="tab-pane" :class="{ active: active }" :aria-expanded="active">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'Tab',
    inject: {
      addTab: {
        default: () => () => {},
      },
      removeTab: {
        default: () => () => {},
      },
    },
    props: {
      /**
       * Tab 제목에 쓰일 label (slot 또는 label) 은 필수
       */
      label: {
        type: String,
        default: null,
      },

      /**
       * 탭 id
       */
      id: {
        type: String,
        default: null,
      },
    },
    data() {
      return {
        active: false,
      };
    },

    mounted() {
      this.addTab(this);
    },

    destroyed() {
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
      this.removeTab(this);
    },
  };
</script>
<style></style>

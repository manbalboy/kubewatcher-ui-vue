<template>
  <div id="accordion" role="tabList" aria-multiselectable="true" class="card-collapse">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Collapse',

    provide() {
      return {
        animationDuration: this.animationDuration,
        multipleActive: this.multipleActive,
        addItem: this.addItem,
        removeItem: this.removeItem,
        deactivateAll: this.deactivateAll,
      };
    },

    props: {
      /**
       * animation 기간
       */
      animationDuration: {
        type: Number,
        default: 250,
      },

      /**
       * 열림이 다중 열림을 허용 할 것인지
       */
      multipleActive: {
        type: Boolean,
        default: true,
      },

      /**
       * 열림 index
       */
      activeIndex: {
        type: Number,
        default: -1,
      },
    },

    data() {
      return {
        items: [],
      };
    },

    watch: {
      activeIndex() {
        this.activateItem();
      },
    },

    mounted() {
      this.$nextTick(() => {
        this.activateItem();
      });
    },

    methods: {
      addItem(item) {
        const index = this.$slots.default.indexOf(item.$vnode);
        if (index !== -1) {
          this.items.splice(index, 0, item);
        }
      },

      removeItem(item) {
        const items = this.items;
        const index = items.indexOf(item);
        if (index > -1) {
          items.splice(index, 1);
        }
      },

      deactivateAll() {
        this.items.forEach(item => {
          item.active = false;
        });
      },

      activateItem() {
        if (this.activeIndex !== -1) {
          this.items[this.activeIndex].active = true;
        }
      },
    },
  };
</script>

<style scoped></style>

<template>
  <component
    :is="tag"
    v-click-outside="closeDropDown"
    class="dropdown"
    :class="[{ show: isOpen }, `drop${direction}`]"
    @click="toggleDropDown"
  >
    <slot name="title-container" :is-open="isOpen">
      <component
        :is="titleTag"
        class="dropdown-toggle no-caret"
        :class="titleClasses"
        :aria-label="title || 'dropdown'"
        :aria-expanded="isOpen"
        data-toggle="dropdown"
      >
        <slot name="title" :is-open="isOpen"> <i :class="icon"></i> {{ title }} </slot>
      </component>
    </slot>
    <ul class="dropdown-menu" :class="[{ show: isOpen }, { 'dropdown-menu-right': menuOnRight }, menuClasses]">
      <slot></slot>
    </ul>
  </component>
</template>
<script>
  export default {
    name: 'BaseDropdown',
    props: {
      /**
       * 최상위 html tag
       */
      tag: {
        type: String,
        default: 'div',
        description: 'Dropdown html tag (e.g div, ul etc)',
      },

      /**
       * title html tag
       */
      titleTag: {
        type: String,
        default: 'button',
        description: 'Dropdown title (toggle) html tag',
      },

      /**
       * dropdown title
       */
      title: {
        type: String,
        description: 'Dropdown title',
      },

      /**
       * dropdown 방향 up|down
       */
      direction: {
        type: String,
        default: 'down', // up | down
        validator: value => {
          return ['up', 'down'].includes(value);
        },
        description: 'Dropdown menu direction (up|down)',
      },

      /**
       * dropdown icon
       */
      icon: {
        type: String,
        description: 'Dropdown icon',
      },

      /**
       * title, class
       */
      titleClasses: {
        type: [String, Object, Array],
        description: 'Title css classes',
      },

      /**
       * menu class
       */
      menuClasses: {
        type: [String, Object],
        description: 'Menu css classes',
      },
      menuOnRight: {
        type: Boolean,
        description: 'Whether menu should appear on the right',
      },
    },
    data() {
      return {
        isOpen: false,
      };
    },
    methods: {
      toggleDropDown(event) {
        this.isOpen = !this.isOpen;
        this.$emit('change', this.isOpen, event);
      },
      closeDropDown(event) {
        this.isOpen = false;
        this.$emit('change', false, event);
      },
    },
  };
</script>
<style lang="scss" scoped>
  .dropdown {
    cursor: pointer;
    user-select: none;
  }
</style>

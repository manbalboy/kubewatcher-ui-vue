<template>
  <div>
    <div
      :class="[
        { 'col-md-4': vertical && !tabNavWrapperClasses },
        { 'col-12': centered && !tabNavWrapperClasses },
        tabNavWrapperClasses,
      ]"
    >
      <ul
        class="nav nav-pills"
        role="tabList"
        :class="[
          `nav-pills-${type}`,
          { 'nav-pills-icons': square },
          { 'flex-column': vertical },
          { 'justify-content-center': centered },
          tabNavClasses,
        ]"
      >
        <li v-for="tab in tabs" :key="tab.id" class="nav-item active" data-toggle="tab" aria-expanded="true">
          <a
            data-toggle="tab"
            role="tabList"
            :href="`#${tab.id}`"
            :aria-expanded="tab.active"
            class="nav-link"
            :class="{ active: tab.active }"
            @click.prevent="activateTab(tab)"
          >
            <TabItemContent :tab="tab"> </TabItemContent>
          </a>
        </li>
      </ul>
    </div>
    <div
      class="tab-content"
      :class="[{ 'tab-space': !vertical }, { 'col-md-8': vertical && !tabContentClasses }, tabContentClasses]"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import TabItemContent from './TabItemContent';
  export default {
    name: 'Tabs',
    components: {
      // TabItemContent: {
      //   props: ['tab'],
      //   render(h) {
      //     return h('div', [this.tab.$slots.label || this.tab.label]);
      //   },
      // },
      TabItemContent,
    },

    provide() {
      return {
        addTab: this.addTab,
        removeTab: this.removeTab,
      };
    },

    props: {
      /**
       * tab class type
       */
      type: {
        type: String,
        default: 'primary',
        validator: value => {
          const acceptedValues = ['primary', 'info', 'success', 'warning', 'danger'];
          return acceptedValues.includes(value);
        },
      },

      /**
       * tab name // 사용안하는 props
       */
      activeTabIndex: {
        type: Number,
        default: 0,
      },

      /**
       * 탭 최상위 class
       */
      tabNavWrapperClasses: {
        type: [String, Object],
        default: '',
      },

      /**
       * 탭 ul 클래스
       */
      tabNavClasses: {
        type: [String, Object],
        default: '',
      },

      /**
       * 탭 컨텐츠 클래스
       */
      tabContentClasses: {
        type: [String, Object],
        default: '',
      },

      /**
       * 수직여부
       */
      vertical: {
        type: Boolean,
      },

      /**
       * 직사각형 여부
       */
      square: {
        type: Boolean,
      },

      /**
       * 버튼 중앙 정렬 여부
       */
      centered: {
        type: Boolean,
      },

      /**
       * 라벨 선택
       */
      value: {
        type: String,
        default: '',
      },
    },

    data() {
      return {
        tabs: [],
      };
    },

    watch: {
      value(newVal) {
        this.findAndActivateTab(newVal);
      },
    },

    mounted() {
      this.$nextTick(() => {
        if (this.value) {
          this.findAndActivateTab(this.value);
        }
      });
    },

    methods: {
      findAndActivateTab(label) {
        const tabToActivate = this.tabs.find(t => t.label === label);
        if (tabToActivate) {
          this.activateTab(tabToActivate);
        }
      },

      activateTab(tab) {
        // if (this.handleClick) {
        //   this.handleClick(tab);
        // }
        this.deactivateTabs();
        tab.active = true;
      },

      deactivateTabs() {
        this.tabs.forEach(tab => {
          tab.active = false;
        });
      },

      addTab(tab) {
        const index = this.$slots.default.indexOf(tab.$vnode);
        if (!this.activeTabIndex && index === 0) {
          tab.active = true;
        }

        if (this.activeTabIndex === index) {
          tab.active = true;
        }

        this.tabs.splice(index, 0, tab);
      },

      removeTab(tab) {
        const tabs = this.tabs;
        const index = tabs.indexOf(tab);
        if (index > -1) {
          tabs.splice(index, 1);
        }
      },
    },
  };
</script>

<style scoped></style>

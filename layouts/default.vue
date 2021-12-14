<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <!--    <notifications></notifications>-->
    <!--    <SidebarFixedToggleButton />-->

    <side-bar
      style="z-index: 1060"
      :background-color="sidebarBackground"
      :short-title="$t('sidebar.shortTitle')"
      :title="$t('sidebar.title')"
      @click="toggleSidebar"
    >
      <template slot="links" slot-scope="props">
        <sidebar-item
          :link="{
            name: $t('sidebar.dashboard'),
            icon: 'tim-icons icon-chart-pie-36',
            path: '/',
          }"
        >
        </sidebar-item>
        <sidebar-item :link="{ name: $t('sidebar.pages'), icon: 'tim-icons icon-image-02' }">
          <sidebar-item :link="{ name: $t('sidebar.pricing'), path: '/pricing' }"></sidebar-item>
          <sidebar-item :link="{ name: $t('sidebar.rtl'), path: localePath('pages-rtl', 'ar') }"></sidebar-item>
          <sidebar-item :link="{ name: $t('sidebar.timeline'), path: '/pages/timeline' }"></sidebar-item>
          <sidebar-item :link="{ name: $t('sidebar.login'), path: '/login' }"></sidebar-item>
          <sidebar-item :link="{ name: $t('sidebar.register'), path: '/register' }"></sidebar-item>
          <sidebar-item :link="{ name: $t('sidebar.lock'), path: '/lock' }"></sidebar-item>
          <sidebar-item :link="{ name: $t('sidebar.userProfile'), path: '/pages/user' }"></sidebar-item>
        </sidebar-item>
        <sidebar-item
          :link="{
            name: $t('sidebar.components'),
            icon: 'tim-icons icon-molecule-40',
          }"
        >
          <sidebar-item :link="{ name: $t('sidebar.multiLevelCollapse') }">
            <sidebar-item
              :link="{
                name: $t('sidebar.example'),
                isRoute: false,
                path: 'https://google.com',
                target: '_blank',
              }"
            ></sidebar-item>
          </sidebar-item>

          <sidebar-item :link="{ name: $t('sidebar.buttons'), path: '/components/buttons' }"></sidebar-item>
          <sidebar-item
            :link="{
              name: $t('sidebar.gridSystem'),
              path: '/components/grid-system',
            }"
          ></sidebar-item>
          <sidebar-item :link="{ name: $t('sidebar.panels'), path: '/components/panels' }"></sidebar-item>
          <sidebar-item
            :link="{
              name: $t('sidebar.sweetAlert'),
              path: '/components/sweet-alert',
            }"
          ></sidebar-item>
          <sidebar-item
            :link="{
              name: $t('sidebar.notifications'),
              path: '/components/notifications',
            }"
          ></sidebar-item>
          <sidebar-item :link="{ name: $t('sidebar.icons'), path: '/components/icons' }"></sidebar-item>
          <sidebar-item
            :link="{
              name: $t('sidebar.typography'),
              path: '/components/typography',
            }"
          ></sidebar-item>
        </sidebar-item>
        <sidebar-item :link="{ name: $t('sidebar.forms'), icon: 'tim-icons icon-notes' }">
          <sidebar-item :link="{ name: $t('sidebar.regularForms'), path: '/forms/regular' }"></sidebar-item>
          <sidebar-item
            :link="{
              name: $t('sidebar.extendedForms'),
              path: '/forms/extended',
            }"
          ></sidebar-item>
          <sidebar-item
            :link="{
              name: $t('sidebar.validationForms'),
              path: '/forms/validation',
            }"
          ></sidebar-item>
          <sidebar-item :link="{ name: $t('sidebar.wizard'), path: '/forms/wizard' }"></sidebar-item>
        </sidebar-item>
        <sidebar-item
          :link="{
            name: $t('sidebar.tables'),
            icon: 'tim-icons icon-puzzle-10',
          }"
        >
          <sidebar-item
            :link="{
              name: $t('sidebar.regularTables'),
              path: '/table-list/regular',
            }"
          ></sidebar-item>
          <sidebar-item
            :link="{
              name: $t('sidebar.extendedTables'),
              path: '/table-list/extended',
            }"
          ></sidebar-item>
          <sidebar-item
            :link="{
              name: $t('sidebar.paginatedTables'),
              path: '/table-list/paginated',
            }"
          ></sidebar-item>
        </sidebar-item>
        <sidebar-item :link="{ name: $t('sidebar.maps'), icon: 'tim-icons icon-pin' }">
          <sidebar-item :link="{ name: $t('sidebar.googleMaps'), path: '/maps/google' }"></sidebar-item>
          <sidebar-item
            :link="{
              name: $t('sidebar.fullScreenMaps'),
              path: '/maps/full-screen',
            }"
          ></sidebar-item>
          <sidebar-item :link="{ name: $t('sidebar.vectorMaps'), path: '/maps/vector-map' }"></sidebar-item>
        </sidebar-item>
        <sidebar-item
          :link="{
            name: $t('sidebar.widgets'),
            icon: 'tim-icons icon-settings',
            path: '/widgets',
          }"
        ></sidebar-item>
        <sidebar-item
          :link="{
            name: $t('sidebar.charts'),
            icon: 'tim-icons icon-chart-bar-32',
            path: '/charts',
          }"
        ></sidebar-item>
        <sidebar-item
          :link="{
            name: $t('sidebar.calendar'),
            icon: 'tim-icons icon-time-alarm',
            path: '/calendar',
          }"
        ></sidebar-item>
      </template>
    </side-bar>
    <!--Share plugin (for demo purposes). You can remove it if don't plan on using it-->
    <!--    <SidebarShare :background-color.sync="sidebarBackground"> </SidebarShare>-->
    <div class="main-panel" :data="sidebarBackground">
      <DashboardNavbar></DashboardNavbar>
      <router-view name="header"></router-view>

      <div :class="{ content: !isFullScreenRoute }" @click="toggleSidebar">
        <ZoomCenterTransition :duration="200" mode="out-in">
          <!-- your content here -->
          <nuxt></nuxt>
        </ZoomCenterTransition>
      </div>
      <ContentFooter v-if="!isFullScreenRoute"></ContentFooter>
    </div>
  </div>
</template>
<script>
  /* eslint-disable no-new */
  import PerfectScrollbar from 'perfect-scrollbar';
  import 'perfect-scrollbar/css/perfect-scrollbar.css';
  import { SlideYDownTransition, ZoomCenterTransition } from 'vue2-transitions';
  import SidebarShare from '@/components/Layout/SidebarSharePlugin';

  import DashboardNavbar from '@/components/Layout/DashboardNavbar.vue';
  import ContentFooter from '@/components/Layout/ContentFooter.vue';
  import DashboardContent from '@/components/Layout/Content.vue';
  import SidebarFixedToggleButton from '@/components/Layout/SidebarFixedToggleButton.vue';
  function hasElement(className) {
    return document.getElementsByClassName(className).length > 0;
  }

  function initScrollbar(className) {
    if (hasElement(className)) {
      new PerfectScrollbar(`.${className}`);
    } else {
      // try to init it later in case this component is loaded async
      setTimeout(() => {
        initScrollbar(className);
      }, 100);
    }
  }

  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      SidebarFixedToggleButton,
      // DashboardContent,
      // SlideYDownTransition,
      ZoomCenterTransition,
      SidebarShare,
    },
    data() {
      return {
        sidebarBackground: 'vue', // vue|blue|orange|green|red|primary
      };
    },
    computed: {
      isFullScreenRoute() {
        return this.$route.path === '/maps/full-screen';
      },
    },
    mounted() {
      this.initScrollbar();
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      },
      initScrollbar() {
        const docClasses = document.body.classList;
        const isWindows = navigator.platform.startsWith('Win');
        if (isWindows) {
          // if we are on windows OS we activate the perfectScrollbar function
          initScrollbar('sidebar');
          initScrollbar('main-panel');
          initScrollbar('sidebar-wrapper');

          docClasses.add('perfect-scrollbar-on');
        } else {
          docClasses.add('perfect-scrollbar-off');
        }
      },
    },
  };
</script>
<style lang="scss">
  $scaleSize: 0.95;
  @keyframes zoomIn95 {
    from {
      opacity: 0;
      transform: scale3d($scaleSize, $scaleSize, $scaleSize);
    }
    to {
      opacity: 1;
    }
  }

  .main-panel .zoomIn {
    animation-name: zoomIn95;
  }

  @keyframes zoomOut95 {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      transform: scale3d($scaleSize, $scaleSize, $scaleSize);
    }
  }

  .main-panel .zoomOut {
    animation-name: zoomOut95;
  }
</style>

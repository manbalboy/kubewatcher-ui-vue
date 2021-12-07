<template>
  <BaseNav v-model="showMenu" class="navbar-absolute top-navbar" type="white" :transparent="true">
    <div slot="brand" class="navbar-wrapper">
      <div class="navbar-minimize d-inline">
        <!--        <SidebarToggleButton />-->
      </div>
      <div class="navbar-toggle d-inline" :class="{ toggled: $sidebar.showSidebar }">
        <button type="button" class="navbar-toggler" @click="toggleSidebar">
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </button>
      </div>
      <a class="navbar-brand" href="#pablo">{{ routeName }}</a>
      <a class="navbar-brand cursor" title="full screen" @click.prevent="fnToggledScreen">
        <i class="tim-icons icon-laptop"></i>
      </a>
    </div>

    <ul class="navbar-nav" :class="$rtl.isRTL ? 'mr-auto' : 'ml-auto'">
      <div class="search-bar input-group" @click="searchModalVisible = true">
        <button id="search-button" class="btn btn-link" data-toggle="modal" data-target="#searchModal">
          <i class="tim-icons icon-zoom-split"></i>
        </button>
        <!-- You can choose types of search input -->
      </div>
      <Modal id="searchModal" :show.sync="searchModalVisible" class="modal-search" :centered="false" :show-close="true">
        <input
          id="inlineFormInputGroup"
          slot="header"
          v-model="searchQuery"
          type="text"
          class="form-control"
          placeholder="SEARCH"
        />
      </Modal>

      <base-dropdown tag="li" :menu-on-right="!$rtl.isRTL" title-tag="a" title-classes="nav-link" class="nav-item">
        <template slot="title">
          <div class="notification d-none d-lg-block d-xl-block"></div>
          <i class="tim-icons icon-sound-wave"></i>
          <p class="d-lg-none">New Notifications</p>
        </template>
        <li class="nav-link">
          <a href="#" class="nav-item dropdown-item">Mike John responded to your email</a>
        </li>
        <li class="nav-link">
          <a href="#" class="nav-item dropdown-item">You have 5 more tasks</a>
        </li>
        <li class="nav-link">
          <a href="#" class="nav-item dropdown-item">Your friend Michael is in town</a>
        </li>
        <li class="nav-link">
          <a href="#" class="nav-item dropdown-item">Another notification</a>
        </li>
        <li class="nav-link">
          <a href="#" class="nav-item dropdown-item">Another one</a>
        </li>
      </base-dropdown>
      <base-dropdown
        tag="li"
        :menu-on-right="!$rtl.isRTL"
        title-tag="a"
        class="nav-item"
        title-classes="nav-link"
        menu-classes="dropdown-navbar"
      >
        <template slot="title">
          <div class="photo"><img src="img/mike.jpg" /></div>
          <b class="caret d-none d-lg-block d-xl-block"></b>
          <p class="d-lg-none">Log out</p>
        </template>
        <li class="nav-link">
          <a href="#" class="nav-item dropdown-item">Profile</a>
        </li>
        <li class="nav-link">
          <a href="#" class="nav-item dropdown-item">Settings</a>
        </li>
        <div class="dropdown-divider"></div>
        <li class="nav-link">
          <a href="#" class="nav-item dropdown-item">Log out</a>
        </li>
      </base-dropdown>
    </ul>
  </BaseNav>
</template>
<script>
  // import { CollapseTransition } from 'vue2-transitions';
  // import SidebarToggleButton from './SidebarToggleButton';
  import { BaseNav, Modal } from '@/components';

  export default {
    components: {
      // SidebarToggleButton,
      // CollapseTransition,
      BaseNav,
      Modal,
    },
    data() {
      return {
        activeNotifications: false,
        showMenu: false,
        searchModalVisible: false,
        searchQuery: '',
        isFullScreen: false,
      };
    },
    computed: {
      routeName() {
        const { path } = this.$route;
        const parts = path.split('/');
        return parts.map(p => this.capitalizeFirstLetter(p)).join(' ');
      },
      isRTL() {
        return this.$rtl.isRTL;
      },
    },
    methods: {
      capitalizeFirstLetter(string) {
        if (!string || typeof string !== 'string') {
          return '';
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
      },
      closeDropDown() {
        this.activeNotifications = false;
      },
      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
      },
      toggleMenu() {
        this.showMenu = !this.showMenu;
      },
      fnToggledScreen() {
        if (!this.isFullScreen) {
          this.fnOpenFullScreenMode();
        } else {
          this.fnCloseFullScreenMode();
        }
        this.isFullScreen = !this.isFullScreen;
      },
      fnOpenFullScreenMode() {
        const docV = document.documentElement;

        if (docV.requestFullscreen) docV.requestFullscreen();
        else if (docV.webkitRequestFullscreen)
          // Chrome, Safari (webkit)
          docV.webkitRequestFullscreen();
        else if (docV.mozRequestFullScreen)
          // Firefox
          docV.mozRequestFullScreen();
        else if (docV.msRequestFullscreen)
          // IE or Edge
          docV.msRequestFullscreen();
      },
      // 전체화면 해제
      fnCloseFullScreenMode() {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.webkitExitFullscreen)
          // Chrome, Safari (webkit)
          document.webkitExitFullscreen();
        else if (document.mozCancelFullScreen)
          // Firefox
          document.mozCancelFullScreen();
        else if (document.msExitFullscreen)
          // IE or Edge
          document.msExitFullscreen();
      },
    },
  };
</script>
<style scoped>
  .navbar-brand.cursor {
    cursor: pointer;
  }
  .top-navbar {
    top: 0px;
  }
</style>

<template>
  <div id="wrapper">
    <div class="lef-nav bg-gradient-hanwha">
      <div class="row d-flex lef-sidebar-brand">
        <div class="logo-img"><img src="" alt="" /></div>
        <div class="lef-sidebar-brand-text">Kube<br />Watcher</div>
      </div>

      <div id="lnb">
        <ul>
          <li class="heading lef-sidebar-brand-sub-text noDepth">
            <div class="row">
              <div class="col-lg-12 h5 font-weight-bold text-light text-uppercase">local</div>
              <div class="col-lg-12">
                <div class="circle c_normal"></div>
                <span>Connected</span>
              </div>
            </div>
          </li>
          <li v-for="menu in menuList" :key="menu.name">
            <NuxtLink :to="menu.path || '#none'" role="button">
              <i :class="menu.icon"></i>&nbsp;<span class="lef-sidebar-brand-sub-text">{{ menu.name }}</span>
            </NuxtLink>

            <ul v-if="menu.children && menu.children.length > 0">
              <li
                v-for="child in menu.children"
                :key="child.name"
                :class="[child.children && child.children.length > 0 ? 'dropright' : 'noDepth']"
              >
                <NuxtLink :id="child.name" :to="child.path || '#none'" role="button" data-toggle="side-dropdown">
                  {{ child.name }}
                </NuxtLink>
                <ul
                  v-if="child.children && child.children.length > 0"
                  class="dropdown-menu"
                  :aria-labelledby="child.name"
                >
                  <li v-for="child_2 in child.children" :key="child_2.name" class="noDepth">
                    <NuxtLink :to="child_2.path || '#none'" role="button" data-toggle="side-dropdown">
                      {{ child_2.name }}
                    </NuxtLink>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="text-center d-none d-md-inline">
        <button id="sidebarToggle" class="rounded-circle_l border-0"><i class="feather icon-chevrons-left"></i></button>
      </div>
    </div>
    <Nuxt></Nuxt>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        menuList: [
          {
            icon: 'feather icon-bar-chart-2',
            name: 'Dashboard',
            path: '',
            children: [
              { icon: '', name: 'Overview', path: '/main' },
              { icon: '', name: 'Application (K8s)', path: '/monitoring/application/overview' },
              {
                icon: '',
                name: 'K8s Boards',
                path: '',
                children: [
                  { icon: '', name: 'K8s Overview', path: '/monitoring/cluster/overview' },
                  { icon: '', name: 'Cluster Node Overview', path: '/monitoring/vm/overview' },
                  { icon: '', name: 'Cluster Node Detail', path: '/monitoring/vm/monitoring' },
                  { icon: '', name: 'Pod JVM Overview', path: '/monitoring/jvm/overview' },
                  { icon: '', name: 'Pod JVM Detail', path: '/monitoring/jvm/application' },
                ],
              },
              { icon: '', name: 'Database', path: '/monitoring/database' },
            ],
          },

          {
            icon: 'feather icon-box',
            name: 'K8s Cluster',
            path: '',
            children: [
              { icon: '', name: 'Nodes', path: '/monitoring/cluster/nodes' },
              {
                icon: '',
                name: 'Workloads',
                path: '',
                children: [
                  { icon: '', name: 'Overview', path: '/monitoring/cluster/workloads/overview' },
                  { icon: '', name: 'Deployments', path: '/monitoring/cluster/workloads/deployments' },
                  { icon: '', name: 'StatefulSets', path: '/monitoring/cluster/workloads/statefulsets' },
                  { icon: '', name: 'DaemonSets', path: '/monitoring/cluster/workloads/daemonsets' },
                  { icon: '', name: 'Jobs', path: '/monitoring/cluster/workloads/jobs' },
                  { icon: '', name: 'CronJobs', path: '/monitoring/cluster/workloads/cronjobs' },
                ],
              },
              { icon: '', name: 'Storages', path: '/monitoring/cluster/storages' },
              {
                icon: '',
                name: 'Configuration',
                path: '',
                children: [
                  { icon: '', name: 'Configmaps', path: '/cluster/config/configmaps' },
                  { icon: '', name: 'Resource Quotas', path: '/cluster/config/resource-quotas' },
                  { icon: '', name: 'HPA', path: '/cluster/config/hpa' },
                  { icon: '', name: 'Namespaces', path: '/cluster/config/namespaces' },
                  { icon: '', name: 'Custom Resources', path: '/cluster/config/custom-resources' },
                ],
              },
            ],
          },

          {
            icon: 'feather icon-bell',
            name: 'Alarm',
            path: '',
            children: [
              { icon: '', name: 'List', path: '/monitoring/alarm/list' },
              { icon: '', name: 'Config', path: '/setting/alarm/list' },
            ],
          },
          {
            icon: 'feather icon-user',
            name: 'Users',
            path: '',
            children: [
              { icon: '', name: 'Groups', path: '/security/groups' },
              { icon: '', name: 'Users', path: '/security/users' },
              { icon: '', name: 'Roles', path: '/security/roles/user-role-management' },
            ],
          },

          {
            icon: 'feather icon-pie-chart',
            name: 'Cluster Usage',
            path: '/application/usage/usage-overview',
          },

          {
            icon: 'feather icon-settings',
            name: 'Preference',
            path: '/setting/preference',
          },
        ],
      };
    },
  };
</script>

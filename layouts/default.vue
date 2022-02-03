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
          <li class="on open">
            <a href="#none" role="button">
              <i class="feather icon-bar-chart-2"></i>&nbsp;<span class="lef-sidebar-brand-sub-text">Dashboard</span>
            </a>
            <ul>
              <li class="noDepth"><a href="/main">Overview</a></li>
              <li class="noDepth"><a href="/monitoring/application/overview">Application (K8s)</a></li>
              <li class="dropright">
                <a id="dropdownNode" href="#none" role="button" data-toggle="side-dropdown">K8s Boards</a>
                <ul class="dropdown-menu" aria-labelledby="dropdownNode">
                  <li class="noDepth"><a href="/monitoring/cluster/overview">K8s Overview</a></li>
                  <li class="noDepth"><a href="/monitoring/vm/overview">Cluster Node Overview</a></li>
                  <li class="noDepth"><a href="/monitoring/vm/monitoring">Cluster Node Detail</a></li>
                  <li class="noDepth"><a href="/monitoring/jvm/overview">Pod JVM Overview</a></li>
                  <li class="noDepth"><a href="/monitoring/jvm/application">Pod JVM Detail</a></li>
                </ul>
              </li>
              <li class="noDepth"><a href="/monitoring/database">Database</a></li>
            </ul>
          </li>
          <li>
            <a href="#none" role="button">
              <i class="feather icon-box"></i>&nbsp;<span class="lef-sidebar-brand-sub-text">K8s Cluster</span>
            </a>
            <ul>
              <li class="noDepth"><a href="/monitoring/cluster/nodes">Nodes</a></li>
              <li class="dropright">
                <a id="dropdownWorkload" href="#none" role="button" data-toggle="side-dropdown">Workloads</a>
                <ul class="dropdown-menu" aria-labelledby="dropdownWorkload">
                  <li class="noDepth"><a href="/monitoring/cluster/workloads/overview">Overview</a></li>
                  <li class="noDepth"><a href="/monitoring/cluster/workloads/pods">Pods</a></li>
                  <li class="noDepth"><a href="/monitoring/cluster/workloads/deployments">Deployments</a></li>
                  <li class="noDepth"><a href="/monitoring/cluster/workloads/statefulsets">StatefulSets</a></li>
                  <li class="noDepth"><a href="/monitoring/cluster/workloads/daemonsets">DaemonSets</a></li>
                  <li class="noDepth"><a href="/monitoring/cluster/workloads/jobs">Jobs</a></li>
                  <li class="noDepth"><a href="/monitoring/cluster/workloads/cronjobs">CronJobs</a></li>
                </ul>
              </li>
              <li class="noDepth"><a href="/monitoring/cluster/storages">Storages</a></li>
              <li class="dropright">
                <a id="dropdownConfig" href="#none" role="button" data-toggle="side-dropdown">Configuration</a>
                <ul class="dropdown-menu" aria-labelledby="dropdownConfig">
                  <li class="noDepth"><a href="/cluster/config/configmaps">Configmaps</a></li>
                  <li class="noDepth"><a href="/cluster/config/resource-quotas">Resource Quotas</a></li>
                  <li class="noDepth"><a href="/cluster/config/hpa">HPA</a></li>
                  <li class="noDepth"><a href="/cluster/config/namespaces">Namespaces</a></li>
                  <li class="noDepth"><a href="/cluster/config/custom-resources">Custom Resources</a></li>
                </ul>
              </li>
              <li class="dropright">
                <a id="dropdownNetwork" href="#none" role="button" data-toggle="side-dropdown">Network</a>
                <ul class="dropdown-menu" aria-labelledby="dropdownNetwork">
                  <li class="noDepth"><a href="/cluster/network/services">Services</a></li>
                  <li class="noDepth"><a href="/cluster/network/ingress">Ingresses</a></li>
                  <li class="noDepth"><a href="/cluster/network/endpoints">Endpoints</a></li>
                  <li class="noDepth"><a href="/cluster/network/policies">Network Policies</a></li>
                </ul>
              </li>
              <li class="dropright">
                <a id="dropdownAccess" href="#none" role="button" data-toggle="side-dropdown">Access Control</a>
                <ul class="dropdown-menu" aria-labelledby="dropdownAccess">
                  <li class="noDepth"><a href="/cluster/acl/service-accounts">Service Accounts</a></li>
                  <li class="noDepth"><a href="/cluster/acl/role-bindings">Role Bindings</a></li>
                  <li class="noDepth"><a href="/cluster/acl/roles">Roles</a></li>
                  <li class="noDepth"><a href="/cluster/config/secrets">Secrets</a></li>
                  <li class="noDepth"><a href="/cluster/acl/pod-security-policies">Pod Security Policies</a></li>
                </ul>
              </li>
              <li class="noDepth"><a href="/monitoring/cluster/events">Events</a></li>
            </ul>
          </li>
          <li>
            <a href="#none" role="button">
              <i class="feather icon-bell"></i>&nbsp;<span class="lef-sidebar-brand-sub-text">Alarm</span>
            </a>
            <ul>
              <li class="noDepth"><a href="/monitoring/alarm/list">List</a></li>
              <li class="noDepth"><a href="/setting/alarm/list">Config</a></li>
            </ul>
          </li>
          <li>
            <a href="#none" role="button">
              <i class="feather icon-user"></i>&nbsp;<span class="lef-sidebar-brand-sub-text">Users</span>
            </a>
            <ul>
              <li class="noDepth"><a href="/security/groups">Groups</a></li>
              <li class="noDepth"><a href="/security/users">Users</a></li>
              <li class="noDepth"><a href="/security/roles/user-role-management">Roles</a></li>
            </ul>
          </li>
          <li class="noDepth">
            <a href="/application/usage/usage-overview"
              ><i class="feather icon-pie-chart"></i>&nbsp;<span class="lef-sidebar-brand-sub-text"
                >Cluster Usage</span
              ></a
            >
          </li>
          <li class="noDepth">
            <a href="/setting/preference"
              ><i class="feather icon-settings"></i>&nbsp;<span class="lef-sidebar-brand-sub-text">Preference</span></a
            >
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
<script></script>

<style leng="scss" scoped>
  #wrapper {
    display: flex;
  }
</style>

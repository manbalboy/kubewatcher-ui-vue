<template>
  <li :class="{ 'timeline-inverted': inverted }">
    <slot name="badge">
      <div class="timeline-badge" :class="badgeType">
        <i :class="badgeIcon"></i>
      </div>
    </slot>

    <div class="timeline-panel">
      <div class="timeline-heading"><slot name="header"></slot></div>
      <div v-if="$slots.content" class="timeline-body">
        <slot name="content"></slot>
      </div>
      <div v-if="$slots.footer" class="timeline-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </li>
</template>
<script>
  export default {
    name: 'TimeLineItem',
    props: {
      /**
       * 거꾸로 여부
       */
      inverted: {
        type: Boolean,
        default: false,
      },

      /**
       * 뱃지 타입 (primary|info|success|warning|danger)
       */
      badgeType: {
        type: String,
        default: 'success',
        validator: value => ['primary', 'info', 'success', 'warning', 'danger'].includes(value),
      },

      /**
       * 뱃지 icon
       */
      badgeIcon: {
        type: String,
        default: '',
      },
    },
  };
</script>
<style></style>

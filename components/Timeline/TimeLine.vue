<template>
  <card class="card-timeline card-plain">
    <ul class="timeline" :class="{ 'timeline-simple': type === 'simple' }">
      <slot></slot>
    </ul>
  </card>
</template>
<script>
  export default {
    name: 'TimeLine',
    props: {
      type: {
        type: String,
        default: '',
      },
    },
  };
</script>
<style></style>

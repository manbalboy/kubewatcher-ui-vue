<template>
  <Card class="card-timeline card-plain">
    <ul class="timeline" :class="{ 'timeline-simple': type === 'simple' }">
      <slot></slot>
    </ul>
  </Card>
</template>
<script>
  import Card from '@/components/Cards/Card.vue';
  export default {
    name: 'TimeLine',
    components: { Card },
    props: {
      /**
       * type : simple| ''
       */
      type: {
        type: String,
        default: '',
      },
    },
  };
</script>
<style></style>

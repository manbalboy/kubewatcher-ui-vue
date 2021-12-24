<script>
  export default {
    name: 'TabItemContent',
    props: {
      tab: {
        type: Object,
        required: true,
      },
    },
    render(h) {
      return h('div', [this.tab.$slots.label || this.tab.label]);
    },
  };
</script>

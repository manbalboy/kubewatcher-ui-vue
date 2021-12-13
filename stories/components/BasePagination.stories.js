import BasePagination from '../../components/BasePagination.vue';

export default {
  title: 'Component/Base/BasePagination',
  component: BasePagination,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BasePagination },
  template: `<BasePagination v-model="defaultPagination" v-bind="$props"/>`,
  data() {
    return {
      defaultPagination: 1,
    };
  },
});

export const 기본 = Template.bind({});
기본.args = {
  // type: 'warning',
  // pageCount: 10,
  // showArrows: false,
};

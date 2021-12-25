import BaseTable from '@/components/BaseTable.vue';

export default {
  title: 'Component/Base/BaseTable',
  component: BaseTable,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['striped', 'hover'],
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseTable },
  template: `<BaseTable  v-bind="$props" />`,
});

export const 기본_NON_SLOT = Template.bind({});
기본_NON_SLOT.args = {
  columns: ['test1', 'test2', 'test3', 'test4'],
  data: [
    { test1: '1rowA', test2: '1rowB', test3: '1rowC', test4: '1rowD' },
    { test1: '2rowA', test2: '2rowB', test3: '2rowC', test4: '2rowD' },
    { test1: '3rowA', test2: '3rowB', test3: '3rowC', test4: '3rowD' },
    { test1: '4rowA', test2: '4rowB', test3: '4rowC', test4: '4rowD' },
  ],
};

import Badge from '../../components/Badge.vue';

const typeArray = ['primary', 'info', 'success', 'warning', 'danger', 'default'];
export default {
  title: 'Component/Badge',
  component: Badge,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: typeArray,
      },
    },
  },
};

const makeAllTypeTemplate = () => {
  return typeArray.map(item => {
    return `<div><Badge  type="${item}" v-bind="$props" > ${item} </Badge></div>`;
  });
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Badge },
  template: `<Badge v-bind="$props" > badge </Badge>`,
});

const AllTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Badge },
  template: `<div>${makeAllTypeTemplate()}</div>`,
});

export const 뱃지_기본 = Template.bind({});
뱃지_기본.args = {};

export const 뱃지_ALL = AllTemplate.bind({});
뱃지_ALL.args = {};

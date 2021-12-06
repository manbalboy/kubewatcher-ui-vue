import BaseAlert from '../../components/BaseAlert.vue';

const typeArray = ['primary', 'info', 'success', 'warning', 'danger', 'default'];
export default {
  title: 'Component/BaseAlert',
  component: BaseAlert,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: typeArray,
      },
    },
    default: {
      control: {
        type: 'text',
      },
    },
  },
};

const makeAllTypeTemplate = () => {
  return typeArray
    .map(item => {
      return `<div><BaseAlert  type="${item}" v-bind="$props" > ${item} type base alert storybook .. </BaseAlert></div>`;
    })
    .join('');
};

const AllTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseAlert },
  template: `<div>${makeAllTypeTemplate()}</div>`,
});

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseAlert },
  template: `<BaseAlert v-bind="$props" > base alert storybook .. </BaseAlert> `,
});

export const 알림_기본 = Template.bind({});
알림_기본.args = {};

export const 알림_아이콘 = Template.bind({});
알림_아이콘.args = {
  icon: 'tim-icons icon-bell-55',
  dismissible: true,
};

export const 알림_ALL = AllTemplate.bind({});
알림_ALL.args = {
  dismissible: true,
};

export const 알림_아이콘_ALL = AllTemplate.bind({});
알림_아이콘_ALL.args = {
  icon: 'tim-icons icon-bell-55',
  dismissible: true,
};

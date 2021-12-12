import BaseProgress from '../../components/BaseProgress.vue';

export default {
  title: 'Component/Base/BaseProgress',
  component: BaseProgress,
  argTypes: {
    valuePosition: { control: { type: 'select' }, options: ['left', 'right'] },
    type: {
      control: {
        type: 'select',
      },
      options: ['primary', 'info', 'success', 'warning', 'danger', 'neutral', 'default'],
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseProgress },
  template: `<div style="margin: 50px"><BaseProgress :value="value" v-bind="$props"/></div>`,
});
const ALLTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseProgress },
  template: `
  <div style="margin: 50px">
    <BaseProgress :value="value" type="primary" v-bind="$props"/>
    <BaseProgress :value="value" type="info"  v-bind="$props"/>
    <BaseProgress :value="value" type="success" v-bind="$props"/>
    <BaseProgress :value="value" type="warning" v-bind="$props"/>
    <BaseProgress :value="value" type="danger" v-bind="$props"/>
    <BaseProgress :value="value" type="neutral" v-bind="$props"/>
    <BaseProgress :value="value" type="default" v-bind="$props"/>
  </div>`,
});

export const 기본_프로그래스 = Template.bind({});
기본_프로그래스.args = {
  value: 59,
};

export const 모든_타입_프로그래스 = ALLTemplate.bind({});
모든_타입_프로그래스.args = {
  value: 59,
};

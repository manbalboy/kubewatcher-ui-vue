import AnimatedNumber from '../../components/AnimatedNumber.vue';

export default {
  title: 'Component/Base/AnimatedNumber',
  component: AnimatedNumber,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AnimatedNumber },
  template: `<AnimatedNumber v-bind="$props" /> `,
});

export const 기본 = Template.bind({});
기본.args = {
  value: 100,
  duration: 1000,
};

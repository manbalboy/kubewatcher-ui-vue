import BaseCheckbox from '@/components/Inputs/BaseCheckbox.vue';

export default {
  title: 'Component/Inputs/BaseCheckbox',
  component: BaseCheckbox,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseCheckbox },
  template: `<BaseCheckbox v-bind="$props">체크박스 라벨</BaseCheckbox> `,
});

export const 기본 = Template.bind({});
기본.args = {};

export const 비활성화 = Template.bind({});
비활성화.args = {
  disabled: true,
};

export const 체크 = Template.bind({});
체크.args = {
  checked: true,
};

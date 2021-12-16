import IconCheckbox from '@/components/Inputs/IconCheckbox.vue';

export default {
  title: 'Component/Inputs/IconCheckbox',
  component: IconCheckbox,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { IconCheckbox },
  template: `<IconCheckbox v-model="checkValue" v-bind="$props"/>`,

  data() {
    return {
      checkValue: true,
    };
  },
});

export const 기본_아이콘_체크박스 = Template.bind({});
기본_아이콘_체크박스.args = {
  icon: 'tim-icons icon-bell-55',
  title: '기본타이틀',
  name: 'test name',
};

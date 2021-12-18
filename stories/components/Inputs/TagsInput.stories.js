import TagsInput from '@/components/Inputs/TagsInput.vue';
// eslint-disable-next-line import/no-webpack-loader-syntax
import '!style-loader!css-loader!element-ui/lib/theme-chalk/index.css';
const typeArr = ['primary', 'gray', 'success', 'warning', 'danger'];
export default {
  title: 'Component/Inputs/TagsInput',
  component: TagsInput,
  argTypes: {
    tagType: { control: 'select', options: typeArr },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TagsInput },
  template: `<div><TagsInput v-model="dynamicTags" /></div>`,
  data() {
    return {
      dynamicTags: ['Tag 1', 'Tag 2', 'Tag 3'],
    };
  },
});

export const 기본 = Template.bind({});
기본.args = {};

export const GRAY_타입 = Template.bind({});
GRAY_타입.args = {
  tagType: 'gray',
};

export const SUCCESS_타입 = Template.bind({});
SUCCESS_타입.args = {
  tagType: 'success',
};

export const WARNING_타입 = Template.bind({});
WARNING_타입.args = {
  tagType: 'warning',
};

export const DANGER_타입 = Template.bind({});
DANGER_타입.args = {
  tagType: 'danger',
};

import BaseInput from '../../../components/Inputs/BaseInput.vue';

export default {
  title: 'Component/Inputs/BaseInput',
  component: BaseInput,
  argTypes: {
    tag: { control: 'text' },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseInput },
  template: `<BaseInput placeholder="Email" type="text" v-bind="$props" v-model="ttt" @keydown.enter="TTT" />`,
  data() {
    return {
      ttt: 'ffff',
    };
  },

  methods: {
    TTT(evt) {
      console.log(evt.target.value);
    },
  },
});

export const 기본_형태_버튼 = Template.bind({});

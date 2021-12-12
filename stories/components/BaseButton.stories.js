import BaseButton from '../../components/BaseButton.vue';

const typeArr = ['default', 'primary', 'info', 'success', 'warning', 'danger', 'neutral', 'link'];
const sizeArr = ['sm', 'lg'];
const btnTypeArr = ['button', 'reset', 'submit'];

export default {
  title: 'Component/Base/BaseButton',
  component: BaseButton,
  argTypes: {
    tag: { control: 'text' },
    round: { control: 'boolean' },
    block: { control: 'boolean' },
    simple: { control: 'boolean' },
    link: { control: 'boolean' },
    loading: { control: 'boolean' },
    icon: { control: 'boolean' },
    wide: { control: 'boolean' },
    size: { control: 'select', options: sizeArr },
    type: { control: 'select', options: typeArr },
    nativeType: { control: 'select', options: btnTypeArr },
  },
};

const allTypeTemplate = () => {
  return typeArr
    .map(item => {
      return `<BaseButton @click="onClick" type="${item}" v-bind="$props" />`;
    })
    .join('');
};

const allSizeTemplate = () => {
  const sizeTemplateArr = [sizeArr[0], '', sizeArr[1]];
  return sizeTemplateArr
    .map(item => {
      return `<span style="color: #2bffc6; margin: 0 10px">${
        item === '' ? '기본(값 없음)' : item
      } :</span><BaseButton @click="onClick" size="${item}" v-bind="$props" />`;
    })
    .join('');
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseButton },
  template: `<BaseButton @click="onClick" v-bind="$props" />`,
  methods: {
    onClick(...arg) {
      console.log('onClick', arg);
    },
  },
});

const IconTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseButton },
  template: `
    <BaseButton @click="onClick" v-bind="$props" >
      <i class="fab fa-facebook-f"> </i>
    </BaseButton>
  `,
  methods: {
    onClick(...arg) {
      console.log('onClick', arg);
    },
  },
});

const AllTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseButton },
  template: `<div> ${allTypeTemplate()}</div>`,
  methods: {
    onClick(...arg) {
      console.log('onClick', arg);
    },
  },
});

const AllSizeTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseButton },
  template: `<div> ${allSizeTemplate()}</div>`,
  methods: {
    onClick(...arg) {
      console.log('onClick', arg);
    },
  },
});

export const 기본_형태_버튼 = Template.bind({});

export const 둥근_형태_버튼 = Template.bind({});
둥근_형태_버튼.args = {
  round: true,
};

export const 라인_형태_버튼 = Template.bind({});
라인_형태_버튼.args = {
  simple: true,
};

export const 링크_형태_버튼 = Template.bind({});
링크_형태_버튼.args = {
  link: true,
};

export const 블록_형태_버튼 = Template.bind({});
블록_형태_버튼.args = {
  block: true,
};

export const 로딩_형태_버튼 = Template.bind({});
로딩_형태_버튼.args = {
  loading: true,
};

export const 비활성화_버튼 = Template.bind({});
비활성화_버튼.args = {
  disabled: true,
};
export const 아이콘_형태_버튼 = IconTemplate.bind({});
아이콘_형태_버튼.args = {
  icon: true,
};

export const ALL_SIZE_버튼 = AllSizeTemplate.bind({});

export const ALL_타입 = AllTemplate.bind({});
ALL_타입.args = {
  tag: 'a',
};

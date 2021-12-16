import BaseRadio from '../../../components/Inputs/BaseRadio.vue';

export default {
  title: 'Component/Inputs/BaseRadio',
  component: BaseRadio,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseRadio },
  template: `
  <div style="margin: 20px">
    <BaseRadio class="default" v-model="radio1" name="a-value">First Radio</BaseRadio>
    <BaseRadio v-model="radio1" name="b-value">Second Radio</BaseRadio>
    <p>{{radio1}}</p>
  </div>
  `,
  data() {
    return {
      radio1: 'b-value',
    };
  },
});

export const 기본_라디오 = Template.bind({});

export const 인라인_라디오 = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseRadio },
  template: `
  <div style="margin: 20px">
      <BaseRadio v-model="radio1" name="a-value" inline>a</BaseRadio>
      <BaseRadio v-model="radio1" name="b-value" inline>b</BaseRadio>
      <BaseRadio v-model="radio1" name="c-value" inline>c</BaseRadio>
    <p>{{radio1}}</p>
  </div>
  `,
  data() {
    return {
      radio1: 'b-value',
    };
  },
});

import BaseSwitch from '../../components/BaseSwitch.vue';

export default {
  title: 'Component/Base/BaseSwitch',
  component: BaseSwitch,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseSwitch },
  template: `<BaseSwitch v-model="toggle" :on-text="onText" :off-text="offText"/>`,
  data() {
    return {
      toggle: false,
    };
  },
});

const OnSlotTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseSwitch },
  template: `<BaseSwitch v-model="toggle"  :on-text="onText" :off-text="offText">
              <template #on>
                <span style="color: yellow">온</span>
              </template>
            </BaseSwitch>`,
  data() {
    return {
      toggle: false,
    };
  },
});

const OffSlotTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseSwitch },
  template: `<BaseSwitch v-model="toggle"  :on-text="onText" :off-text="offText">
              <template #on>
                <span style="color: yellow">온</span>
              </template>
              <template #off>
                <span style="color: #00f2c3">오프</span>
              </template>
             </BaseSwitch>`,
  data() {
    return {
      toggle: false,
    };
  },
});

export const 기본_스위치 = Template.bind({});
기본_스위치.args = {
  onText: '',
  offText: '',
};

export const ON_TEXT_변경_스위치 = Template.bind({});
ON_TEXT_변경_스위치.args = {
  onText: '온',
};

export const OFF_TEXT_변경_스위치 = Template.bind({});
OFF_TEXT_변경_스위치.args = {
  onText: '온',
  offText: '오프',
};

export const ON_SLOT_스위치 = OnSlotTemplate.bind({});
ON_SLOT_스위치.args = {
  onText: '',
  offText: '',
};

export const OFF_SLOT_스위치 = OffSlotTemplate.bind({});
OFF_SLOT_스위치.args = {
  onText: '',
  offText: '',
};

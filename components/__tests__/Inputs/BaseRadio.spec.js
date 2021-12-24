import { shallowMount } from '@vue/test-utils';
import BaseRadio from '~/components/Inputs/BaseRadio.vue';

describe('BaseRadio', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(BaseRadio);
  });

  describe('props 확인', () => {
    test('name 확인', async () => {
      const testEL = wrapper.find('input');

      await wrapper.setProps({ name: 'test_name' });

      expect(testEL.element.value).toBe('test_name');
    });

    describe('disabled 확인', () => {
      test('class 변경확인', async () => {
        const testEl = wrapper.find('div.form-check');
        expect(testEl.classes()).not.toContain('disabled');

        await wrapper.setProps({ disabled: true });
        expect(testEl.classes()).toContain('disabled');
      });

      test('input disabled 속성 변경', async () => {
        const testEl = wrapper.find('input');
        expect(testEl.attributes().disabled).toBeUndefined();

        await wrapper.setProps({ disabled: true });
        expect(testEl.attributes().disabled).toContain('disabled');
      });
    });

    test('inline 확인', async () => {
      // inline props 에 따라 class 변경
      const testEl = wrapper.find('div.form-check');
      const toggleClassString = 'form-check-inline';

      expect(testEl.classes()).not.toContain(toggleClassString);
      await wrapper.setProps({ inline: true });
      expect(testEl.classes()).toContain(toggleClassString);
    });
  });

  describe('computed 확인', () => {
    test('model 확인', async () => {
      // 1. model 의 value 확인
      await wrapper.setProps({ value: 'test-value' });
      expect(wrapper.vm.model).toBe('test-value');

      // 2. 값을 set 하면 input emmit 발생
      wrapper.vm.model = 'test-value-a';
      expect(wrapper.emitted().input[0]).toEqual(['test-value-a']);
    });
  });
});

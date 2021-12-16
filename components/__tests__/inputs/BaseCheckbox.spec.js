import { shallowMount } from '@vue/test-utils';
import BaseCheckbox from '~/components/Inputs/BaseCheckbox.vue';

describe('BaseCheckbox', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(BaseCheckbox);
  });

  describe('props 확인', () => {
    describe('checked 확인', () => {
      test('기본값 확인 : false', () => {
        expect(wrapper.props().checked).toBe(false);
      });

      test('checked 값에 따라 computed model 값이 변환된다.', async () => {
        expect(wrapper.props().checked).toBe(wrapper.vm.model);
        await wrapper.setProps({ checked: true });
        expect(wrapper.props().checked).toBe(wrapper.vm.model);
      });
    });

    describe('disabled 확인', () => {
      test('기본값 확인 : false', () => {
        expect(wrapper.props().disabled).toBe(false);
      });

      test('disabled 값에 따라 div.form-check 에 disabled class 가 변환된다.', async () => {
        const testEl = wrapper.find('div.form-check');
        expect(testEl.classes()).not.toContain('disabled');

        await wrapper.setProps({ disabled: true });
        expect(testEl.classes()).toContain('disabled');
      });

      test('disabled 값에 따라 input 속성에 disabled 값이 변환된다. ', async () => {
        const testEl = wrapper.find('input');

        expect(testEl.attributes().disabled).toBeUndefined();

        await wrapper.setProps({ disabled: true });

        expect(testEl.attributes().disabled).toBe('disabled');
      });
    });

    describe('inline 확인', () => {
      test('기본값 확인: false', () => {
        expect(wrapper.props().inline).toBe(false);
      });

      test('inline 값에 따라 div.form-check 태그에 form-check-inline class 가 토글된다.', async () => {
        const testEl = wrapper.find('div.form-check');
        expect(testEl.classes()).not.toContain('form-check-inline');

        await wrapper.setProps({ inline: true });
        expect(testEl.classes()).toContain('form-check-inline');
      });

      test('기본 slot 에 기본값으로 &nbsp; text 를 가지는 span tag 가 토글된다.', async () => {
        let testEl = wrapper.find('span.default-inline');
        expect(testEl.exists()).toBe(false);

        await wrapper.setProps({ inline: true });
        testEl = wrapper.find('span.default-inline');
        expect(testEl.exists()).toBe(true);
        expect(testEl.text()).toBe('');
      });
    });
  });

  describe('computed 확인', () => {
    test('model set 을 하게 되면 this.touched 가 true 가 되며 input emit 이 발생한다.', () => {
      expect(wrapper.emitted().input).toBeUndefined();
      expect(wrapper.vm.touched).toBe(false);
      wrapper.vm.model = true;

      expect(wrapper.vm.touched).toBe(true);
      expect(wrapper.emitted().input[0]).toEqual([true]);
    });
  });

  test('mounted 확인 this.cbId 값을 셋팅한다. Math.random().toString(16).slice(2)', () => {
    const testValue = 0.3674897307459164;
    const MathSpy = jest.spyOn(Math, 'random').mockImplementation(() => {
      return testValue;
    });
    wrapper = shallowMount(BaseCheckbox);

    expect(MathSpy).toBeCalled();

    expect(wrapper.vm.cbId).toBe(testValue.toString(16).slice(2));
  });
});

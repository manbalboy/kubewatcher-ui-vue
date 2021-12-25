import { shallowMount } from '@vue/test-utils';
import IconCheckbox from '~/components/Inputs/IconCheckbox.vue';

describe('IconCheckbox', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(IconCheckbox);
  });

  describe('props 확인', () => {
    describe('checked 확인', () => {
      test('기본값 확인 : false', () => {
        expect(wrapper.props().checked).toEqual(false);
      });
    });

    describe('name 확인', () => {
      test('기본값 확인 : ""', () => {
        expect(wrapper.props().name).toBe('');
      });
    });

    describe('title 확인', () => {
      test('기본값 확인 : ""', () => {
        expect(wrapper.props().title).toBe('');
      });
    });

    describe('icon 확인', () => {
      test('기본값 확인 : ""', () => {
        expect(wrapper.props().icon).toBe('');
      });
    });

    describe('disabled 확인', () => {
      test('기본값 확인 : false', () => {
        expect(wrapper.props().disabled).toBe(false);
      });
    });
  });

  describe('methods 확인', () => {
    test('updateValue 호출되면 input emit 발생', () => {
      // given
      expect(wrapper.emitted().input).toBeUndefined();

      // when
      wrapper.vm.updateValue();

      // then
      expect(wrapper.emitted().input).toBeDefined();
    });
  });
});

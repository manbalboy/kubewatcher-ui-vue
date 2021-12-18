import { shallowMount } from '@vue/test-utils';
import BaseInput from '~/components/Inputs/BaseInput.vue';
import { propsDefaultCheck } from '~/components/__tests__/test-utils/utils.js';

describe('BaseInput', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(BaseInput);
  });

  describe('props 확인', () => {
    describe('required 확인', () => {
      test('label 이 있고 required 가 true 이면 label 에 * 문자가 포함된다.', async () => {
        // given
        await wrapper.setProps({ label: '테스트라벨' });
        const testEl = wrapper.find('label');
        expect(testEl.exists()).toBeTruthy();
        expect(testEl.text()).not.toContain('*');

        // when
        await wrapper.setProps({ required: true });

        // then
        expect(testEl.text()).toContain('*');
      });
    });

    describe('label 확인', () => {
      test('기본값은 빈문자열이다.', () => {
        expect(wrapper.props().label).toBe('');
      });

      test('값이 셋팅되면 div.form-group tag 에 has-label class 가 설정된다.', async () => {
        // given
        const testEl = wrapper.find('div.form-group');
        const testClassName = 'has-label';
        expect(testEl.exists()).toBeTruthy();
        expect(testEl.classes()).not.toContain(testClassName);

        // when
        await wrapper.setProps({ label: '테스트 Label' });

        // then
        expect(testEl.classes()).toContain(testClassName);
      });

      test('slot:label 없을때 label 값의 유무에 따라 label 이 활성화되며 그 값이 label text 에 포함된다.', async () => {
        // given
        const testLabelString = '테스트라벨';
        let testEl = wrapper.find('label');
        expect(testEl.exists()).toBeFalsy();

        // when
        await wrapper.setProps({ label: testLabelString });

        // then
        testEl = wrapper.find('label');
        expect(testEl.exists()).toBeTruthy();
        expect(testEl.text()).toContain(testLabelString);
      });
    });

    describe('error 확인', () => {
      test('기본값 확인 빈문자열', () => {
        expect(wrapper.props().error).toBe('');
      });

      test('error 값이 있을 경우에  has-danger class 활성화', async () => {
        // given
        const testEl = wrapper.find('div.form-group');
        const testClassString = 'has-danger';
        expect(testEl.exists()).toBe(true);
        expect(testEl.classes()).not.toContain(testClassString);

        // when
        await wrapper.setProps({ error: '에러 테스트' });

        expect(testEl.classes()).toContain(testClassString);
      });

      test('slot name=error 가 없을경우 error 값이 있을경우 label.class 가 활성화 되며 label text 가 error 로 반영된다.', async () => {
        // given
        expect(wrapper.vm.$slots.error).toBeUndefined();
        const testErrorString = '테스트에러';
        let testEl;
        testEl = wrapper.find('label.error');
        expect(testEl.exists()).toBe(false);

        // when
        await wrapper.setProps({ error: testErrorString });
        testEl = wrapper.find('label.error');

        // then
        expect(testEl.exists()).toBe(true);
        expect(testEl.text()).toBe(testErrorString);
      });
      test('기본값 확인', async () => {});
      test('기본값 확인', async () => {});
    });

    describe('value 확인', () => {
      test('초기값 확인 : 빈문자 열', () => {
        expect(wrapper.props().value).toBe('');
      });

      test('value 값이 변경되면 input 의 value 에 값이 setting', async () => {
        // given
        const testEl = wrapper.find('input');
        const testValueString = '테스트 value';
        expect(testEl.exists()).toBe(true);
        expect(testEl.element.value).toBe('');

        // when
        await wrapper.setProps({ value: testValueString });

        // then
        expect(testEl.element.value).toBe(testValueString);
      });
    });

    describe('addonRightIcon 확인', () => {
      test('기본값 확인 : 빈문자열', () => {
        propsDefaultCheck(wrapper, 'addonRightIcon', '');
      });

      test(`slot name=addonRight 없을 때 addonRightIcon 값 에 따라. div.input-group-append tag 가 활성화 된다.`, async () => {
        // given
        let testEl = wrapper.find('div.input-group-append');
        expect(testEl.exists()).toBe(false);
        expect(wrapper.vm.$slots.addonRight).toBeUndefined();

        // when
        await wrapper.setProps({ addonRightIcon: 'class-icon-test' });

        // then
        testEl = wrapper.find('div.input-group-append');
        expect(testEl.exists()).toBe(true);
      });

      test('addonRightIcon 값이 setting 되면 i 태그에 addonRightIcon 값이 class 로 셋팅된다.', async () => {
        // given
        const testValueString = 'class-test-icon';
        let testEl;
        testEl = wrapper.find(`i.${testValueString}`);
        expect(testEl.exists()).toBe(false);

        // when
        await wrapper.setProps({ addonRightIcon: testValueString });

        // then
        testEl = wrapper.find(`i.${testValueString}`);
        expect(testEl.exists()).toBe(true);
      });
    });

    describe('addonLeftIcon 확인', () => {
      test('기본값 확인 : 빈문자열', () => {
        propsDefaultCheck(wrapper, 'addonLeftIcon', '');
      });

      test(`slot name=addonLeft 없을 때 addonLeftIcon 값 에 따라. div.input-group-prepend tag 가 활성화 된다.`, async () => {
        // given
        let testEl = wrapper.find('div.input-group-prepend');
        expect(testEl.exists()).toBe(false);
        expect(wrapper.vm.$slots.addonLeft).toBeUndefined();

        // when
        await wrapper.setProps({ addonLeftIcon: 'class-icon-test' });

        // then
        testEl = wrapper.find('div.input-group-prepend');
        expect(testEl.exists()).toBe(true);
      });

      test('addonLeftIcon 값이 setting 되면 i 태그에 addonLeftIcon 값이 class 로 셋팅된다.', async () => {
        // given
        const testValueString = 'class-test-icon';
        let testEl;
        testEl = wrapper.find(`i.${testValueString}`);
        expect(testEl.exists()).toBe(false);

        // when
        await wrapper.setProps({ addonLeftIcon: testValueString });

        // then
        testEl = wrapper.find(`i.${testValueString}`);
        expect(testEl.exists()).toBe(true);
      });
    });
  });

  describe('computed 확인', () => {
    describe('hasIcon', () => {
      test('computed hasLeftAddon 가 true 이면 true 를 반환', () => {
        // given when
        wrapper = shallowMount(BaseInput, {
          propsData: {
            addonLeftIcon: 'test-class',
          },
        });
        expect(wrapper.vm.hasLeftAddon).toBe(true);

        // then
        expect(wrapper.vm.hasIcon).toBe(true);
      });

      test('computed hasRightAddon 가 true 이면 true 를 반환', () => {
        // given when
        wrapper = shallowMount(BaseInput, {
          propsData: {
            addonRightIcon: 'test-class',
          },
        });
        expect(wrapper.vm.hasRightAddon).toBe(true);

        // then
        expect(wrapper.vm.hasIcon).toBe(true);
      });

      test('computed hasLeftAddon,hasRightAddon  가 false 이면 false 를 반환', () => {
        // given when
        expect(wrapper.vm.hasLeftAddon).toBe(false);
        expect(wrapper.vm.hasRightAddon).toBe(false);

        // then
        expect(wrapper.vm.hasIcon).toBe(false);
      });
    });

    describe('hasRightAddon 확인', () => {
      test('$slots.addonRight 과 addonRightIcon 값이 없으면 false 를 반환한다.', () => {
        // given when
        expect(wrapper.vm.$slots.addonRight).toBeUndefined();
        expect(wrapper.props().addonRightIcon).toBe('');

        // then
        expect(wrapper.vm.hasRightAddon).toBe(false);
      });

      test('$slots.addonRight 값이 있으면 true 를 반환한다.', () => {
        // given when
        wrapper = shallowMount(BaseInput, {
          slots: {
            addonRight: '<div>testSlot</div>',
          },
        });

        // then
        expect(wrapper.vm.hasRightAddon).toBe(true);
      });

      test('addonRightIcon 값이 있으면 true 를 반환한다.', () => {
        // given when
        wrapper = shallowMount(BaseInput, {
          propsData: {
            addonRightIcon: 'test-class',
          },
        });

        // then
        expect(wrapper.vm.hasRightAddon).toBe(true);
      });
    });

    describe('hasLeftAddon 확인', () => {
      test('$slots.addonLeft 과 addonLeftIcon 값이 없으면 false 를 반환한다.', () => {
        // given when
        expect(wrapper.vm.$slots.addonLeft).toBeUndefined();
        expect(wrapper.props().addonLeftIcon).toBe('');

        // then
        expect(wrapper.vm.hasLeftAddon).toBe(false);
      });

      test('$slots.addonLeft 값이 있으면 true 를 반환한다.', () => {
        // given when
        wrapper = shallowMount(BaseInput, {
          slots: {
            addonLeft: '<div>testSlot</div>',
          },
        });

        // then
        expect(wrapper.vm.hasLeftAddon).toBe(true);
      });

      test('addonLeftIcon 값이 있으면 true 를 반환한다.', () => {
        // given when
        wrapper = shallowMount(BaseInput, {
          propsData: {
            addonLeftIcon: 'test-class',
          },
        });

        // then
        expect(wrapper.vm.hasLeftAddon).toBe(true);
      });
    });

    describe('listeners 확인', () => {
      test('listeners 는 상속받은 $listeners 객체와 input, blur, focus 만 재정의한다.', () => {
        const testListeners = {
          ...wrapper.vm.$listeners,
          input: wrapper.vm.onInput,
          blur: wrapper.vm.onBlur,
          focus: wrapper.vm.onFocus,
        };

        expect(wrapper.vm.listeners).toEqual(testListeners);
      });
    });
  });

  describe('methods 확인', () => {
    describe('onInput() 확인', () => {
      test('onInput 메서드가 호출되면 input emit 이 호출된다.', () => {
        // given
        expect(wrapper.emitted().input).toBeUndefined();

        // when
        wrapper.vm.onInput({ target: { value: 'test' } });

        // then
        expect(wrapper.emitted().input[0]).toEqual(['test']);
      });
    });

    describe('onFocus() 확인', () => {
      test('onFocus 메서드가 호출되면 focus emit 이 호출된다.', () => {
        // given
        const testObject = { test: 'test' };
        expect(wrapper.emitted().focus).toBeUndefined();

        // when
        wrapper.vm.onFocus(testObject);

        // then
        expect(wrapper.emitted().focus[0]).toEqual([testObject]);
      });
    });

    describe('onBlur() 확인', () => {
      test('onBlur 메서드가 호출되면 blur emit 이 호출된다.', () => {
        // given
        const testObject = { test: 'test' };
        expect(wrapper.emitted().blur).toBeUndefined();

        // when
        wrapper.vm.onBlur(testObject);

        // then
        expect(wrapper.emitted().blur[0]).toEqual([testObject]);
      });
    });
  });
});

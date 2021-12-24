import { mount, shallowMount } from '@vue/test-utils';
import Tabs from '~/components/Tabs/Tabs.vue';
import Tab from '~/components/Tabs/Tab.vue';

describe('Tab', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Tab);
  });

  describe('inject 확인', () => {
    test('addTab 기본값 function type 확인', () => {
      expect(typeof wrapper.vm.$options.inject.removeTab.default).toBe('function');
    });

    test('removeTab 기본값 function type 확인', () => {
      expect(typeof wrapper.vm.$options.inject.removeTab.default).toBe('function');
    });

    describe('Tabs slot 으로 실제 inject 값 확인', () => {
      let testTabComponent;
      beforeEach(() => {
        wrapper = mount(Tabs, {
          slots: {
            default: Tab,
          },
        });

        testTabComponent = wrapper.findComponent({ name: 'Tab' });
      });

      test('addTab provide/inject 비교', () => {
        expect(wrapper.vm._provided.addTab).toBe(testTabComponent.vm.addTab);
      });

      test('removeTab provide/inject 비교', () => {
        expect(wrapper.vm._provided.removeTab).toBe(testTabComponent.vm.removeTab);
      });
    });
  });

  describe('props 확인', () => {
    describe('label 확인', () => {
      test('기본값 확인 : null', () => {
        expect(wrapper.props().label).toBe(null);
      });
    });

    describe('id 확인', () => {
      test('기본값 확인 : null', () => {
        expect(wrapper.props().id).toBe(null);
      });
    });
  });
  describe('id 확인', () => {
    test('부모 el 에서 자신을 삭제한다.', () => {
      wrapper = mount(Tabs, {
        slots: {
          default: Tab,
        },
      });

      const testTabComponent = wrapper.findComponent({ name: 'Tab' });
      const removeChildSpy = jest.spyOn(testTabComponent.vm.$el.parentNode, 'removeChild');
      expect(removeChildSpy).not.toBeCalled();

      // when
      wrapper.destroy();

      // then
      expect(removeChildSpy).toBeCalled();
    });

    test('부모 el 에서 자신을 삭제한다.2', () => {
      const removeTabSpy = jest.spyOn(wrapper.vm, 'removeTab');
      expect(removeTabSpy).not.toBeCalled();

      // when
      wrapper.destroy();

      // then
      expect(removeTabSpy).toBeCalled();
    });
  });
});

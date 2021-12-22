import { shallowMount } from '@vue/test-utils';
import Collapse from '@/components/Collapse/Collapse.vue';
import CollapseItem from '@/components/Collapse/CollapseItem.vue';

describe('CollapseItem Component', () => {
  let wrapper;
  let testCollapseItem;
  beforeEach(() => {
    wrapper = shallowMount(Collapse, {
      slots: {
        default: [CollapseItem],
      },
    });

    testCollapseItem = wrapper.findComponent({ name: 'CollapseItem' });
  });

  describe('props 확인', () => {
    describe('title 확인', () => {
      test('기본값 확인 : ""', () => {
        expect(testCollapseItem.vm.title).toBe('');
      });
    });

    describe('id 확인', () => {
      test('기본값 확인 : ""', () => {
        expect(testCollapseItem.vm.id).toBe('');
      });
    });
  });

  describe('inject 확인', () => {
    describe('animationDuration 확인', () => {
      test('default 값 확인 : 250', () => {
        expect(testCollapseItem.vm.$options.inject.animationDuration.default).toBe(250);
      });

      test('provide 와 동일 확인', () => {
        expect(wrapper.vm._provided.animationDuration).toBe(testCollapseItem.vm.animationDuration);
      });
    });

    describe('multipleActive 확인', () => {
      test('default 값 확인 : false', () => {
        expect(testCollapseItem.vm.$options.inject.multipleActive.default).toBe(false);
      });

      test('provide 와 동일 확인', () => {
        expect(wrapper.vm._provided.multipleActive).toBe(testCollapseItem.vm.multipleActive);
      });
    });

    describe('addItem 확인', () => {
      test('provide 와 동일 확인', () => {
        expect(wrapper.vm._provided.addItem).toEqual(testCollapseItem.vm.addItem);
      });
    });

    describe('removeItem 확인', () => {
      test('provide 와 동일 확인', () => {
        expect(wrapper.vm._provided.removeItem).toEqual(testCollapseItem.vm.removeItem);
      });
    });

    describe('deactivateAll 확인', () => {
      test('provide 와 동일 확인', () => {
        expect(wrapper.vm._provided.deactivateAll).toEqual(testCollapseItem.vm.deactivateAll);
      });
    });
  });

  describe('computed 확인', () => {
    describe('itemId 확인', () => {
      test('props 로 id 값 이 있으면 id 값을 반환한다. ', async () => {
        // given
        wrapper = shallowMount(CollapseItem);
        expect(wrapper.vm.itemId).toBe('');

        // when
        await wrapper.setProps({ id: 'test' });

        // then
        expect(wrapper.vm.itemId).toBe('test');
      });

      test('props 로 id 값 이 없으면 title 값을 반환한다. ', async () => {
        // given
        wrapper = shallowMount(CollapseItem);
        expect(wrapper.vm.itemId).toBe('');
        expect(wrapper.props().id).toBeFalsy();

        // when
        await wrapper.setProps({ title: 'title' });

        // then
        expect(wrapper.vm.itemId).toBe('title');
      });
    });
  });

  describe('destroyed 확인', () => {
    test('removeChild 와 removeItem 이 호출된다.', () => {
      // given
      const removeChildSpy = jest.spyOn(testCollapseItem.vm.$parent.$el, 'removeChild');
      const removeItemSpy = jest.spyOn(testCollapseItem.vm, 'removeItem');
      expect(removeChildSpy).not.toBeCalled();
      expect(removeItemSpy).not.toBeCalled();

      // when
      wrapper.destroy();

      // then
      expect(removeChildSpy).toBeCalled();
      expect(removeItemSpy).toBeCalled();
    });
  });

  describe('methods 확인', () => {
    beforeEach(() => {
      wrapper = shallowMount(CollapseItem);
    });
    describe('activate 확인', () => {
      test('multipleActive 값이 false 일 경우 deactivateAll() 함수가 호출된다.', () => {
        // given
        const deactivateAllSpy = jest.spyOn(wrapper.vm, 'deactivateAll');
        expect(wrapper.vm.multipleActive).toBe(false);
        expect(deactivateAllSpy).not.toBeCalled();

        // when
        wrapper.vm.activate();

        // then
        expect(deactivateAllSpy).toBeCalled();
      });
      test('메서드가 호출되면 active 값이 토글 된다.', () => {
        // given
        expect(wrapper.vm.active).toBe(false);

        // when
        wrapper.vm.activate();
        // then
        expect(wrapper.vm.active).toBe(true);

        // when
        wrapper.vm.activate();
        // then
        expect(wrapper.vm.active).toBe(false);
      });
    });
  });
});

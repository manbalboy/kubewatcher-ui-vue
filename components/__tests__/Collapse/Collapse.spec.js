import { mount, shallowMount } from '@vue/test-utils';
import Collapse from '@/components/Collapse/Collapse.vue';
import CollapseItem from '@/components/Collapse/CollapseItem.vue';

describe('Collapse Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Collapse);
  });

  describe('props 확인', () => {
    describe('animationDuration 확인', () => {
      test('기본값 확인 : 250', () => {
        expect(wrapper.vm.animationDuration).toBe(250);
      });
    });

    describe('multipleActive 확인', () => {
      test('기본값 확인 : true', () => {
        expect(wrapper.vm.multipleActive).toBe(true);
      });
    });

    describe('activeIndex 확인', () => {
      test('기본값 확인 : -1', () => {
        expect(wrapper.vm.activeIndex).toBe(-1);
      });
    });
  });

  describe('provide 확인', () => {
    test('provide 객체 확인', () => {
      const testProvideObject = {
        animationDuration: wrapper.props().animationDuration,
        multipleActive: wrapper.props().multipleActive,
        addItem: wrapper.vm.addItem,
        removeItem: wrapper.vm.removeItem,
        deactivateAll: wrapper.vm.deactivateAll,
      };
      expect(wrapper.vm._provided).toEqual(testProvideObject);
    });
  });

  describe('methods 확인', () => {
    beforeEach(() => {
      wrapper = mount(Collapse, {
        slots: {
          default: [CollapseItem, CollapseItem],
        },
      });
    });
    describe('addItem 확인', () => {
      beforeEach(() => {
        wrapper = mount(Collapse, {
          slots: {
            default: '<div></div>',
          },
        });
      });

      test('slots.default 객체에 자기자신이 있으면 items 에 추가한다.', () => {
        // given
        const testSpy = jest.spyOn(wrapper.vm.$slots.default, 'indexOf').mockImplementation(() => 0);
        expect(wrapper.vm.items).toEqual([]);

        // when
        wrapper.vm.addItem('test');

        // then
        expect(wrapper.vm.items).toEqual(['test']);
        expect(testSpy).toBeCalled();
      });
    });

    describe('removeItem 확인', () => {
      test('함수에 item 인자를 넣으면 해당 item 이 삭제된다.', () => {
        // given
        expect(wrapper.vm.items.length).toBe(2);

        // when
        wrapper.vm.removeItem(wrapper.vm.items[0]);

        // then
        expect(wrapper.vm.items.length).toBe(1);
      });
    });

    describe('deactivateAll 확인', () => {
      test('함수를 호출 하면 모든 CollapseItem 의 active 가 false 가 된다.', () => {
        // given
        const testAllCollapseItem = wrapper.findAllComponents(CollapseItem);
        expect(wrapper.vm.items.length).toBe(2);
        testAllCollapseItem.at(0).vm.active = true;
        testAllCollapseItem.at(1).vm.active = true;

        expect(wrapper.vm.items[0].active).toBe(true);
        expect(wrapper.vm.items[1].active).toBe(true);

        // when
        wrapper.vm.deactivateAll();

        // then
        expect(wrapper.vm.items[0].active).toBe(false);
        expect(wrapper.vm.items[1].active).toBe(false);
      });
    });

    describe('activateItem 확인', () => {
      test('this.activeIndex 값이 -1 아닐 때 index 값의 item 이 active 상태가 된다.', async () => {
        // given
        const testAllCollapseItem = wrapper.findAllComponents(CollapseItem);
        expect(wrapper.vm.items.length).toBe(2);
        expect(wrapper.vm.items[1].active).toBe(false);

        // when
        await wrapper.setProps({ activeIndex: 1 });

        // then
        expect(wrapper.vm.items[1].active).toBe(true);
        expect(testAllCollapseItem.at(1).vm.active).toBe(true);
      });
    });
  });
});

import { mount, shallowMount } from '@vue/test-utils';
import Tabs from '~/components/Tabs/Tabs.vue';
import Tab from '~/components/Tabs/Tab.vue';

describe('Tabs', () => {
  let wrapper;
  const testSlots = [Tab, Tab, Tab];

  beforeEach(() => {
    wrapper = shallowMount(Tabs, {
      slots: {
        default: testSlots,
      },
    });
  });

  describe('props 확인', () => {
    describe('type 확인', () => {
      let typePropsObject;
      beforeEach(() => {
        typePropsObject = wrapper.vm.$options.props.type;
      });

      test('default 값 확인 : primary', () => {
        // given
        const defaultValue = typePropsObject.default;

        // then
        expect(defaultValue).toBe('primary');
      });
      test('validator 확인', () => {
        // given
        const acceptedValues = ['primary', 'info', 'success', 'warning', 'danger'];

        // then
        acceptedValues.forEach(type => {
          expect(typePropsObject.validator(type)).toBeTruthy();
        });
      });
      test('값이 변하면 ul tag 의 클래스에 nav-pills-{type} 값이 setting', async () => {
        // given
        const testElement = wrapper.find('ul');
        const acceptedValues = ['primary', 'info', 'success', 'warning', 'danger'];
        expect(wrapper.props().type).toBe('primary');
        expect(testElement.exists()).toBe(true);
        expect(testElement.classes()).toContain(`nav-pills-${wrapper.props().type}`);

        // when then
        for (const type of acceptedValues) {
          await wrapper.setProps({ type });
          expect(testElement.classes()).toContain(`nav-pills-${wrapper.props().type}`);
        }
      });
    });

    describe('tabNavWrapperClasses 확인', () => {
      test('tabNavWrapperClasses 값이 setting 되면 div tag 에 class 값이 셋팅된다.', async () => {
        // given
        const testElement = wrapper.findAll('div').at(1);
        const testValueArray = [{ 'class-test': true }, 'class-test'];
        expect(testElement.classes()).not.toContain('class-test');

        for (const tabNavWrapperClasses of testValueArray) {
          // when
          await wrapper.setProps({ tabNavWrapperClasses });

          // then
          expect(testElement.classes()).toContain('class-test');
        }
      });
    });

    describe('tabNavClasses 확인', () => {
      test('tabNavClasses 값이 setting 되면 ul tag 에 class 값이 셋팅된다.', async () => {
        // given
        const testElement = wrapper.find('ul');
        const testValueArray = [{ 'class-test': true }, 'class-test'];
        expect(testElement.classes()).not.toContain('class-test');

        for (const tabNavClasses of testValueArray) {
          // when
          await wrapper.setProps({ tabNavClasses });

          // then
          expect(testElement.classes()).toContain('class-test');
        }
      });
    });

    describe('tabContentClasses 확인', () => {
      test('tabContentClasses 값이 setting 되면 div.tab-content tag 에 class 값이 셋팅된다.', async () => {
        // given
        const testElement = wrapper.find('div.tab-content');
        const testValueArray = [{ 'class-test': true }, 'class-test'];
        expect(testElement.classes()).not.toContain('class-test');

        for (const tabContentClasses of testValueArray) {
          // when
          await wrapper.setProps({ tabContentClasses });

          // then
          expect(testElement.classes()).toContain('class-test');
        }
      });
    });

    describe('vertical 확인', () => {
      test('vertical 값이 setting 되면 ul tag 에 flex-column class 값이 셋팅된다.', async () => {
        // given
        const testElement = wrapper.find('ul');
        expect(testElement.classes()).not.toContain('flex-column');

        // when
        await wrapper.setProps({ vertical: true });

        // then
        expect(testElement.classes()).toContain('flex-column');
      });
    });

    describe('square 확인', () => {
      test('square 값이 setting 되면 ul tag 에 nav-pills-icons class 값이 셋팅된다.', async () => {
        // given
        const testElement = wrapper.find('ul');
        expect(testElement.classes()).not.toContain('nav-pills-icons');

        // when
        await wrapper.setProps({ square: true });

        // then
        expect(testElement.classes()).toContain('nav-pills-icons');
      });
    });

    describe('centered 확인', () => {
      test('centered 값이 setting 되면 ul tag 에 justify-content-center class 값이 셋팅된다.', async () => {
        // given
        const testElement = wrapper.find('ul');
        expect(testElement.classes()).not.toContain('justify-content-center');

        // when
        await wrapper.setProps({ centered: true });

        // then
        expect(testElement.classes()).toContain('justify-content-center');
      });
    });

    describe('value 확인', () => {
      test('기본값 확인 : ""', () => {
        expect(wrapper.props().value).toBe('');
      });

      test('value 값이 변경되면 findAndActivateTab() 메서드가 호출된다.', async () => {
        // given
        const findAndActivateTabSpy = jest.spyOn(wrapper.vm, 'findAndActivateTab');
        expect(findAndActivateTabSpy).not.toBeCalled();

        // when
        await wrapper.setProps({ value: 'test' });

        // then
        expect(findAndActivateTabSpy).toBeCalled();
        expect(findAndActivateTabSpy).toBeCalledTimes(1);
        expect(findAndActivateTabSpy).toBeCalledWith('test');

        // when
        await wrapper.setProps({ value: 'testA' });

        // then
        expect(findAndActivateTabSpy).toBeCalledTimes(2);
        expect(findAndActivateTabSpy).toBeCalledWith('testA');
      });
    });
  });

  describe('provide 확인', () => {
    test('return 값 확인', () => {
      const testValue = {
        addTab: wrapper.vm.addTab,
        removeTab: wrapper.vm.removeTab,
      };

      expect(wrapper.vm._provided).toEqual(testValue);
    });
  });

  describe('methods 확인', () => {
    describe('findAndActivateTab 확인', () => {
      test('인자값으로 넘겨준 라벨이 포함된 tab 이 있다면 this.activateTab() 메서드가 호출된다.', async () => {
        // given
        const activateTabSpy = jest.spyOn(wrapper.vm, 'activateTab');
        const TabComponent = wrapper.findComponent({ name: 'Tab' });
        const testTabsArray = [{ label: 'test' }];
        await wrapper.setData({ tabs: testTabsArray });
        expect(TabComponent.props().label).toBeFalsy();
        expect(activateTabSpy).not.toBeCalled();

        // when
        wrapper.vm.findAndActivateTab('test');

        // then
        expect(activateTabSpy).toBeCalled();
      });
      test('인자값으로 넘겨준 라벨이 포함된 tab 이 없다면 this.activateTab() 메서드가 호출되지 않는다.', () => {
        // given
        const activateTabSpy = jest.spyOn(wrapper.vm, 'activateTab');
        const TabComponent = wrapper.findComponent({ name: 'Tab' });
        expect(TabComponent.props().label).toBeFalsy();
        expect(activateTabSpy).not.toBeCalled();

        // when
        wrapper.vm.findAndActivateTab('test');

        // then
        expect(activateTabSpy).not.toBeCalled();
      });
    });

    describe('activateTab 확인', () => {
      test('함수가 호출되면 deactivateTabs 가 호출된다.', () => {
        // given
        const deactivateTabsSpy = jest.spyOn(wrapper.vm, 'deactivateTabs');
        expect(deactivateTabsSpy).not.toBeCalled();

        // when
        wrapper.vm.activateTab([{ active: false }]);

        // then
        expect(deactivateTabsSpy).toBeCalled();
      });

      test('넘겨준 active 인자값이 true 값으로 변환된다.', () => {
        // given
        const testTabMock = [{ active: false }, { active: false }, { active: false }];
        expect(testTabMock[1]).toEqual({ active: false });
        // when
        wrapper.vm.activateTab(testTabMock[1]);

        // then
        expect(testTabMock[1]).toEqual({ active: true });
      });
    });

    describe('deactivateTabs 확인', () => {
      test('모든 tabs 에 있는 객체의 active 값이 false 로 변경된다.', async () => {
        // given
        const testTabMock = [{ active: true }, { active: true }, { active: true }];
        await wrapper.setData({ tabs: testTabMock });

        // when
        wrapper.vm.deactivateTabs();

        // then
        testTabMock.forEach(item => {
          expect(item).toEqual({ active: false });
        });
      });
    });

    describe('addTab 확인', () => {
      test('activeTabIndex 값이 falsy 값일 때 0번째 인덱스 active 가 true 이다.', () => {
        // when
        expect(wrapper.props().activeTabIndex).toBeFalsy();

        // then
        expect(wrapper.vm.tabs[0].active).toBe(true);
      });

      test('activeTabIndex 값이 true 값일 때 해당번째 index 값이 active true 값이다.', () => {
        // given
        wrapper = shallowMount(Tabs, {
          slots: {
            default: [Tab, Tab, Tab],
          },
          propsData: {
            value: 'test',
            activeTabIndex: 2,
          },
        });

        // then
        expect(wrapper.vm.tabs[2].active).toBe(true);
      });
    });

    describe('removeTab 확인', () => {
      test('인자 값으로 넘겨준 탭이 삭제된다.', async () => {
        // given
        const testTabs = [{ id: 1 }, { id: 2 }, { id: 3 }];
        const expectedValue = [{ id: 1 }, { id: 3 }];
        await wrapper.setData({ tabs: testTabs });

        // when
        wrapper.vm.removeTab(testTabs[1]);

        expect(testTabs).toEqual(expectedValue);
      });
    });
  });
});

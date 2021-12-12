import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import clickOutside from '@/plugins/directives/click-ouside.js';
import BaseDropdown from '@/components/BaseDropdown.vue';

/**
 * You can register global directives here and use them as a plugin in your main Vue instance
 */
Vue.directive('click-outside', clickOutside);

let wrapper;
beforeEach(() => {
  wrapper = shallowMount(BaseDropdown);
});

describe('BaseDropdown props 테스트', () => {
  test('tag 확인', async () => {
    /**
     * 1. default 값 확인
     * 2. tag 값에 따라서 최상위 컴포넌트가 변경된다.
     */

    // 1. default 값 확인
    expect(wrapper.vm.$options.props.tag.default).toBe('div');

    // 2. tag 값에 따라서 최상위 컴포넌트가 변경된다.
    expect(wrapper.props().tag).toBe('div');
    expect(wrapper.find('.dropdown').element.localName).toBe('div');

    await wrapper.setProps({ tag: 'ul' });
    expect(wrapper.props().tag).toBe('ul');
    expect(wrapper.find('.dropdown').element.localName).toBe('ul');
  });

  test('titleTag 확인', async () => {
    /**
     * 1. default 값 확인
     * 2. .dropdown-toggle.no-caret tag 의 localName (tagName, nodeName)이 값으로 대체
     */

    /**
     * 1. default 값 확인
     * 2. tag 값에 따라서 최상위 컴포넌트가 변경된다.
     */

    // 1. default 값 확인
    expect(wrapper.vm.$options.props.titleTag.default).toBe('button');

    // 2. tag 값에 따라서 최상위 컴포넌트가 변경된다.
    expect(wrapper.find('.dropdown-toggle.no-caret').element.localName).toBe('button');

    await wrapper.setProps({ titleTag: 'a' });
    expect(wrapper.find('.dropdown-toggle.no-caret').element.localName).toBe('a');
  });

  test('title 확인', async () => {
    /**
     * ## slot title 이 없을때만 적용
     * 1. .dropdown-toggle.no-caret tag text 값이 title 값으로 셋팅
     */
    const testValue = '안녕하세요 테스트입니다.';

    // 1. .dropdown-toggle.no-caret tag text 값이 title 값으로 셋팅
    await wrapper.setProps({ title: testValue });
    expect(wrapper.find('.dropdown-toggle.no-caret').text()).toBe(testValue);
  });

  test('direction 확인', async () => {
    /**
     * 1. default 값 확인 down
     * 2. validator 확인
     * 3. .dropdown tag class 에 `drop${direction}` class add
     */

    const validatorArray = ['up', 'down'];
    const directionProps = wrapper.vm.$options.props.direction;
    const testElement = wrapper.find('.dropdown');
    // 1. default 값 확인 down
    expect(directionProps.default).toBe('down');

    // 2. validator 확인
    validatorArray.forEach(item => {
      expect(directionProps.validator(item)).toBe(true);
    });

    // 3. .dropdown tag class 에 `drop${direction}` class add
    let direction = 'down';
    expect(testElement.classes()).toContain(`drop${direction}`);
    direction = 'up';
    await wrapper.setProps({ direction });
    expect(testElement.classes()).toContain(`drop${direction}`);
  });

  test('icon 확인', async () => {
    /**
     * 1. i 태그의 icon 클래스를 삽입
     */
    const testClass = 'test-icon-class';
    const testElement = wrapper.find('i');
    expect(testElement.classes()).not.toContain(testClass);

    await wrapper.setProps({ icon: testClass });
    expect(testElement.classes()).toContain(testClass);
  });

  test('titleClasses 확인', async () => {
    /**
     * 1. .dropdown-toggle.no-caret tag class 에 titleClasses 값이 병합
     */
    const testClass = 'test-icon-class';
    const testElement = wrapper.find('.dropdown-toggle.no-caret');
    expect(testElement.classes()).not.toContain(testClass);

    await wrapper.setProps({ titleClasses: testClass });
    expect(testElement.classes()).toContain(testClass);
  });

  test('menuClasses 확인', async () => {
    /**
     * 1. ul.dropdown-menu tag class 에 menuClasses 값 병합
     */
    const testClass = 'test-icon-class';
    const testElement = wrapper.find('ul.dropdown-menu');
    expect(testElement.classes()).not.toContain(testClass);

    await wrapper.setProps({ menuClasses: testClass });
    expect(testElement.classes()).toContain(testClass);
  });

  test('menuOnRight 확인', async () => {
    /**
     *  1. ul.dropdown-menu tag class 에 .dropdown-menu-right 를 병합할 지 여부
     */

    const testElement = wrapper.find('ul.dropdown-menu');
    expect(testElement.classes()).not.toContain('dropdown-menu-right');

    await wrapper.setProps({ menuOnRight: true });
    expect(testElement.classes()).toContain('dropdown-menu-right');
  });
});

describe('BaseDropdown method 및 이벤트 테스트', () => {
  test('toggleDropDown() 메소드 확인', () => {
    /**
     * 1. 호출 하면 isOpen 값이 토글된다.
     * 2. 호출되면 change emit 이 호출되며 isOpen 값과 event 가 같이 인자로 호출된다.
     */
    // 1. 호출 하면 isOpen 값이 토글된다.
    expect(wrapper.vm.isOpen).toBe(false);
    wrapper.vm.toggleDropDown('Test');
    expect(wrapper.vm.isOpen).toBe(true);

    // 2. 호출되면 change emit 이 호출되며 isOpen 값과 event 가 같이 인자로 호출된다.
    expect(wrapper.emitted().change[0]).toEqual([true, 'Test']);

    // 반복 토글
    wrapper.vm.toggleDropDown('TestA');
    expect(wrapper.vm.isOpen).toBe(false);

    // 2. 호출되면 change emit 이 호출되며 isOpen 값과 event 가 같이 인자로 호출된다.
    expect(wrapper.emitted().change[1]).toEqual([false, 'TestA']);
  });

  test('closeDropDown() 메소드 확인', async () => {
    /**
     * 1. 호출 하면 isOpen 값이 false 값이 된다..
     * 2. 호출되면 change emit 이 호출되며 false 값과 event 가 같이 인자로 호출된다.
     */
    await wrapper.setData({ isOpen: true });

    // 1. 호출 하면 isOpen 값이 토글된다.
    expect(wrapper.vm.isOpen).toBe(true);
    wrapper.vm.closeDropDown('Test');
    expect(wrapper.vm.isOpen).toBe(false);

    // 2. 호출되면 change emit 이 호출되며 isOpen 값과 event 가 같이 인자로 호출된다.
    expect(wrapper.emitted().change[0]).toEqual([false, 'Test']);

    // 반복
    wrapper.vm.closeDropDown('Test');
    expect(wrapper.vm.isOpen).toBe(false);

    // 2. 호출되면 change emit 이 호출되며 isOpen 값과 event 가 같이 인자로 호출된다.
    expect(wrapper.emitted().change[1]).toEqual([false, 'Test']);
  });
});

describe('BaseDropdown slot 테스트', () => {
  beforeEach(() => {
    wrapper = shallowMount(BaseDropdown, {
      slots: {
        title: '<span class="test-title">테스트타이틀</span>',
        default: '<div class="test-default">테스트바디</div>',
        'title-container': '<div class="test-title-container">테스트타이틀컨테이너</div>',
      },
    });
  });

  test('default slot 확인', () => {
    expect(wrapper.find('div.test-default').text()).toBe('테스트바디');
  });

  test('title-container slot 확인', () => {
    expect(wrapper.find('div.test-title-container').text()).toBe('테스트타이틀컨테이너');
  });

  test('title slot 확인', () => {
    /**
     * ## title-container slot 이 덮어 씌어지면 무쓸모
     */
    wrapper = shallowMount(BaseDropdown, {
      slots: {
        title: '<span class="test-title">테스트타이틀</span>',
      },
    });
    expect(wrapper.find('span.test-title').text()).toBe('테스트타이틀');
  });
});

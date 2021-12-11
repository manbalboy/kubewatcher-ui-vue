import { shallowMount } from '@vue/test-utils';
import BaseSwitch from '@/components/BaseSwitch.vue';
let wrapper;

beforeEach(() => {
  wrapper = shallowMount(BaseSwitch);
});

describe('BaseSwitch props test', () => {
  test('value 확인', async () => {
    /**
     * 1. value default 값 true
     * 2. value 값이 computed model 값으로 셋팅된다.
     */
    // 1. value default 값 true
    expect(wrapper.props().value).toBe(true);
    expect(wrapper.vm.model).toBe(true);

    // 2. value 값이 computed model 값으로 셋팅된다.
    await wrapper.setProps({ value: false });
    expect(wrapper.vm.model).toBe(false);
  });

  test('onText 확인', async () => {
    /**
     * 1. slot이 없을경우 span.bootstrap-switch-handle-on tag text 에 셋팅
     */
    const testEl = wrapper.find('span.bootstrap-switch-handle-on');
    const onText = '테스트 텍스트';
    // 1. slot이 없을경우 span.bootstrap-switch-handle-on tag text 에 셋팅
    expect(testEl.text()).toBe('');
    await wrapper.setProps({ onText });
    expect(testEl.text()).toBe(onText);
  });

  test('offText 확인', async () => {
    /**
     * 1. slot이 없을경우 span.bootstrap-switch-handle-off.bootstrap-switch-default tag text 에 셋팅
     */
    const testEl = wrapper.find('span.bootstrap-switch-handle-off.bootstrap-switch-default');
    const offText = '테스트 텍스트';

    // 1. slot이 없을경우 span.bootstrap-switch-handle-on tag text 에 셋팅
    expect(testEl.text()).toBe('');
    await wrapper.setProps({ offText });
    expect(testEl.text()).toBe(offText);
  });
});

describe('BaseSwitch computed test', () => {
  test('model 확인', async () => {
    /**
     * 1. model 값 을 read 하면 value 값을 read 한다.
     * 2. model 값에 setting 하면 emit input 이 발생한다.
     */

    const emitTestArray = [true, false, true];
    // 1. model 값 을 read 하면 value 값을 read 한다.
    expect(wrapper.vm.model).toEqual(wrapper.props().value);
    expect(wrapper.vm.model).toEqual(true);
    await wrapper.setProps({ value: !wrapper.vm.value });
    expect(wrapper.vm.model).toEqual(wrapper.props().value);
    expect(wrapper.vm.model).toEqual(false);

    // 2. model 값에 setting 하면 emit input 이 발생한다.
    emitTestArray.forEach(item => (wrapper.vm.model = item));

    for (const key in emitTestArray) {
      expect(...wrapper.emitted().input[key]).toEqual(emitTestArray[key]);
    }
  });
  test('switchClass 확인', async () => {
    /**
     * 1. model 값이 true 이면 bootstrap-switch-on 반환
     * 2. model 값이 false 이면 bootstrap-switch-off 반환
     */
    const returnValue = 'bootstrap-switch-';

    expect(wrapper.vm.model).toBe(true);
    expect(wrapper.vm.switchClass).toBe(`${returnValue}on`);
    expect(wrapper.vm.switchClass).not.toBe(`${returnValue}off`);

    await wrapper.setProps({ value: false });
    expect(wrapper.vm.model).toBe(false);
    expect(wrapper.vm.switchClass).not.toBe(`${returnValue}on`);
    expect(wrapper.vm.switchClass).toBe(`${returnValue}off`);
  });
});

describe('BaseSwitch methods 및 이벤트 test', () => {
  test('triggerToggle() 확인', async () => {
    /**
     * 1. triggerToggle() 호출되면 -> model 토글 -> input emit 발생 -> value 변경 -> model 변경 순으로 작업이 이루어짐
     */

    expect(wrapper.vm.model).toBe(true);
    expect(wrapper.props().value).toBe(true);

    wrapper.vm.triggerToggle();
    expect(wrapper.emitted().input.length).toBe(1);
    await wrapper.setProps({ value: wrapper.emitted().input[0][0] });
    expect(wrapper.vm.model).toBe(false);
  });
});

describe('BaseSwitch slot 테스트', () => {
  test('on slot 확인', () => {
    const testClass = 'on-test';
    const testText = 'ON TEST';
    const testElSelector = `span.bootstrap-switch-handle-on>.${testClass}`;

    let testEl = wrapper.find(testElSelector);
    expect(testEl.exists()).toBe(false);
    wrapper = shallowMount(BaseSwitch, {
      slots: {
        on: `<div class="${testClass}">${testText}</div>`,
      },
    });

    testEl = wrapper.find(testElSelector);
    expect(testEl.exists()).toBe(true);
  });

  test('off slot 확인', () => {
    const testClass = 'off-test';
    const testText = 'OFF TEST';
    const testElSelector = `span.bootstrap-switch-handle-off.bootstrap-switch-default>.${testClass}`;

    let testEl = wrapper.find(testElSelector);

    expect(testEl.exists()).toBe(false);
    wrapper = shallowMount(BaseSwitch, {
      slots: {
        off: `<div class="${testClass}">${testText}</div>`,
      },
    });
    testEl = wrapper.find(testElSelector);
    expect(testEl.exists()).toBe(true);
  });
});

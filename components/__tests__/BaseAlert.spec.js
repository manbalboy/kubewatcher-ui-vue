import { shallowMount } from '@vue/test-utils';
import BaseAlert from '@/components/BaseAlert.vue';
let wrapper;

beforeEach(() => {
  wrapper = shallowMount(BaseAlert);
});

describe('BaseAlert props 테스트', () => {
  test('type 테스트', async () => {
    /**
     * 1. default 값 확인
     * 2. validator 확인
     * 3. 변경점 확인 div.alert 태그 클래스에 alert-{타입벨류}값 셋팅
     */
    const defaultValue = 'default';
    const typeArr = ['default', 'primary', 'info', 'success', 'warning', 'danger'];
    const testEl = wrapper.find('div.alert');

    // 1. default 값 확인
    expect(wrapper.props().type).toBe(defaultValue);

    expect(testEl.exists()).toBeTruthy();

    for (const type of typeArr) {
      // 2. validator 확인
      expect(wrapper.vm.$options.props.type.validator(type)).toBeTruthy();

      // 3. 변경점 확인 div.alert 태그 클래스에 alert-{타입벨류}값 셋팅
      await wrapper.setProps({ type });
      // console.log('classes = ', testEl.classes());
      expect(testEl.classes()).toContain(`alert-${type}`);
    }
  });

  test('dismissible 테스트', async () => {
    /**
     * 1. default 값 확인 false
     * 2. 동작 확인 dismissible 값이 true 일 때 dismiss-icon slot 이 활성화 기본값 체크한다. button.close
     */
    // 1. default 값 확인 false
    expect(wrapper.props().dismissible).toBeFalsy();

    // 2. 동작 확인 dismissible 값이 true 일 때 dismiss-icon slot 이 활성화 기본값 체크한다. button.close
    expect(wrapper.find('button.close').exists()).toBeFalsy();
    await wrapper.setProps({ dismissible: true });
    expect(wrapper.find('button.close').exists()).toBeTruthy();
  });

  test('icon 테스트', async () => {
    /**
     * 1. default 값 확인 ''
     * 2. 동작확인 icon 이 셋팅되면 div.alert 태그에 alert-with-icon class add
     * 3. dismissible true 일 때만 span.{셋팅값} 의 태그가 활성화 됨
     */

    const defaultValue = '';
    const iconValue = 'tim-icons icon-bell-55';
    const iconClassValue = '.tim-icons.icon-bell-55';
    const testEl = wrapper.find('div.alert');

    // 1. default 값 확인 ''
    expect(wrapper.props().icon).toBe(defaultValue);

    // 2. 동작확인 icon 이 셋팅되면 div.alert 태그에 alert-with-icon class add
    expect(testEl.classes()).not.toContain('alert-with-icon');
    await wrapper.setProps({ icon: iconValue });
    expect(testEl.classes()).toContain('alert-with-icon');

    // 3. dismissible true 일 때만 span.{셋팅값} 의 태그가 활성화 됨
    expect(wrapper.find(`span${iconClassValue}`).exists()).toBeFalsy();
    await wrapper.setProps({ dismissible: true });
    expect(wrapper.find(`span${iconClassValue}`).exists()).toBeTruthy();
  });
});

describe('BaseAlert slot 테스트', () => {
  test('slot dismiss-icon 확인', async () => {
    /**
     * 1. dismissible false 일때 셋팅된 slot 이 활성화 된다. (기본 slot test 는 dismissible props 테스트에서 확인)
     */

    const slotText = 'SlOT TEST';

    wrapper = shallowMount(BaseAlert, {
      slots: {
        'dismiss-icon': `<div class="dismiss-icon">${slotText}</div>`,
      },
    });

    // 1. dismissible false 일때 셋팅된 slot 이 활성화 된다. (기본 slot test 는 dismissible props 테스트에서 확인)
    expect(wrapper.find('.dismiss-icon').exists()).toBe(false);
    await wrapper.setProps({ dismissible: true });
    expect(wrapper.find('.dismiss-icon').exists()).toBe(true);
    expect(wrapper.find('.dismiss-icon').text()).toBe(slotText);
  });

  test('slot icon 확인', async () => {
    /**
     * 1. dismissible true, icon 값이 있을 때만 표출 확인 기본값 span[data-notify=icon] tag 표출
     * 2. slot icon setting 확인
     */
    // 1. dismissible true 일때만 표출 확인 기본값 span[data-notify=icon] tag 표출
    const icon = 'tim-icons icon-bell-55';
    const iconArray = icon.split(' ');
    expect(wrapper.props().dismissible).toBe(false);
    expect(wrapper.find('span[data-notify=icon]').exists()).toBe(false);
    await wrapper.setProps({ dismissible: true, icon });
    expect(wrapper.find('span[data-notify=icon]').exists()).toBe(true);

    wrapper.destroy();

    // 2. slot icon setting 확인
    wrapper = shallowMount(BaseAlert, {
      slots: {
        icon: `<div class="test-icon"><i class="${icon}"></i>TEST</div>`,
      },
      propsData: {
        dismissible: true,
      },
    });

    expect(wrapper.find('div.test-icon').exists()).toBe(true);
    expect(wrapper.find('div.test-icon').text()).toBe('TEST');
    expect(wrapper.find('div.test-icon>i').classes()).toEqual(iconArray);
  });

  test('slot default 확인', async () => {
    /**
     * 1. dismissible false 일때 div.alert 자식 태그에 병합
     * 2. dismissible true 일때 div.alert span[data-notify=message]자식 태그에 병합
     */
    const slotText = '디폴트 슬랏 테스트 입니다.';
    const slotClass = 'default-slot-test';
    wrapper = shallowMount(BaseAlert, {
      slots: {
        default: `<div class="${slotClass}">${slotText}</div>`,
      },
    });
    // 1. dismissible false 일때 div.alert 자식 태그에 병합
    expect(wrapper.props().dismissible).toBe(false);
    expect(wrapper.find(`div.alert span[data-notify=message]>.${slotClass}`).exists()).toBe(false);
    expect(wrapper.find(`div.alert>.${slotClass}`).exists()).toBe(true);
    expect(wrapper.find(`div.alert>.${slotClass}`).text()).toBe(slotText);

    // 2. dismissible true 일때 div.alert span[data-notify=message]자식 태그에 병합
    await wrapper.setProps({ dismissible: true });
    expect(wrapper.find(`div.alert span[data-notify=message]>.${slotClass}`).exists()).toBe(true);
    expect(wrapper.find(`div.alert span[data-notify=message]>.${slotClass}`).text()).toBe(slotText);
    expect(wrapper.find(`div.alert>.${slotClass}`).exists()).toBe(false);
  });
});

describe('BaseAlert methods 및 event 테스트', () => {
  test('methods dismissAlert() 확인', () => {
    /**
     * 1. 메소드를 실행하면 data visible 값이 false 로 변환된다.
     */
    // 1. 메소드를 실행하면 data 값이 false 로 변환된다.

    expect(wrapper.vm.visible).toBe(true);
    wrapper.vm.dismissAlert();
    expect(wrapper.vm.visible).toBe(false);
  });

  test('dismissible 클릭 확인', async () => {
    /**
     * 1. dismissible true 일때 button 활성화되며 클릭하면 dismissAlert() 함수가 호출되며 div.alert 비활성화된다.
     */

    // 1. dismissible true 일때 button 활성화되며 클릭하면 dismissAlert() 함수가 호출되며 div.alert 비활성화된다.
    const spyClose = jest.spyOn(wrapper.vm, 'dismissAlert'); // Notice how this line changed
    await wrapper.setProps({ dismissible: true });
    await wrapper.find('button').trigger('click');
    expect(wrapper.find('div.alert').exists()).toBe(false);
    expect(spyClose).toBeCalled();
    expect(spyClose).toBeCalledTimes(1);
  });
});

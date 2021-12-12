import { shallowMount } from '@vue/test-utils';
import BaseButton from '@/components/BaseButton.vue';
let wrapper;

beforeEach(() => {
  wrapper = shallowMount(BaseButton);
});
describe('BaseButton props test', () => {
  test('tag test', async () => {
    /**
     * 1. tag props 기본값은  button
     * 2. tag 를 변경하게 되면 최상위 tag가 변경됨
     */

    // 1. tag props 기본값은  button
    expect(wrapper.props().tag).toBe('button');

    // 2. tag 를 변경하게 되면 최상위 tag가 변경됨 (a 태그로 변경)
    expect(wrapper.find('a').exists()).toBe(false);
    await wrapper.setProps({ tag: 'a' });
    expect(wrapper.find('a').exists()).toBe(true);
  });

  test('round test', async () => {
    /**
     * 1. round 가 true 일 때 첫번째 tag에 .btn-round class 가 활성화됨
     */
    const testEl = wrapper.findAll('*').at(0);
    expect(testEl.classes()).not.toContain('btn-round');
    await wrapper.setProps({ round: true });
    expect(testEl.classes()).toContain('btn-round');
  });

  test('block test', async () => {
    /**
     * 1. block 가 true 일 때 첫번째 tag에 .btn-block class 가 활성화됨
     */
    const testEl = wrapper.findAll('*').at(0);
    expect(testEl.classes()).not.toContain('btn-block');
    await wrapper.setProps({ block: true });
    expect(testEl.classes()).toContain('btn-block');
  });

  test('wide test', async () => {
    /**
     * 1. wide 가 true 일 때 첫번째 tag에 .btn-wd class 가 활성화됨
     */
    const testEl = wrapper.findAll('*').at(0);
    expect(testEl.classes()).not.toContain('btn-wd');
    await wrapper.setProps({ wide: true });
    expect(testEl.classes()).toContain('btn-wd');
  });

  test('icon test', async () => {
    /**
     * 1. icon 가 true 일 때 첫번째 tag에 .btn-icon.btn-fab class 가 활성화됨
     */
    const testEl = wrapper.findAll('*').at(0);

    const filterArrayLength = (array, containArr) => {
      return array.filter(item => {
        return containArr.includes(item);
      }).length;
    };
    expect(filterArrayLength(testEl.classes(), ['btn-icon', 'btn-fab']) > 0).toBe(false);
    await wrapper.setProps({ icon: true });
    expect(filterArrayLength(testEl.classes(), ['btn-icon', 'btn-fab']) > 0).toBe(true);
  });

  test('size test', async () => {
    /**
     * 1. validator 체크 ''|sm|lg
     * 2. sm|lg 로 셋팅될 경우 btn-sm, btn-lg class setting
     */

    // 1. validator 체크 ''|sm|lg
    const passTestArray = ['', 'sm', 'lg'];
    const validator = wrapper.vm.$options.props.size.validator;
    expect(validator('fail')).toBe(false);

    passTestArray.forEach(item => {
      expect(validator(item)).toBe(true);
    });

    // 2. sm|lg 로 셋팅될 경우 btn-sm, btn-lg class setting
    const passTestArrayCase2 = ['sm', 'lg'];
    const testEl = wrapper.findAll('*').at(0);

    for (const item of passTestArrayCase2) {
      expect(testEl.classes()).not.toContain(`btn-${item}`);
      await wrapper.setProps({ size: item });
      expect(testEl.classes()).toContain(`btn-${item}`);
    }
  });

  test('link test', async () => {
    /**
     * 1. link 가 true 일 때 첫번째 tag에 .btn-link class 가 활성화됨
     */
    const testEl = wrapper.findAll('*').at(0);
    expect(testEl.classes()).not.toContain('btn-link');
    await wrapper.setProps({ link: true });
    expect(testEl.classes()).toContain('btn-link');
  });

  test('simple test', async () => {
    /**
     * 1. simple 가 true 일 때 첫번째 tag에 .btn-simple class 가 활성화됨
     */
    const testEl = wrapper.findAll('*').at(0);
    expect(testEl.classes()).not.toContain('btn-simple');
    await wrapper.setProps({ simple: true });
    expect(testEl.classes()).toContain('btn-simple');
  });

  test('disabled test', async () => {
    /**
     * 1. tag props 가 button 일 때, disabled 가 true 이면 button tag disabled 속성이 활성화
     * 2. tag props 가 button 이 아닐 때, disabled 가 true 이면 disabled class 가 추가됨
     */
    // 1. type props 가 button 일 때, disabled 가 true 이면 button tag disabled 속성이 활성화
    const testEl = wrapper.findAll('*').at(0);
    expect(wrapper.props().tag).toBe('button');

    expect(testEl.attributes().disabled).toBeUndefined();
    await wrapper.setProps({ disabled: true });
    expect(testEl.attributes().disabled).toBe('disabled');

    // 2. tag props 가 button 이 아닐 때, disabled 가 true 이면 disabled class 가 추가됨
    // 초기화
    await wrapper.setProps({ disabled: false, tag: 'a' });

    expect(testEl.classes()).not.toContain('disabled');
    await wrapper.setProps({ disabled: true });
    expect(testEl.classes()).toContain('disabled');
  });

  test('loading test', async () => {
    /**
     * 1. loading 이 true 이면 disabled 가 된다.
     * 2. i.fas.fa-spinner.fa-spin tag가 활성화 된다. (loading slot 이 없을 때)
     */

    // 1. loading 이 true 이면 disabled 가 된다.
    const testEl = wrapper.findAll('*').at(0);
    expect(testEl.attributes().disabled).toBeUndefined();
    expect(wrapper.find('i.fas.fa-spinner.fa-spin').exists()).toBe(false);

    await wrapper.setProps({ loading: true });

    expect(testEl.attributes().disabled).toBe('disabled');
    expect(wrapper.find('i.fas.fa-spinner.fa-spin').exists()).toBe(true);
  });

  test('type test', async () => {
    /**
     * 1. type validator check
     * 2. type 이 셋팅되면 btn-{type} 으로  class 가 생성
     */
    // 1. type validator check
    const passArray = ['default', 'primary', 'info', 'success', 'warning', 'danger', 'neutral', 'link'];

    passArray.forEach(item => {
      expect(wrapper.vm.$options.props.type.validator(item)).toBe(true);
    });

    // 2. type 이 셋팅되면 btn-{type} 으로  class 가 생성
    const testEl = wrapper.findAll('*').at(0);

    for (const item of passArray) {
      await wrapper.setProps({ type: item });
      expect(testEl.classes()).toContain(`btn-${item}`);
    }
  });

  test('nativeType test', async () => {
    /**
     * 1. nativeType validator 체크
     * 2. tag가 button 이고 nativeType setting 이 된다면 태그 type 속성에 nativeType 설정된다.
     */
    // 1. nativeType validator 체크
    const passArray = ['button', 'reset', 'submit'];
    expect(wrapper.props().nativeType).toBe('button');

    passArray.forEach(item => {
      expect(wrapper.vm.$options.props.nativeType.validator(item)).toBe(true);
    });

    const testEl = wrapper.findAll('*').at(0);
    for (const item of passArray) {
      await wrapper.setProps({ nativeType: item });
      expect(testEl.attributes().type).toBe(item);
    }
  });
});

describe('BaseButton event 및 메서드 테스트 ', () => {
  test('methods handleClick test', async () => {
    /**
     * 1.disabled click test
     * 2.loading click test
     * 3.click test
     */
    // 1.disabled click test
    const testEl = wrapper.findAll('*').at(0);
    const clickCount = 5;
    await wrapper.setProps({ disabled: true });

    for (const _ of Array(clickCount)) {
      await testEl.trigger('click');
    }

    expect(wrapper.emitted().click).toBeUndefined();

    // 2.loading click test
    await wrapper.setProps({ disabled: false, loading: true });

    for (const _ of Array(clickCount)) {
      await testEl.trigger('click');
    }

    expect(wrapper.emitted().click).toBeUndefined();

    // 3.click test
    await wrapper.setProps({ loading: false });

    for (const _ of Array(clickCount)) {
      await testEl.trigger('click');
    }

    expect(wrapper.emitted().click.length).toBe(clickCount);
  });
});

describe('BaseButton computed 테스트', () => {
  test('className Test', () => {
    const testData = [
      { 'btn-round': wrapper.props().round },
      { 'btn-block': wrapper.props().block },
      { 'btn-wd': wrapper.props().wide },
      { 'btn-icon btn-fab': wrapper.props().icon },
      { [`btn-${wrapper.props().type}`]: wrapper.props().type.trim() === '' ? false : wrapper.props().type },
      { [`btn-${wrapper.props().size}`]: wrapper.props().size.trim() === '' ? false : wrapper.props().size },
      { 'btn-simple': wrapper.props().simple },
      { 'btn-link': wrapper.props().link },
      { disabled: wrapper.props().disabled && wrapper.props().tag !== 'button' },
    ];
    expect(wrapper.vm.className).toEqual(testData);
  });
});

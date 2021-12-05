import { shallowMount } from '@vue/test-utils';
import BaseButton from '@/components/BaseButton.vue';

describe('BaseButton', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(BaseButton);
  });

  test('props tag test', async () => {
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

  test('props round test', async () => {
    /**
     * 1. round 가 true 일 때 첫번째 tag에 .btn-round class 가 활성화됨
     */
    const testEl = wrapper.findAll('*').at(0);
    expect(testEl.classes()).not.toContain('btn-round');
    await wrapper.setProps({ round: true });
    expect(testEl.classes()).toContain('btn-round');
  });

  test('props block test', async () => {
    /**
     * 1. block 가 true 일 때 첫번째 tag에 .btn-block class 가 활성화됨
     */
    const testEl = wrapper.findAll('*').at(0);
    expect(testEl.classes()).not.toContain('btn-block');
    await wrapper.setProps({ block: true });
    expect(testEl.classes()).toContain('btn-block');
  });

  test('props wide test', async () => {
    /**
     * 1. wide 가 true 일 때 첫번째 tag에 .btn-wd class 가 활성화됨
     */
    const testEl = wrapper.findAll('*').at(0);
    expect(testEl.classes()).not.toContain('btn-wd');
    await wrapper.setProps({ wide: true });
    expect(testEl.classes()).toContain('btn-wd');
  });

  test('props icon test', async () => {
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
});

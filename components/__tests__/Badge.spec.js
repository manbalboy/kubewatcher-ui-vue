import { shallowMount } from '@vue/test-utils';
import Badge from '@/components/Badge.vue';

describe('Badge', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Badge);
  });

  test('props tag test', () => {
    /**
     * 1. 기본값 체크 span
     */
    expect(wrapper.props().tag).toBe('span');
  });

  test('props type test', async () => {
    /**
     * 1. validator 체크
     * 2. 기본값 체크 default
     * 3. 값이 셋팅되면 badge-${type} class 생성
     */

    // 1. validator 체크
    const acceptedValues = ['primary', 'info', 'success', 'warning', 'danger', 'default'];
    acceptedValues.forEach(item => {
      expect(wrapper.vm.$options.props.type.validator(item)).toBe(true);
    });
    // 2. 기본값 체크 default
    expect(wrapper.props().type).toBe('default');

    // 3. 값이 셋팅되면 badge-${type} class 생성

    for (const item of acceptedValues) {
      await wrapper.setProps({ type: item });
      expect(wrapper.find(`.badge-${item}`).exists()).toBe(true);
    }
  });
});

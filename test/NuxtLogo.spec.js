import { mount } from '@vue/test-utils';
import NuxtLogo from '@/components/Badge.vue';

describe('YourComponent', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(NuxtLogo);
    expect(wrapper.vm).toBeTruthy();
  });
});

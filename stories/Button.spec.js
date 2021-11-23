import { mount } from '@vue/test-utils';
import Button from './Button.vue';

describe('YourComponent', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Button);
    expect(wrapper.vm).toBeTruthy();
  });
});

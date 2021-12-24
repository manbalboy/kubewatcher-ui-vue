import { shallowMount } from '@vue/test-utils';
import TabItemContent from '~/components/Tabs/TabItemContent.vue';

describe('TabItemContent', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(TabItemContent, {
      propsData: {
        tab: {
          $slots: {
            label: '테스트',
          },
        },
      },
    });
  });
  test('반환된 html 확인', () => {
    expect(wrapper.html()).toBe('<div>테스트</div>');
  });
});

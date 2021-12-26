import { shallowMount } from '@vue/test-utils';
import TimeLine from '@/components/Timeline/TimeLine.vue';
import { propsDefaultCheck } from '~/test-utils/utils.js';

describe('TimeLine', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(TimeLine);
  });

  describe('props 확인', () => {
    describe('type 확인', () => {
      test('default : ""', () => {
        propsDefaultCheck(wrapper, 'type', '');
      });

      test('type 값이 simple 일 경우 ul tag 에 timeline-simple class 포함', async () => {
        // given
        const testUlElement = wrapper.find('ul');
        const expectClass = 'timeline-simple';
        const type = 'simple';
        expect(wrapper.props().type).not.toBe(type);
        expect(testUlElement.classes()).not.toContain(expectClass);

        // when
        await wrapper.setProps({ type });

        // then
        expect(wrapper.props().type).toBe(type);
        expect(testUlElement.classes()).toContain(expectClass);
      });
    });
  });
});

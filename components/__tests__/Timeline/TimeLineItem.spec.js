import { shallowMount } from '@vue/test-utils';
import TimeLineItem from '@/components/Timeline/TimeLineItem.vue';
import { propsDefaultCheck, propsValidator } from '~/test-utils/utils.js';

describe('TimeLineItem', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(TimeLineItem);
  });

  describe('props 확인', () => {
    describe('inverted 확인', () => {
      test('default : false', () => {
        propsDefaultCheck(wrapper, 'inverted', false);
      });

      test('값이 true 일 경우 li tag 에 timeline-inverted class 포함', async () => {
        // given
        const testLlElement = wrapper.find('li');
        const expectClass = 'timeline-inverted';
        const inverted = true;

        expect(wrapper.props().inverted).not.toBe(inverted);
        expect(testLlElement.classes()).not.toContain(expectClass);

        // when
        await wrapper.setProps({ inverted });

        // then
        expect(wrapper.props().inverted).toBe(inverted);
        expect(testLlElement.classes()).toContain(expectClass);
      });
    });

    describe('badgeType 확인', () => {
      test('default : success', () => {
        propsDefaultCheck(wrapper, 'badgeType', 'success');
      });

      test('validator 확인', () => {
        // given
        const passValidatorArray = ['primary', 'info', 'success', 'warning', 'danger'];
        // when then
        passValidatorArray.forEach(value => {
          expect(propsValidator(wrapper, 'badgeType', value)).toBe(true);
        });
      });

      test('$slots.badge 가 없을때 badgeType 에 따라 li>div.timeline-badge tag 에 badgeType 값이 class 로 포함된다.', async () => {
        // given
        const testElement = wrapper.find('li>div.timeline-badge');
        const passTestArray = ['primary', 'info', 'success', 'warning', 'danger'];

        // 기본값
        expect(testElement.classes()).toContain(wrapper.props().badgeType);

        let index = 0;
        for (const badgeType of passTestArray) {
          const prevTestValue = index === 0 ? wrapper.props().badgeType : passTestArray[index - 1];
          // when
          await wrapper.setProps({ badgeType });

          // then
          // 이전값 삭제확인
          expect(testElement.classes()).not.toContain(prevTestValue);

          // 셋팅된값 포함확인
          expect(testElement.classes()).toContain(passTestArray[index]);

          ++index;
        }
      });
    });

    describe('badgeIcon 확인', () => {
      test('default : ""', () => {
        propsDefaultCheck(wrapper, 'badgeIcon', '');
      });

      test('값이 i tag class 포함', async () => {
        // given
        const testIElement = wrapper.find('i');
        const badgeIcon = 'test-class';

        expect(testIElement.classes()).not.toContain(badgeIcon);

        // when
        await wrapper.setProps({ badgeIcon });

        // then
        expect(testIElement.classes()).toContain(badgeIcon);
      });
    });
  });
});

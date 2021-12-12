import { shallowMount } from '@vue/test-utils';
import BaseProgress from '@/components/BaseProgress.vue';

let wrapper;
beforeEach(() => {
  wrapper = shallowMount(BaseProgress);
});

describe('BaseProgress props 테스트', () => {
  test('striped 확인', async () => {
    /**
     *  1.div.progress-bar tag 에 progress-bar-striped class 포함여부
     */
    const testElement = wrapper.find('div.progress-bar');
    const testClassValue = 'progress-bar-striped';

    // 1.div.progress-bar tag 에 progress-bar-striped class 포함여부
    expect(testElement.classes()).not.toContain(testClassValue);
    await wrapper.setProps({ striped: true });
    expect(testElement.classes()).toContain(testClassValue);
  });

  test('showValue 확인', async () => {
    /**
     * 1. default 값 확인 true
     * 2. showValue 값이 true 일 때만 .progress-value tag 가 활성화
     */

    // 1. default 값 확인 true
    expect(wrapper.vm.$options.props.showValue.default).toBe(true);

    // 2. showValue 값이 true 일 때만 .progress-value tag 가 활성화
    expect(wrapper.find('.progress-value').exists()).toBe(true);
    await wrapper.setProps({ showValue: false });
    expect(wrapper.find('.progress-value').exists()).not.toBe(true);
  });

  test('animated 확인', async () => {
    /**
     * 1. animated value 값이 progress-bar-animated class 포함
     */

    expect(wrapper.props().animated).toBe(false);
    expect(wrapper.find('.progress-bar-animated').exists()).toBe(false);
    await wrapper.setProps({ animated: true });
    expect(wrapper.find('.progress-bar-animated').exists()).not.toBe(false);
  });

  test('label 확인', async () => {
    /**
     * 1. label 값이 존재하면 span.progress-badge tag 활성화
     * 2. label 값이 span.progress-badge tag 의 text 로 삽입
     */
    const testTagClass = 'span.progress-badge';
    const testText = '라벨테스트입니다.';

    // 1. label 값이 존재하면 span.progress-badge tag 활성화
    expect(wrapper.find(testTagClass).exists()).toBe(false);
    await wrapper.setProps({ label: testText });
    expect(wrapper.find(testTagClass).exists()).toBe(true);

    // 2. label 값이 span.progress-badge tag 의 text 로 삽입
    expect(wrapper.find(testTagClass).text()).toBe(testText);
  });

  test('valuePosition 확인', () => {
    /**
     * ## showValue 가 true 일때 의미있음
     * 1. default 값 확인 left
     * 2. validator 확인
     */
    const valuePositionProps = wrapper.vm.$options.props.valuePosition;
    const testValidationValueArray = ['left', 'right'];

    // 1. default 값 확인 left
    expect(valuePositionProps.default).toBe('left');

    // 2. validator 확인
    testValidationValueArray.forEach(item => {
      expect(valuePositionProps.validator(item)).toBe(true);
    });
  });

  /**
   * 파일내 사용안함
   */
  test.todo('height 확인');

  test('type 확인', async () => {
    /**
     * 1. default value 확인
     * 2. validator 확인
     * 3. div.progress-container tag 에 progress-${type} class 병합
     */
    const testElement = wrapper.find('div.progress-container');
    const testValidatorValueArray = ['primary', 'info', 'success', 'warning', 'danger', 'neutral', 'default'];
    const typeProps = wrapper.vm.$options.props.type;

    // 1. default value 확인
    expect(typeProps.default).toBe('default');

    // 2. validator 확인
    testValidatorValueArray.forEach(item => {
      expect(typeProps.validator(item)).toBe(true);
    });

    // 3. div.progress-container tag 에 progress-${type} class 병합
    for (const type of testValidatorValueArray) {
      await wrapper.setProps({ type });

      expect(testElement.classes()).toContain(`progress-${type}`);
    }
  });

  test('size 확인', () => {
    /**
     * ## 현재 size 값 sm 만 확인되었음
     * 1. default value 확인
     * 2. div.progress-container tag 에 progress-${size} class 병합
     */

    const testElement = wrapper.find('div.progress-container');
    const sizeProps = wrapper.vm.$options.props.size;

    // 1. default value 확인
    expect(sizeProps.default).toBe('sm');

    // 2. div.progress-container tag 에 progress-${size} class 병합
    expect(testElement.classes()).toContain(`progress-sm`);
  });

  test('value 확인', async () => {
    /**
     * ## showValue 값이 true 일때 유효
     * 1. default 값 확인 0
     * 2. validator 확인 0-100 까지
     * 3. span.progress-value tag 에 text ${value}% 추가
     */
    const testValue = Math.floor(Math.random() * 100);
    const valueProps = wrapper.vm.$options.props.value;
    const passTestValidatorValueArray = [0, 49, 50, 99];
    const failTestValidatorValueArray = [-1, -40, 140];
    const testElement = wrapper.find('span.progress-value');
    // 1. default 값 확인 0
    expect(valueProps.default).toBe(0);

    // 2. validator 확인
    passTestValidatorValueArray.forEach(item => {
      expect(valueProps.validator(item)).toBe(true);
    });

    failTestValidatorValueArray.forEach(item => {
      expect(valueProps.validator(item)).toBe(false);
    });

    // 3. span.progress-value tag 에 text ${value}% 추가
    await wrapper.setProps({ value: testValue });
    expect(testElement.text()).toBe(`${testValue}%`);
  });
});

describe('BaseProgress computed 테스트', () => {
  test('computedClasses 확인', () => {
    const computedClasses = [
      { 'progress-bar-striped': wrapper.props().striped },
      { 'progress-bar-animated': wrapper.props().animated },
    ];

    expect(wrapper.vm.computedClasses).toEqual(computedClasses);
  });
});

import { shallowMount } from '@vue/test-utils';
import Modal from '@/components/Modal.vue';
let wrapper;
const modalClasses = [{ test: true, 'test-class': true }, 'string-class'];

beforeEach(() => {
  wrapper = shallowMount(Modal, {
    slots: {
      header: '<div>테스트해더</div>',
      default: '<div>테스트바디</div>',
      footer: '<div>테스트푸터</div>',
    },
    propsData: {
      show: true,
    },
  });
});

describe('Modal props test', () => {
  test('show 확인', async () => {
    /**
     * 1. required true 확인
     * 2. show 값이 false 일 때 visible 확인
     * 2. show 값이 true 일 때 .show.d-block class 활성화 false 일때 .d-none 활성화
     */
    const testEl = wrapper.find('div.modal');
    const showTrueClassArray = ['show', 'd-block'];
    const showFalseClassArray = ['d-none'];
    // 1. required true 확인
    expect(wrapper.vm.$options.props.show.required).toBe(true);

    // 2. show 값이 false 일 때 visible false 확인
    expect(testEl.isVisible()).toBe(true);
    await wrapper.setProps({ show: false });
    expect(testEl.isVisible()).toBe(false);

    // 2. show 값이 true 일 때 .show.d-block class 활성화 false 일때 .d-none 활성화
    await wrapper.setProps({ show: true });
    showTrueClassArray.forEach(item => {
      expect(testEl.classes()).toContain(item);
    });
    showFalseClassArray.forEach(item => {
      expect(testEl.classes()).not.toContain(item);
    });

    await wrapper.setProps({ show: false });
    showTrueClassArray.forEach(item => {
      expect(testEl.classes()).not.toContain(item);
    });
    showFalseClassArray.forEach(item => {
      expect(testEl.classes()).toContain(item);
    });
  });

  test('showClose 확인', async () => {
    /**
     * ## slot header 가 있을경우에만 동작가능
     * 1. showClose default 값 확인 true
     * 2. showClose true 면 closeButton 기본 버튼이 활성화
     */

    // 1. showClose default 값 확인 true
    expect(wrapper.props().showClose).toBe(true);

    // 2. showClose true 면 closeButton 기본 버튼이 활성화
    let testElement = wrapper.find('button');
    expect(wrapper.vm.$slots.header).toBeDefined();
    expect(testElement.exists()).toBe(true);

    await wrapper.setProps({ showClose: false });
    testElement = wrapper.find('button');
    expect(testElement.exists()).toBe(false);
  });

  test('centered 확인', async () => {
    /**
     * 1. default 값 확인 false
     * 2. 값이 true 일 때 div.modal-dialog tag에 .modal-dialog-centered class 추가
     */
    const testElement = wrapper.find('div.modal-dialog');
    const passClassName = 'modal-dialog-centered';

    // 1. default 값 확인 false
    expect(wrapper.props().centered).toBe(false);

    // 2. 값이 true 일 때 div.modal-dialog tag에 .modal-dialog-centered class 추가
    expect(testElement.exists()).toBe(true);
    expect(testElement.classes()).not.toContain(passClassName);

    await wrapper.setProps({ centered: true });
    expect(testElement.classes()).toContain(passClassName);
  });

  test('appendToBody 확인', () => {
    /**
     * 1. 기본값 true
     * 2. 값이 ture 일때는 document.body.appendChild(this.$el) 을 한다.
     */
    // 1. 기본값 true
    expect(wrapper.vm.$options.props.appendToBody.default).toBe(true);

    // 2. 값이 ture 일때는 document.body.appendChild(this.$el) 을 한다.
    const appendChildSpy = jest.spyOn(document.body, 'appendChild');
    const removeChildSpy = jest.spyOn(document.body, 'appendChild');
    wrapper = shallowMount(Modal, {
      propsData: {
        show: true,
        appendToBody: false,
      },
    });
    expect(appendChildSpy).not.toHaveBeenCalled();
    expect(removeChildSpy).not.toHaveBeenCalled();

    wrapper.destroy();

    wrapper = shallowMount(Modal, {
      propsData: {
        show: true,
        appendToBody: true,
      },
    });
    expect(appendChildSpy).toHaveBeenCalled();
    expect(appendChildSpy).toHaveBeenCalledWith(wrapper.vm.$el);
    wrapper.destroy();
    expect(removeChildSpy).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalledWith(wrapper.vm.$el);
  });

  test('scrollToBottom 확인', () => {
    /**
     * 1. 기본값 확인
     */
    expect(wrapper.vm.$options.props.scrollToBottom.default).toBe(true);
  });

  test('type 확인', async () => {
    /**
     * 1. default 확인
     * 2. validator 확인
     * 3. type mini 일 때  div.modal.fade tag에 modal-mini class 추가
     * 4. type notice 일 때 div.modal-dialog tag 에 modal-notice class 추가
     */
    const passAcceptedValues = ['', 'notice', 'mini'];
    const failAcceptedValues = ['test', 'dd-notice', 'a-mini'];
    const typeMiniTestElement = wrapper.find('div.modal.fade');
    const typeNoticeTestElement = wrapper.find('div.modal-dialog');

    // 1. default 확인
    expect(wrapper.vm.$options.props.type.default).toBe('');

    // 2. validator 확인
    passAcceptedValues.forEach(item => {
      expect(wrapper.vm.$options.props.type.validator(item)).toBe(true);
    });

    failAcceptedValues.forEach(item => {
      expect(wrapper.vm.$options.props.type.validator(item)).toBe(false);
    });

    // 3. type mini 일 때  div.modal.fade tag에 modal-mini class 추가
    expect(typeMiniTestElement.classes()).not.toContain('modal-mini');
    await wrapper.setProps({ type: 'mini' });
    expect(typeMiniTestElement.classes()).toContain('modal-mini');

    // 4. type notice 일 때 div.modal-dialog tag 에 modal-notice class 추가
    expect(typeNoticeTestElement.classes()).not.toContain('modal-notice');
    await wrapper.setProps({ type: 'notice' });
    expect(typeNoticeTestElement.classes()).toContain('modal-notice');
  });

  test('modalClasses 확인', async () => {
    /**
     * 1. default 값 확인
     * 2. 값이 셋팅되면 div.modal-dialog class 추가
     */

    const testElement = wrapper.find('div.modal-dialog');

    // 1. default 값 확인
    expect(wrapper.vm.$options.props.modalClasses.default).toBe('');

    // 2. 값이 셋팅되면 div.modal-dialog class 추가
    for (const item of modalClasses) {
      let testObj;

      if (typeof item === 'object') {
        testObj = Object.keys(item);
      } else {
        testObj = item;
      }

      // 존재 하지 않는 값 검증
      if (typeof testObj === 'object') {
        testObj.forEach(val => {
          expect(testElement.classes()).not.toContain(val);
        });
      } else {
        expect(testElement.classes()).not.toContain(testObj);
      }

      // 값 셋팅
      await wrapper.setProps({ modalClasses: item });

      // 값 검증
      if (typeof testObj === 'object') {
        testObj.forEach(val => {
          expect(testElement.classes()).toContain(val);
        });
      } else {
        expect(testElement.classes()).toContain(testObj);
      }
    }
  });

  test('modalContentClasses 확인', async () => {
    /**
     * 1. default 값 확인
     * 2. 값이 셋팅되면 div.modal-content class 추가
     */

    const testElement = wrapper.find('div.modal-content');

    // 1. default 값 확인
    expect(wrapper.vm.$options.props.modalContentClasses.default).toBe('');

    // 2. 값이 셋팅되면 div.modal-content class 추가
    for (const item of modalClasses) {
      let testObj;

      if (typeof item === 'object') {
        testObj = Object.keys(item);
      } else {
        testObj = item;
      }

      // 존재 하지 않는 값 검증
      if (typeof testObj === 'object') {
        testObj.forEach(val => {
          expect(testElement.classes()).not.toContain(val);
        });
      } else {
        expect(testElement.classes()).not.toContain(testObj);
      }

      // 값 셋팅
      await wrapper.setProps({ modalContentClasses: item });

      // 값 검증
      if (typeof testObj === 'object') {
        testObj.forEach(val => {
          expect(testElement.classes()).toContain(val);
        });
      } else {
        expect(testElement.classes()).toContain(testObj);
      }
    }
  });

  test('gradient 확인', async () => {
    /**
     * 1. default 값 확인
     * 2. 값이 셋팅되면 div.modal-content tag 에 `bg-gradient-${값}` class 가 포함
     */

    const testElement = wrapper.find('div.modal-content');
    const testGradientValue = 'test-gradient';
    const testClass = `bg-gradient-${testGradientValue}`;

    // 1. default 값 확인
    expect(wrapper.vm.$options.props.gradient.default).toBe('');

    // 2. 값이 셋팅되면 div.modal-content tag 에 `bg-gradient-${값}` class 가 포함
    expect(testElement.classes()).not.toContain(testClass);
    await wrapper.setProps({ gradient: testGradientValue });
    expect(testElement.classes()).toContain(testClass);
  });

  test('headerClasses 확인', async () => {
    /**
     * ## slot header 가 있을경우에만 동작가능
     * 1. headerClasses default 값 확인 ''
     * 2. headerClasses 값이 셋팅되면 div.modal-header tag에 class 로 셋팅
     */

    const testElement = wrapper.find('div.modal-header');

    // 1. default 값 확인
    expect(wrapper.vm.$options.props.headerClasses.default).toBe('');

    // 2. headerClasses 값이 셋팅되면 div.modal-header tag에 class 로 셋팅
    for (const item of modalClasses) {
      let testObj;

      if (typeof item === 'object') {
        testObj = Object.keys(item);
      } else {
        testObj = item;
      }

      // 존재 하지 않는 값 검증
      if (typeof testObj === 'object') {
        testObj.forEach(val => {
          expect(testElement.classes()).not.toContain(val);
        });
      } else {
        expect(testElement.classes()).not.toContain(testObj);
      }

      // 값 셋팅
      await wrapper.setProps({ headerClasses: item });

      // 값 검증
      if (typeof testObj === 'object') {
        testObj.forEach(val => {
          expect(testElement.classes()).toContain(val);
        });
      } else {
        expect(testElement.classes()).toContain(testObj);
      }
    }
  });

  test('bodyClasses 확인', async () => {
    /**
     * ## default slot 이 있어야만 보여짐
     * 1. bodyClasses default 값 확인 ''
     * 2. bodyClasses 값이 셋팅되면 div.modal-body tag에 class 로 셋팅
     */

    const testElement = wrapper.find('div.modal-body');

    // 1. default 값 확인
    expect(wrapper.vm.$options.props.bodyClasses.default).toBe('');

    // 2. headerClasses 값이 셋팅되면 div.modal-header tag에 class 로 셋팅
    for (const item of modalClasses) {
      let testObj;

      if (typeof item === 'object') {
        testObj = Object.keys(item);
      } else {
        testObj = item;
      }

      // 존재 하지 않는 값 검증
      if (typeof testObj === 'object') {
        testObj.forEach(val => {
          expect(testElement.classes()).not.toContain(val);
        });
      } else {
        expect(testElement.classes()).not.toContain(testObj);
      }

      // 값 셋팅
      await wrapper.setProps({ bodyClasses: item });

      // 값 검증
      if (typeof testObj === 'object') {
        testObj.forEach(val => {
          expect(testElement.classes()).toContain(val);
        });
      } else {
        expect(testElement.classes()).toContain(testObj);
      }
    }
  });

  test('footerClasses 확인', async () => {
    /**
     * ## footer slot 이 있어야만 보여짐
     * 1. footerClasses default 값 확인 ''
     * 2. footerClasses 값이 셋팅되면 div.modal-footer tag에 class 로 셋팅
     */

    const testElement = wrapper.find('div.modal-footer');

    // 1. default 값 확인
    expect(wrapper.vm.$options.props.footerClasses.default).toBe('');

    // 2. headerClasses 값이 셋팅되면 div.modal-header tag에 class 로 셋팅
    for (const item of modalClasses) {
      let testObj;

      if (typeof item === 'object') {
        testObj = Object.keys(item);
      } else {
        testObj = item;
      }

      // 존재 하지 않는 값 검증
      if (typeof testObj === 'object') {
        testObj.forEach(val => {
          expect(testElement.classes()).not.toContain(val);
        });
      } else {
        expect(testElement.classes()).not.toContain(testObj);
      }

      // 값 셋팅
      await wrapper.setProps({ footerClasses: item });

      // 값 검증
      if (typeof testObj === 'object') {
        testObj.forEach(val => {
          expect(testElement.classes()).toContain(val);
        });
      } else {
        expect(testElement.classes()).toContain(testObj);
      }
    }
  });

  test('animationDuration 확인', () => {
    /**
     * 1. default 값 확인 500
     */
    // 1. default 값 확인 500
    // 1. default 값 확인
    expect(wrapper.vm.$options.props.animationDuration.default).toBe(500);
  });
});

describe('Modal watch test', () => {
  test('show 확인', async () => {
    /**
     * 1. show 값이 false 이면  modal-open class 를 remove
     * 2. show 값이 true 이면  modal-open class 를  add
     */
    const addSpy = jest.spyOn(document.body.classList, 'add');
    const removeSpy = jest.spyOn(document.body.classList, 'remove');
    const testValue = 'modal-open';

    expect(addSpy).not.toHaveBeenCalled();
    expect(removeSpy).not.toHaveBeenCalled();
    wrapper = shallowMount(Modal, {
      propsData: {
        show: true,
        appendToBody: false,
      },
    });
    // 1. show 값이 false 이면  modal-open class 를 remove
    await wrapper.setProps({ show: false });
    expect(removeSpy).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalledWith(testValue);

    // 2. show 값이 true 이면  modal-open class 를  add
    await wrapper.setProps({ show: true });
    expect(addSpy).toHaveBeenCalled();
    expect(addSpy).toHaveBeenCalledWith(testValue);
  });
});

describe('Modal methods 및 이벤트 test', () => {
  test('closeModal() 확인', async () => {
    /**
     * 1. div.modal을 click 하면 closeModal() 호출 된다.
     * 2. closeModal() 호출되면 'update:show' 와 'close' emit 이 발생된다.
     */

    const closeModalSpy = jest.spyOn(wrapper.vm, 'closeModal');
    const testElement = wrapper.find('div.modal');

    // 1. div.modal을 click 하면 closeModal() 호출 된다.
    expect(closeModalSpy).not.toHaveBeenCalled();
    expect(wrapper.emitted().close).toBeUndefined();
    expect(wrapper.emitted()['update:show']).toBeUndefined();

    await testElement.trigger('click');
    expect(closeModalSpy).toHaveBeenCalled();

    // 2. closeModal() 호출되면 'update:show' 와 'close' emit 이 발생된다.
    expect(wrapper.emitted()['update:show']).toEqual([[false]]);
    expect(wrapper.emitted().close).toBeDefined();
  });

  test('scrollModalToBottom() 확인', async () => {
    /**
     * 1. scrollToBottom false 일때는 scrollTop 을 조작하지않고 true 일때만 계산해서 대입한다.
     */

    // scrollHeight , clientHeight 는 테스트마다 결과값이 달라지므로 Mocking 하였다.
    const scrollHeight = 400;
    const clientHeight = 150;
    let scrollTop = 0;
    const scrollModalToBottomSpy = jest.spyOn(wrapper.vm, 'scrollModalToBottom').mockImplementation(() => {
      if (!wrapper.props().scrollToBottom) return;
      return (scrollTop = scrollHeight - clientHeight);
    });
    await wrapper.setProps({ scrollToBottom: false });
    expect(wrapper.props().scrollToBottom).toBe(false);
    expect(scrollModalToBottomSpy).not.toHaveBeenCalled();

    // 1. scrollToBottom false 일때는 scrollTop 을 조작하지않고 true 일때만 계산해서 대입한다.
    wrapper.vm.scrollModalToBottom();
    expect(scrollModalToBottomSpy).toHaveBeenCalledTimes(1);
    expect(scrollTop).toBe(0);

    await wrapper.setProps({ scrollToBottom: true });
    wrapper.vm.scrollModalToBottom();
    expect(scrollModalToBottomSpy).toHaveBeenCalledTimes(2);
    expect(scrollTop).toBe(scrollHeight - clientHeight);
  });
});

describe('Modal slot 테스트', () => {
  beforeEach(() => {
    wrapper = shallowMount(Modal, {
      slots: {
        header: '<div class="test-header">테스트해더</div>',
        default: '<div class="test-default">테스트바디</div>',
        footer: '<div class="test-footer">테스트푸터</div>',
        'close-button': '<div class="test-close-button">테스트닫기버튼</div>',
      },
      propsData: {
        show: true,
      },
    });
  });

  test('default slot 확인', () => {
    expect(wrapper.find('div.test-default').text()).toBe('테스트바디');
  });
  test('default header 확인', () => {
    expect(wrapper.find('div.test-header').text()).toBe('테스트해더');
  });
  test('default close-button 확인', () => {
    expect(wrapper.find('div.test-close-button').text()).toBe('테스트닫기버튼');
  });
  test('default footer 확인', () => {
    expect(wrapper.find('div.test-footer').text()).toBe('테스트푸터');
  });
});

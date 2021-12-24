import { mount, shallowMount } from '@vue/test-utils';
import { Tag } from 'element-ui';
import TagsInput from '~/components/Inputs/TagsInput.vue';

describe('TagsInput', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(TagsInput);
  });

  describe('props 확인', () => {
    describe('value 확인', () => {
      test('기본값은 [] 이다.', () => {
        expect(wrapper.props().value).toEqual([]);
      });
    });

    describe('tagType 확인', () => {
      const passValidatorData = ['primary', 'gray', 'success', 'warning', 'danger'];

      test('기본값은 primary 이다.', () => {
        expect(wrapper.props().tagType).toBe('primary');
      });
      test('validator 확인', async () => {
        const testProps = wrapper.vm.$options.props.tagType;
        for (const tagType of passValidatorData) {
          await wrapper.setProps({ tagType });
          expect(testProps.validator(tagType)).toBeTruthy();
        }
      });
      test('tagType 을 setting 하면 ELTag type 속성이 변경된다.', async () => {
        await wrapper.setProps({ value: ['tag 1'] });
        const ChildComponent = wrapper.findComponent(Tag);
        expect(ChildComponent.exists()).toBeTruthy();

        for (const tagType of passValidatorData) {
          await wrapper.setProps({ tagType });
          expect(ChildComponent.vm.type).toBe(tagType);
        }
      });
    });
  });

  describe('child component 확인', () => {
    test('ElTag 포함 확인', () => {
      wrapper = mount(TagsInput, {
        propsData: {
          value: ['test1'],
        },
      });
      expect(wrapper.findComponent(Tag).exists()).toBeTruthy();
    });
  });

  describe('methods 확인', () => {
    describe('handleClose() 메소드 확인', () => {
      let testArray;
      beforeEach(async () => {
        testArray = ['props1', 'props2'];
        await wrapper.setData({ dynamicTags: testArray });
      });
      test('인자 값을 this.dynamicTags Array 에서 잘라낸다.', () => {
        // given
        expect(wrapper.vm.dynamicTags).toEqual(testArray);

        // when
        wrapper.vm.handleClose('props1');

        // then
        expect(wrapper.vm.dynamicTags).toEqual(['props2']);
      });

      test('this.dynamicTags change emit 이 발생한다.', () => {
        // given
        expect(wrapper.emitted().change).toBeUndefined();
        // when
        wrapper.vm.handleClose('props1');

        expect(wrapper.emitted().change[0]).toEqual([['props2']]);
      });
    });

    describe('handleInputConfirm() 메소드 확인', () => {
      test('inputValue 가 없으면 아무런 일이 발생하지 않는다.', () => {
        // given
        expect(wrapper.vm.inputValue).toBe('');

        // when
        wrapper.vm.handleInputConfirm();

        // then
        expect(wrapper.emitted().change).toBeUndefined();
      });

      test('inputValue 가 있으면 this.dynamicTags 에 inputValue 에 추가 된다.', () => {
        // given
        wrapper.vm.inputValue = 'test';
        expect(wrapper.vm.inputValue).toBe('test');
        expect(wrapper.vm.dynamicTags).toEqual([]);

        // when
        wrapper.vm.handleInputConfirm();

        // then
        expect(wrapper.vm.dynamicTags).toEqual(['test']);
      });

      test('inputValue 가 있으면 emit 을 this.dynamicTags 인자로 포함하여 발생시킨다.', () => {
        // given
        wrapper.vm.inputValue = 'test';
        expect(wrapper.vm.inputValue).toBe('test');
        expect(wrapper.emitted().change).toBeUndefined();

        // when
        wrapper.vm.handleInputConfirm();

        // then
        expect(wrapper.emitted().change[0]).toEqual([['test']]);
      });

      test('메서드가 호출되면 inputValue 가 초기화 된다. ', () => {
        // given
        wrapper.vm.inputValue = 'test';
        expect(wrapper.vm.inputValue).toBe('test');

        // when
        wrapper.vm.handleInputConfirm();

        // then
        expect(wrapper.vm.inputValue).toBe('');
      });

      test('keyup.enter event 발생되면 호출된다.', async () => {
        // given
        wrapper.vm.inputValue = 'test';
        const handleInputConfirmSpy = jest.spyOn(wrapper.vm, 'handleInputConfirm');
        const testEl = wrapper.find('input');
        expect(handleInputConfirmSpy).not.toBeCalled();
        expect(testEl.exists()).toBe(true);

        // when
        await testEl.trigger('keyup.enter');

        // then
        expect(handleInputConfirmSpy).toBeCalled();
      });

      test('blur event 발생되면 호출된다.', async () => {
        // given
        wrapper.vm.inputValue = 'test';
        const handleInputConfirmSpy = jest.spyOn(wrapper.vm, 'handleInputConfirm');
        const testEl = wrapper.find('input');
        expect(handleInputConfirmSpy).not.toBeCalled();
        expect(testEl.exists()).toBe(true);

        // when
        await testEl.trigger('blur');

        // then
        expect(handleInputConfirmSpy).toBeCalled();
      });
    });

    describe('onInput() 메소드 확인  ', () => {
      test('input emit 이 인자값 value 와 함께 발생한다.', async () => {
        // given
        const testEl = wrapper.find('input');
        expect(testEl.exists()).toBe(true);
        expect(wrapper.emitted().input).toBeUndefined();

        // when
        testEl.element.value = 'TEST';
        await testEl.trigger('input');

        // then
        expect(wrapper.emitted().input[0]).toEqual(['TEST']);
      });
    });
  });
});

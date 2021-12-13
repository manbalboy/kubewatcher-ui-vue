import { shallowMount } from '@vue/test-utils';
import BasePagination from '@/components/BasePagination.vue';
let wrapper;

beforeEach(() => {
  wrapper = shallowMount(BasePagination);
});
describe('BasePagination', function () {
  describe('props test', () => {
    test('type 확인', async () => {
      /**
       * 1. default 값 확인
       * 2. validator 확인
       * 3. ul.pagination tag 에 `pagination-${type}` class 병합
       */
      const typeProps = wrapper.vm.$options.props.type;
      const testElement = wrapper.find('ul.pagination');
      const testValidationValueArray = ['default', 'primary', 'danger', 'success', 'warning', 'info', 'neutral'];

      // 1. default 값 확인
      expect(typeProps.default).toBe('primary');

      for (const type of testValidationValueArray) {
        // 2. validator 확인
        expect(typeProps.validator(type)).toBe(true);

        // 3. ul.pagination tag 에 `pagination-${type}` class 병합
        await wrapper.setProps({ type });
        expect(testElement.classes()).toContain(`pagination-${type}`);
      }
    });

    test('pageCount 확인', () => {
      /**
       * computed 와 관계
       * 1. default 값 확인 0
       */
      expect(wrapper.vm.$options.props.pageCount.default).toBe(0);
    });

    test('perPage 확인', () => {
      /**
       * computed 와 관계
       * 1. default 값 확인 10
       */
      expect(wrapper.vm.$options.props.perPage.default).toBe(10);
    });

    test('showArrows 확인', async () => {
      /**
       * 1. default 값 확인 true
       * 2. showArrows false 면 .page-item.prev-page, .page-item.next-page visible false 가 됨
       */
      // 1. default 값 확인 true
      expect(wrapper.vm.$options.props.showArrows.default).toBe(true);

      // 2. showArrows false 면 .page-item.prev-page, .page-item.next-page visible false 가 됨
      expect(wrapper.find('.page-item.prev-page').exists()).toBe(true);
      expect(wrapper.find('.page-item.next-page').exists()).toBe(true);
      await wrapper.setProps({ showArrows: false });
      expect(wrapper.find('.page-item.prev-page').exists()).not.toBe(true);
      expect(wrapper.find('.page-item.next-page').exists()).not.toBe(true);
    });

    test('total 확인', () => {
      /**
       * computed 와 관계
       * 1. default 값 확인 0
       */
      expect(wrapper.vm.$options.props.total.default).toBe(0);
    });

    test('value 확인', () => {
      /**
       * computed 와 관계
       * 1. default 값 확인 1
       */
      expect(wrapper.vm.$options.props.value.default).toBe(1);
    });

    test('pagesToDisplay 확인', () => {
      /**
       * computed 와 관계
       * 1. default 값 확인 5
       */
      expect(wrapper.vm.$options.props.pagesToDisplay.default).toBe(5);
    });
  });

  describe('computed test', () => {
    test('paginationClass 확인', async () => {
      /**
       * 1. props type 에 따라 `pagination-${this.type}` 값이 return 된다.
       */

      const testValidationValueArray = ['default', 'primary', 'danger', 'success', 'warning', 'info', 'neutral'];

      for (const type of testValidationValueArray) {
        await wrapper.setProps({ type });

        expect(wrapper.vm.paginationClass).toBe(`pagination-${type}`);
      }
    });

    describe('totalPages 확인', () => {
      /**
       * 1. pageCount 가 0 초과이면 pageCount 값이 리턴된다.
       * 2. pageCount 가 0 이하 이고 total 0 초과이면  Math.ceil(this.total / this.perPage); 리턴된다.
       * 3. 그밖에 1이 리턴된다.
       */
      test('1. pageCount 가 0 초과이면 pageCount 값이 리턴된다.', async () => {
        await wrapper.setProps({ pageCount: 15 });
        expect(wrapper.vm.totalPages).toBe(15);
      });

      test('2. pageCount 가 0 이하 이고 total 0 초과이면  Math.ceil(this.total / this.perPage); 리턴된다.', async () => {
        const testValue = Math.ceil(10 / 2);
        await wrapper.setProps({ pageCount: 0, total: 10, perPage: 2 });
        expect(wrapper.vm.totalPages).toBe(testValue);
      });

      test('3. 그밖에 1이 리턴된다.', async () => {
        await wrapper.setProps({ pageCount: 0, total: 0, perPage: 2 });
        expect(wrapper.vm.totalPages).toBe(1);
      });
    });

    describe('defaultPagesToDisplay 확인', () => {
      /**
       * 1. totalPages 가 0 이상 이고 totalPages 값이 pagesToDisplay 값보다 작으면 totalPages 가 리던된다.
       * 2. 그 밖에 pagesToDisplay 값이 리턴된다.
       */
      test('1. totalPages 가 0 이상 이고 totalPages 값이 pagesToDisplay 값보다 작으면 totalPages 가 리던된다.', async () => {
        await wrapper.setProps({ pageCount: 15, pagesToDisplay: 20 });
        expect(wrapper.vm.defaultPagesToDisplay).toBe(15);
      });

      test('2. 그 밖에 pagesToDisplay 값이 리턴된다.', async () => {
        await wrapper.setProps({ pageCount: 15, pagesToDisplay: 1 });
        expect(wrapper.vm.defaultPagesToDisplay).toBe(1);
      });
    });

    describe('minPage 확인', () => {
      test('this.value >= this.defaultPagesToDisplay false 일때 1을 리턴한다.', async () => {
        await wrapper.setProps({ value: 9, totalPages: 0, pagesToDisplay: 10 });

        // value = 9 , defaultPagesToDisplay = 10
        expect(wrapper.vm.minPage).toBe(1);
      });

      describe('this.value >= this.defaultPagesToDisplay false 일때', () => {
        test('newMaxPage > this.totalPages 일때 this.totalPages - this.defaultPagesToDisplay + 1', async () => {
          await wrapper.setProps({ value: 9, pageCount: 1, pagesToDisplay: 9 });

          // value = 9 , defaultPagesToDisplay = 1, pagesToAdd=0, newMaxPage=9
          expect(wrapper.vm.minPage).toBe(1);
        });

        test.skip('newMaxPage < this.totalPages 일때 this.value - pagesToAdd', async () => {});
      });
    });
  });

  describe('watch test', () => {
    test('perPage 확인', async () => {
      /**
       * 1. perPage 값이 변경되면 input emit 이 인자값 1과 함께 호출
       */

      expect(wrapper.emitted().input).toBeUndefined();
      await wrapper.setProps({ perPage: 11 });
      expect(wrapper.emitted().input).toEqual([[1]]);
    });

    test('total 확인', async () => {
      /**
       * 1. total 값이 변경되면 input emit 이 인자값 1과 함께 호출
       */

      expect(wrapper.emitted().input).toBeUndefined();
      await wrapper.setProps({ total: 11 });
      expect(wrapper.emitted().input).toEqual([[1]]);
    });
  });

  describe('methods or event test', () => {
    describe('range methods', () => {
      /**
       * 1. 인자가 숫자가 아닌경우 빈 배열 반환
       * 2. 인자가 NaN 인경우 TypeError 발생
       * 3. 인자가 Infinity 인경우 TypeError 발생
       * 4. 첫번째 인자부터 두번째 인자까지의 배열을 반환
       */
      test('1. 인자가 숫자가 아닌경우 빈 배열 반환', () => {
        expect(wrapper.vm.range('가', 1)).toEqual([]);
        expect(wrapper.vm.range(1, '나')).toEqual([]);
      });

      test('2. 인자가 NaN 인경우 TypeError 발생', () => {
        expect(() => wrapper.vm.range(NaN, 1)).toThrow(TypeError);
        expect(() => wrapper.vm.range(1, NaN)).toThrow('NaN');
      });

      test('3. 인자가 Infinity 인경우 TypeError 발생', () => {
        expect(() => wrapper.vm.range(Infinity, 1)).toThrow(TypeError);
        expect(() => wrapper.vm.range(1, Infinity)).toThrow('Infinity');
      });

      test('4. 첫번째 인자부터 두번째 인자까지의 배열을 반환', () => {
        // 1~10 까지 배열 생성
        const testArray = Array.from({ length: 10 }, (_, index) => index + 1);
        expect(wrapper.vm.range(1, 10)).toEqual(testArray);
      });
    });

    test('changePage methods', () => {
      /**
       * 1. 함수가 호출되면 input emit 발생 인자로 받은 인자 반환
       */

      wrapper.vm.changePage('test');
      expect(wrapper.emitted().input).toEqual([['test']]);
    });

    test('nextPage methods', async () => {
      /**
       * 1. value 값이 totalPages 값보다 작을때 input emit 발생 인자로는 this.value + 1 발생
       */

      await wrapper.setProps({ value: 5, pageCount: 6 });
      wrapper.vm.nextPage();
      expect(wrapper.emitted().input).toEqual([[wrapper.props().value + 1]]);
    });

    test('prevPage methods', async () => {
      /**
       * 1. props 'value' 값이 1보다 크면 input emit 발생 인자로는 value - 1 발생
       */

      await wrapper.setProps({ value: 5 });
      wrapper.vm.prevPage();

      expect(wrapper.emitted().input).toEqual([[wrapper.props().value - 1]]);
    });
  });
});

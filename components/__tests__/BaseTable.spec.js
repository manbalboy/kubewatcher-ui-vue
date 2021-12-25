import { shallowMount } from '@vue/test-utils';
import BaseTable from '@/components/BaseTable.vue';
let wrapper;

beforeEach(() => {
  wrapper = shallowMount(BaseTable);
});

describe('BaseTable 확인', () => {
  describe('props 확인', () => {
    describe('columns 확인', () => {
      test('default 값 확인 : []', () => {
        // then
        expect(wrapper.props().columns).toEqual([]);
      });

      test('columns 값에 따라 th 가 생성된다.', async () => {
        // given
        const columns = ['test1', 'test2', 'test3'];
        expect(wrapper.findAll('th').length).toBe(0);

        // when
        await wrapper.setProps({ columns });

        // then
        expect(wrapper.findAll('th').length).toBe(columns.length);
      });
    });

    describe('data 확인', () => {
      test('default 값 확인 : []', () => {
        expect(wrapper.props().data).toEqual([]);
      });

      test('data 값 만큼 tbody>tr 이 생성된다.', async () => {
        // given
        const data = ['test1', 'test2', 'test3'];
        expect(wrapper.findAll('tbody>tr').length).toBe(0);

        // when
        await wrapper.setProps({ data });

        // then
        expect(wrapper.findAll('tbody>tr').length).toBe(data.length);
      });
    });

    describe('type 확인', () => {
      test('기본값 확인 : ""', () => {
        expect(wrapper.props().type).toBe('');
      });

      test('validator 확인', () => {
        // given
        const validator = wrapper.vm.$options.props.type.validator;
        const testArray = ['striped', 'hover'];

        testArray.forEach(item => {
          // when then
          expect(validator(item)).toBe(true);
        });

        expect(wrapper.props().type).toBe('');
      });
    });

    describe('theadClasses 확인', () => {
      test('default 값 확인 : ""', () => {
        expect(wrapper.props().theadClasses).toBe('');
      });

      test('thead class 로 setting', async () => {
        // given
        const testElement = wrapper.find('thead');
        const testClass = 'test-class';
        expect(testElement.classes()).not.toContain(testClass);

        // when
        await wrapper.setProps({ theadClasses: testClass });

        // then
        expect(testElement.classes()).toContain(testClass);
      });
    });

    describe('tbodyClasses 확인', () => {
      test('default 값 확인 : ""', () => {
        expect(wrapper.props().tbodyClasses).toBe('');
      });

      test('thead class 로 setting', async () => {
        // given
        const testElement = wrapper.find('tbody');
        const testClass = 'test-class';
        expect(testElement.classes()).not.toContain(testClass);

        // when
        await wrapper.setProps({ tbodyClasses: testClass });

        // then
        expect(testElement.classes()).toContain(testClass);
      });
    });
  });

  describe('methods 확인', () => {
    let testItem;
    let column;

    beforeEach(() => {
      testItem = { test: 'test1' };
      column = 'test';
    });

    describe('hasValue 확인', () => {
      test('item, column 인자를 받고 item[column.toLowerCase()] 값에 따라 true false 를 반환한다.', () => {
        // true
        expect(wrapper.vm.hasValue(testItem, column)).toBe(true);

        // false
        expect(wrapper.vm.hasValue(testItem, '실패')).toBe(true);
      });
    });

    describe('itemValue 확인', () => {
      test('item, column 인자를 받고 item[column.toLowerCase()] 값을 반환한다.', () => {
        expect(wrapper.vm.itemValue(testItem, column)).toEqual(testItem[column]);
      });
    });
  });

  describe('computed 확인', () => {
    describe('tableClass 확인', () => {
      test('type 값이 없으면 "" 반환', () => {
        // given
        expect(wrapper.props().type).toBe('');

        // then
        expect(wrapper.vm.tableClass).toBe('');
      });

      test('type 값이 있으면 table-{this.type} 반환', async () => {
        // given
        const testValue = 'hover';
        const expectValue = `table-${testValue}`;
        expect(wrapper.props().type).toBe('');

        // when
        await wrapper.setProps({ type: testValue });

        // then
        expect(wrapper.vm.tableClass).toBe(expectValue);
      });
    });
  });
});

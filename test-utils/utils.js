/**
 * props default 매쳐 실행
 * @param {Object} wrapper vueTest util object
 * @param {string} key test key
 * @param {*} defaultValue expect value
 */
export const propsDefaultCheck = (wrapper, key, defaultValue) => {
  expect(wrapper.props()[key]).toEqual(defaultValue);
};

/**
 * props validator 결과값 반환
 * @param {Object} wrapper vueTest util object
 * @param {*} value test value
 * @param {string} key test key
 * @returns {boolean} pass/fail
 */
export const propsValidator = (wrapper, key, value) => {
  return wrapper.vm.$options.props[key].validator(value);
};

export const propsDefaultCheck = (wrapper, key, defaultValue) => {
  expect(wrapper.props()[key]).toBe(defaultValue);
};

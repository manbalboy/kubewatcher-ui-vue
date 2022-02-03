import '!style-loader!css-loader!../static/css/demo.css';
import '!style-loader!css-loader!../static/css/nucleo-icons.css';
import '!style-loader!css-loader!../static/css/font-awesome.css';
import '!style-loader!css-loader!sass-loader!../assets/sass/black-dashboard-pro.scss';
import { withTests } from "@storybook/addon-jest";

import results from '../.jest-test-results.json';
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  withTests({
    results,
  }),
];
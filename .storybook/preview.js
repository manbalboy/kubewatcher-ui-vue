import '!style-loader!css-loader!sass-loader!../assets/sass/black-dashboard-pro.scss';
import '!style-loader!css-loader!../assets/css/demo.css';
import '!style-loader!css-loader!../assets/css/nucleo-icons.css';
import '!style-loader!css-loader!../assets/css/font-awesome.css';
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
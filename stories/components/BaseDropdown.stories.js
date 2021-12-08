import BaseDropdown from '../../components/BaseDropdown.vue';

export default {
  title: 'Component/BaseDropdown',
  component: BaseDropdown,
  argTypes: {
    tag: { control: 'text' },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BaseDropdown },
  template: `<BaseDropdown direction="up" title="Dropup" title-classes="dropdown-toggle btn btn-primary btn-block">
                <h6 class="dropdown-header">Dropdown header</h6>
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
            </BaseDropdown>`,
  methods: {
    onClick(...arg) {
      console.log('onClick', arg);
    },
  },
});

export const 기본_형태_버튼 = Template.bind({});

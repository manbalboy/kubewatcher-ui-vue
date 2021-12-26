import UserCard from '@/components/UserProfile/UserCard.vue';

export default {
  title: 'Component/UserProfile/UserCard',
  component: UserCard,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { UserCard },
  template: `<UserCard v-bind="$props" /> `,
});

export const 기본 = Template.bind({});
기본.args = {};

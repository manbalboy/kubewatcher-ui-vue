import EditProfileForm from '@/components/UserProfile/EditProfileForm.vue';

export default {
  title: 'Component/UserProfile/EditProfileForm',
  component: EditProfileForm,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { EditProfileForm },
  template: `<EditProfileForm v-bind="$props" /> `,
});

export const 기본 = Template.bind({});
기본.args = {};

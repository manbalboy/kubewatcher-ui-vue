import { shallowMount } from '@vue/test-utils';
import EditProfileForm from '@/components/UserProfile/EditProfileForm.vue';

describe('EditProfileForm', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(EditProfileForm);
  });

  test('updateProfile methods 확인', async () => {
    // given
    jest.spyOn(window, 'alert').mockReturnValue(null);
    const updateProfileSpy = jest.spyOn(wrapper.vm, 'updateProfile');
    const testForm = wrapper.find('form');
    expect(updateProfileSpy).not.toBeCalled();

    // when
    await testForm.trigger('submit.prevent');

    // then
    expect(updateProfileSpy).toBeCalled();
  });
});

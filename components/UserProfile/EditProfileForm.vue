<template>
  <Card>
    <h5 slot="header" class="title">Edit Profile</h5>
    <form @submit.prevent="updateProfile">
      <div class="row">
        <div class="col-md-5">
          <BaseInput v-model="user.company" type="text" label="Company" :disabled="true" placeholder="Company">
          </BaseInput>
        </div>
        <div class="col-md-3">
          <BaseInput v-model="user.username" type="text" label="Username" placeholder="Username"> </BaseInput>
        </div>
        <div class="col-md-4">
          <BaseInput v-model="user.email" type="email" label="Email address" placeholder="mike@email.com"> </BaseInput>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <BaseInput v-model="user.firstName" type="text" label="First Name" placeholder="First Name"> </BaseInput>
        </div>
        <div class="col-md-6">
          <BaseInput v-model="user.lastName" type="text" label="Last Name" placeholder="Last Name"> </BaseInput>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <BaseInput v-model="user.address" type="text" label="Address" placeholder="Home Address"> </BaseInput>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <BaseInput v-model="user.city" type="text" label="City" placeholder="City"> </BaseInput>
        </div>
        <div class="col-md-4">
          <BaseInput v-model="user.country" type="text" label="Country" placeholder="Country"> </BaseInput>
        </div>
        <div class="col-md-4">
          <BaseInput v-model="user.postalCode" label="Postal Code" placeholder="ZIP Code"> </BaseInput>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <BaseInput label="About Me">
            <textarea v-model="user.aboutMe" class="form-control" placeholder="ZIP Code"> </textarea>
          </BaseInput>
        </div>
      </div>

      <BaseButton native-type="submit" type="primary" class="btn-fill"> Save </BaseButton>
    </form>
  </Card>
</template>
<script>
  import { BaseButton, BaseInput, Card } from '@/components/index.js';
  export default {
    name: 'EditProfileForm',
    components: {
      BaseButton,
      BaseInput,
      Card,
    },
    data() {
      return {
        user: {
          company: 'Creative Code Inc.',
          username: 'michael23',
          email: '',
          firstName: 'Mike',
          lastName: 'Andrew',
          address: 'Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09',
          city: 'New York',
          country: 'USA',
          postalCode: '',
          aboutMe: `Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo.`,
        },
      };
    },
    methods: {
      updateProfile(e) {
        this.$emit('submit', this.user, e);
        alert('Your data: ' + JSON.stringify(this.user));
      },
    },
  };
</script>
<style></style>

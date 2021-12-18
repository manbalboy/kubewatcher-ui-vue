<template>
  <div>
    <h5 class="info-text"> Let's start with the basic information (with validation) </h5>
    <div class="row justify-content-center mt-5">
      <div class="col-sm-5">
        <BaseInput
          v-model="model.firstName"
          v-validate="modelValidations.firstName"
          name="firstName"
          required
          placeholder="First Name"
          :error="getError('firstName')"
          addon-left-icon="tim-icons icon-single-02"
        >
        </BaseInput>

        <BaseInput
          v-model="model.email"
          v-validate="modelValidations.email"
          name="email"
          required
          placeholder="Email"
          :error="getError('email')"
          addon-left-icon="tim-icons icon-email-85"
        >
        </BaseInput>
      </div>
      <div class="col-sm-5">
        <BaseInput
          v-model="model.lastName"
          v-validate="modelValidations.lastName"
          name="lastName"
          required
          placeholder="Last Name"
          :error="getError('lastName')"
          addon-left-icon="tim-icons icon-caps-small"
        >
        </BaseInput>

        <BaseInput
          v-model="model.phone"
          v-validate="modelValidations.phone"
          name="phone"
          required
          placeholder="Phone"
          :error="getError('phone')"
          addon-left-icon="tim-icons icon-mobile"
        >
        </BaseInput>
      </div>
      <div class="col-sm-10">
        <BaseInput
          v-model="model.address"
          v-validate="modelValidations.address"
          name="address"
          placeholder="Address"
          :error="getError('address')"
          addon-left-icon="tim-icons icon-square-pin"
        >
        </BaseInput>
      </div>
    </div>
  </div>
</template>
<script>
  import { BaseInput } from '@/components';
  export default {
    name: 'FirstStep',
    components: {
      BaseInput,
    },
    data() {
      return {
        model: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
        },
        modelValidations: {
          firstName: {
            required: true,
            min: 5,
          },
          lastName: {
            required: true,
            min: 5,
          },
          email: {
            required: true,
            email: true,
          },
          phone: {
            required: true,
            numeric: true,
          },
        },
      };
    },
    methods: {
      getError(fieldName) {
        return this.errors.first(fieldName);
      },
      validate() {
        return this.$validator.validateAll().then(res => {
          this.$emit('on-validated', res, this.model);
          return res;
        });
      },
    },
  };
</script>
<style></style>

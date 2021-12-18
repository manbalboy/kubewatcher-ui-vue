<template>
  <form>
    <card footer-classes="text-right">
      <div slot="header">
        <h4 class="card-title">Register Form</h4>
      </div>
      <div>
        <BaseInput
          v-model="model.email"
          v-validate="modelValidations.email"
          type="email"
          required
          name="email"
          label="Email address"
          :error="getError('email')"
        >
        </BaseInput>

        <BaseInput
          v-model="model.password"
          v-validate="modelValidations.password"
          label="Password"
          required
          type="password"
          name="password"
          :error="getError('password')"
        >
        </BaseInput>

        <BaseInput
          v-model="model.confirmPassword"
          v-validate="modelValidations.confirmPassword"
          label="Confirm Password"
          required
          type="password"
          name="confirm"
          :error="getError('confirm')"
        >
        </BaseInput>
        <div class="category form-category">* Required fields</div>
      </div>
      <template slot="footer" class="text-right">
        <BaseCheckbox v-model="model.subscribe" class="pull-left" name="subscribe">
          Accept terms & conditions
        </BaseCheckbox>
        <base-button native-type="submit" type="primary" @click.prevent="validate">Register</base-button>
      </template>
    </card>
  </form>
</template>
<script>
  import { BaseCheckbox, BaseInput } from '@/components/index';

  export default {
    components: {
      BaseCheckbox,
      BaseInput,
    },
    data() {
      return {
        model: {
          email: '',
          password: '',
          confirmPassword: '',
          subscribe: false,
        },
        modelValidations: {
          email: {
            required: true,
            email: true,
          },
          password: {
            required: true,
            min: 5,
          },
          confirmPassword: {
            required: true,
            confirmed: 'password',
          },
          subscribe: {
            required: true,
          },
        },
      };
    },
    methods: {
      getError(fieldName) {
        return this.errors.first(fieldName);
      },
      validate() {
        this.$validator.validateAll().then(isValid => {
          this.$emit('on-submit', this.registerForm, isValid);
        });
      },
    },
  };
</script>
<style></style>

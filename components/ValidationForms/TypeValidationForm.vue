<template>
  <form class="form-horizontal">
    <Card>
      <h4 slot="header" class="card-title">Type Validation</h4>
      <div>
        <div class="row">
          <label class="col-sm-2 col-form-label">Requred Text</label>
          <div class="col-sm-7">
            <BaseInput
              v-model="model.required"
              v-validate="modelValidations.required"
              name="required"
              :error="getError('required')"
            >
            </BaseInput>
          </div>
          <label class="col-sm-3 label-on-right"><code>required="true"</code></label>
        </div>

        <div class="row">
          <label class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-7">
            <BaseInput
              v-model="model.email"
              v-validate="modelValidations.email"
              name="email"
              :error="getError('email')"
            >
            </BaseInput>
          </div>
          <label class="col-sm-3 label-on-right"><code>email="true"</code></label>
        </div>

        <div class="row">
          <label class="col-sm-2 col-form-label">Number</label>
          <div class="col-sm-7">
            <BaseInput
              v-model="model.number"
              v-validate="modelValidations.number"
              name="number"
              :error="getError('number')"
            >
            </BaseInput>
          </div>
          <label class="col-sm-3 label-on-right"><code>numeric="true"</code></label>
        </div>

        <div class="row">
          <label class="col-sm-2 col-form-label">Url</label>
          <div class="col-sm-7">
            <BaseInput v-model="model.url" v-validate="modelValidations.url" name="url" :error="getError('url')">
            </BaseInput>
          </div>
          <label class="col-sm-3 label-on-right"><code>url="true"</code></label>
        </div>

        <div class="row">
          <label class="col-sm-2 col-form-label">Url</label>
          <div class="col-sm-3">
            <BaseInput
              v-model="model.equalToSource"
              v-validate="modelValidations.equalToSource"
              name="equalToSource"
              placeholder="Source field"
              :error="getError('equalToSource')"
            >
            </BaseInput>
          </div>
          <div class="col-sm-3">
            <BaseInput
              v-model="model.equalToDest"
              v-validate="modelValidations.equalToDest"
              name="equalToDest"
              placeholder="Destination field"
              :error="getError('equalToDest')"
            >
            </BaseInput>
          </div>

          <label class="col-sm-4 label-on-right"><code>confirmed="equalToSource"</code></label>
        </div>
      </div>
      <div class="text-center">
        <BaseButton native-type="submit" type="primary" @click.native.prevent="validate">Validate inputs</BaseButton>
      </div>
    </Card>
  </form>
</template>

<script>
  import { BaseButton, BaseInput, Card } from '@/components/index.js';
  export default {
    name: 'TypeValidationForm',
    components: {
      BaseButton,
      BaseInput,
      Card,
    },
    data() {
      return {
        model: {
          required: '',
          email: '',
          number: '',
          equalToSourceurl: '',
          equalToSource: '',
          equalToDest: '',
        },
        modelValidations: {
          required: {
            required: true,
          },
          email: {
            email: true,
          },
          number: {
            numeric: true,
          },
          url: {
            url: true,
          },
          equalToSource: {
            required: true,
          },
          equalToDest: {
            required: true,
            confirmed: 'equalToSource',
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

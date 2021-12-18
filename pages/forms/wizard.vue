<template>
  <div>
    <div class="row d-flex justify-content-center">
      <div class="col-md-10">
        <SimpleWizard>
          <template slot="header">
            <h3 class="card-title">Build your profile</h3>
            <h3 class="description"> This information will let us know more about you. </h3>
          </template>

          <WizardTab :before-change="() => validateStep('step1')">
            <template slot="label">
              <i class="tim-icons icon-single-02"></i>
              <p>About</p>
            </template>
            <FirstStep ref="step1" @on-validated="onStepValidated"></FirstStep>
          </WizardTab>

          <WizardTab :before-change="() => validateStep('step2')">
            <template slot="label">
              <i class="tim-icons icon-settings-gear-63"></i>
              <p>Account</p>
            </template>
            <SecondStep ref="step2" @on-validated="onStepValidated"></SecondStep>
          </WizardTab>

          <WizardTab :before-change="() => validateStep('step3')">
            <template slot="label">
              <i class="tim-icons icon-delivery-fast"></i>
              <p>Address</p>
            </template>
            <ThirdStep ref="step3"></ThirdStep>
          </WizardTab>
        </SimpleWizard>
      </div>
    </div>
  </div>
</template>
<script>
  import swal from 'sweetalert2';
  import FirstStep from '../../components/Wizard/FirstStep.vue';
  import SecondStep from '../../components/Wizard/SecondStep.vue';
  import ThirdStep from '../../components/Wizard/ThirdStep.vue';
  import { SimpleWizard, WizardTab } from '@/components';

  export default {
    name: 'WizardForm',
    components: {
      FirstStep,
      SecondStep,
      ThirdStep,
      SimpleWizard,
      WizardTab,
    },
    data() {
      return {
        wizardModel: {},
      };
    },
    methods: {
      validateStep(ref) {
        return this.$refs[ref].validate();
      },
      onStepValidated(validated, model) {
        this.wizardModel = { ...this.wizardModel, ...model };
      },
      wizardComplete() {
        swal('Good job!', 'You clicked the finish button!', 'success');
      },
    },
  };
</script>

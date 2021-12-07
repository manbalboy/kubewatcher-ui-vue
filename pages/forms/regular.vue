<template>
  <div class="row">
    <div class="col-md-6">
      <card class="stacked-form" title="Stacked Form">
        <h4 slot="header" class="card-title">Stacked Form</h4>
        <form @submit.prevent>
          <div>
            <BaseInput label="Email address" type="email" placeholder="Enter email"> </BaseInput>
            <BaseInput label="Password" type="password" placeholder="Password"> </BaseInput>
            <div class="form-group">
              <BaseCheckbox>Subscribe to newsletter</BaseCheckbox>
            </div>
            <base-button class="mt-3" native-type="submit" type="primary">Submit</base-button>
          </div>
        </form>
      </card>
    </div>
    <div class="col-md-6">
      <card title="Horizontal Form">
        <h4 slot="header" class="card-title">Horizontal Form</h4>
        <form class="form-horizontal" action="#" method="#" @submit.prevent>
          <div class="row">
            <label class="col-md-3 col-form-label">Username</label>
            <div class="col-md-9">
              <BaseInput placeholder="Username"> </BaseInput>
            </div>
          </div>

          <div class="row">
            <label class="col-md-3 col-form-label">Email</label>
            <div class="col-md-9">
              <BaseInput placeholder="Email" type="email"> </BaseInput>
            </div>
          </div>

          <div class="row">
            <label class="col-md-3 col-form-label">Password</label>
            <div class="col-md-9">
              <BaseInput placeholder="Password" type="password"> </BaseInput>
            </div>
          </div>

          <div class="row">
            <label class="col-md-3 col-form-label"></label>
            <div class="col-md-9">
              <BaseCheckbox>Remember me</BaseCheckbox>
            </div>
          </div>
        </form>
        <div class="row">
          <div class="col-md-9 offset-md-3 col-12">
            <base-button class="mt-3" native-type="submit" type="primary"> Sign in </base-button>
          </div>
        </div>
      </card>
    </div>
    <!-- end card -->
    <div class="col-md-12">
      <card>
        <template slot="header">
          <h4 class="card-title">Form Elements</h4>
        </template>
        <div>
          <form method="get" action="/" class="form-horizontal">
            <div class="row">
              <label class="col-sm-2 col-form-label">With help</label>
              <div class="col-sm-10">
                <BaseInput placeholder="Enter email">
                  <span slot="helpBlock" class="form-text">A block of help text that breaks onto a new line. </span>
                </BaseInput>
              </div>
            </div>

            <div class="row">
              <label class="col-sm-2 col-form-label">Password</label>
              <div class="col-sm-10">
                <BaseInput type="password" value="password"> </BaseInput>
              </div>
            </div>

            <div class="row">
              <label class="col-sm-2 col-form-label">Placeholder</label>
              <div class="col-sm-10">
                <BaseInput placeholder="Placeholder"> </BaseInput>
              </div>
            </div>

            <div class="row">
              <label class="col-sm-2 col-form-label">Disabled</label>
              <div class="col-sm-10">
                <BaseInput value="Disabled input here.." disabled> </BaseInput>
              </div>
            </div>

            <div class="row">
              <label class="col-sm-2 col-form-label">Static Control</label>
              <div class="col-sm-10">
                <BaseInput>
                  <p class="form-control-static">hello@creative-tim.com</p>
                </BaseInput>
              </div>
            </div>

            <div class="row">
              <label class="col-sm-2 col-form-label">Checkboxes and radios</label>
              <div class="col-sm-10 checkbox-radios">
                <BaseCheckbox v-model="checkboxes.first">First checkbox</BaseCheckbox>
                <BaseCheckbox v-model="checkboxes.second">Second checkbox</BaseCheckbox>

                <BaseRadio v-model="radios.radio1" name="1">First Radio</BaseRadio>
                <BaseRadio v-model="radios.radio1" name="2">Second Radio</BaseRadio>
              </div>
            </div>

            <div class="row">
              <label class="col-sm-2 col-form-label">Inline checkboxes</label>
              <div class="col-sm-10 checkbox-radios">
                <BaseCheckbox v-model="checkboxes.a" inline>a</BaseCheckbox>
                <BaseCheckbox v-model="checkboxes.b" inline>b</BaseCheckbox>
                <BaseCheckbox v-model="checkboxes.c" inline>c</BaseCheckbox>
              </div>
            </div>
          </form>
        </div>
      </card>
      <!-- end card -->
    </div>
    <div class="col-md-12">
      <card>
        <h4 slot="header" class="card-title">Input Variants</h4>
        <form method="get" action="/" class="form-horizontal">
          <div class="row">
            <label class="col-sm-2 col-form-label">Custom Checkboxes &amp; radios</label>
            <div class="col-sm-4 col-sm-offset-1 checkbox-radios">
              <BaseCheckbox>Unchecked</BaseCheckbox>
              <BaseCheckbox :checked="true">Checked</BaseCheckbox>
              <BaseCheckbox disabled>Disabled Checked</BaseCheckbox>
              <BaseCheckbox disabled :checked="true">Disabled Checked</BaseCheckbox>
            </div>

            <div class="col-sm-5 checkbox-radios">
              <BaseRadio v-model="radios.radioOn" name="1">Radio is On</BaseRadio>
              <BaseRadio v-model="radios.radioOn" name="2">Radio is Off</BaseRadio>

              <BaseRadio v-model="radios.radioOff" name="1" disabled>Radio is On</BaseRadio>
              <BaseRadio v-model="radios.radioOff" name="2" disabled>Radio is Off</BaseRadio>
            </div>
          </div>

          <div class="row">
            <label class="col-sm-2 col-form-label">Input with success</label>
            <div class="col-sm-10">
              <BaseInput class="has-success" value="Success"></BaseInput>
            </div>
          </div>

          <div class="row">
            <label class="col-sm-2 col-form-label">Input with error</label>
            <div class="col-sm-10">
              <BaseInput class="has-danger" value="Error"></BaseInput>
            </div>
          </div>

          <div class="row">
            <label class="col-sm-2 col-form-label">Column sizing</label>

            <div class="col-sm-10">
              <div class="row">
                <div class="col-md-3">
                  <BaseInput placeholder=".col-md-3"></BaseInput>
                </div>

                <div class="col-md-4">
                  <BaseInput placeholder=".col-md-4"></BaseInput>
                </div>

                <div class="col-md-5">
                  <BaseInput placeholder=".col-md-5"></BaseInput>
                </div>
              </div>
            </div>
          </div>
        </form>
      </card>
    </div>
  </div>
</template>
<script>
  import { BaseCheckbox, BaseRadio, BaseInput } from '@/components/index';

  export default {
    name: 'RegularForms',
    components: {
      BaseCheckbox,
      BaseRadio,
      BaseInput,
    },
    data() {
      return {
        radios: {
          radio1: '1',
          radio2: '2',
          radio3: '2',
          radioOn: '2',
          radioOff: '2',
        },
        checkboxes: {
          first: false,
          second: false,
          a: false,
          b: false,
          c: false,
          unchecked: false,
          checked: true,
          disabledUnchecked: false,
          disabledChecked: true,
        },
      };
    },
  };
</script>
<style></style>

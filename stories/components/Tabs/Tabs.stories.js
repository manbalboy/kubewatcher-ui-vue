import Tabs from '@/components/Tabs/Tabs.vue';
import Tab from '@/components/Tabs/Tab.vue';
const acceptedValues = ['primary', 'info', 'success', 'warning', 'danger'];

export default {
  title: 'Component/Tabs/Tabs',
  component: Tabs,
  argTypes: {
    type: {
      control: 'select',
      options: acceptedValues,
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Tabs, Tab },
  template: `
    <Tabs v-bind="$props" :class="{row: this.vertical}">
      <Tab>
        <span slot="label"> <i class="tim-icons icon-istanbul"></i>Home </span>
        Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C
        users after installed base benefits. <br /><br />
        Dramatically visualize customer directed convergence without revolutionary ROI.
      </Tab>
    
      <Tab>
        <span slot="label"> <i class="tim-icons icon-bag-16"></i>Messages </span>
        Efficiently unleash cross-media information without cross-media value. Quickly maximize timely
        deliverables for real-time schemas.
        <br /><br />Dramatically maintain clicks-and-mortar solutions without functional solutions.
      </Tab>
  </Tabs>`,
});

const LabelTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Tabs, Tab },
  template: `
    <Tabs v-bind="$props" :class="{row: this.vertical}">
      <Tab label="Test1">
        Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C
        users after installed base benefits. <br /><br />
        Dramatically visualize customer directed convergence without revolutionary ROI.
      </Tab>
    
      <Tab label="Test2">
        Efficiently unleash cross-media information without cross-media value. Quickly maximize timely
        deliverables for real-time schemas.
        <br /><br />Dramatically maintain clicks-and-mortar solutions without functional solutions.
      </Tab>
  </Tabs>`,
});

const AllTypeTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Tabs, Tab },
  template: `
    <div>
      <Tabs v-bind="$props" :class="{row: this.vertical}">
        <Tab label="Test1">
          Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C
          users after installed base benefits. <br /><br />
          Dramatically visualize customer directed convergence without revolutionary ROI.
        </Tab>
      
        <Tab label="Test2">
          Efficiently unleash cross-media information without cross-media value. Quickly maximize timely
          deliverables for real-time schemas.
          <br /><br />Dramatically maintain clicks-and-mortar solutions without functional solutions.
        </Tab>
      </Tabs>
  
      
      <Tabs v-bind="$props" type="info" :class="{row: this.vertical}">
      <Tab label="Test1">
        Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C
        users after installed base benefits. <br /><br />
        Dramatically visualize customer directed convergence without revolutionary ROI.
      </Tab>
  
      <Tab label="Test2">
        Efficiently unleash cross-media information without cross-media value. Quickly maximize timely
        deliverables for real-time schemas.
        <br /><br />Dramatically maintain clicks-and-mortar solutions without functional solutions.
      </Tab>
      
      </Tabs>
      <Tabs v-bind="$props"  type="success" :class="{row: this.vertical}">
      <Tab label="Test1">
        Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C
        users after installed base benefits. <br /><br />
        Dramatically visualize customer directed convergence without revolutionary ROI.
      </Tab>
  
      <Tab label="Test2">
        Efficiently unleash cross-media information without cross-media value. Quickly maximize timely
        deliverables for real-time schemas.
        <br /><br />Dramatically maintain clicks-and-mortar solutions without functional solutions.
      </Tab>
      </Tabs>
  
      <Tabs v-bind="$props"  type="warning" :class="{row: this.vertical}">
      <Tab label="Test1">
        Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C
        users after installed base benefits. <br /><br />
        Dramatically visualize customer directed convergence without revolutionary ROI.
      </Tab>
  
      <Tab label="Test2">
        Efficiently unleash cross-media information without cross-media value. Quickly maximize timely
        deliverables for real-time schemas.
        <br /><br />Dramatically maintain clicks-and-mortar solutions without functional solutions.
      </Tab>
      </Tabs>
  
      <Tabs v-bind="$props"  type="danger" :class="{row: this.vertical}">
      <Tab label="Test1">
        Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C
        users after installed base benefits. <br /><br />
        Dramatically visualize customer directed convergence without revolutionary ROI.
      </Tab>
  
      <Tab label="Test2">
        Efficiently unleash cross-media information without cross-media value. Quickly maximize timely
        deliverables for real-time schemas.
        <br /><br />Dramatically maintain clicks-and-mortar solutions without functional solutions.
      </Tab>
      </Tabs>
    </div>
  `,
});

export const 기본 = LabelTemplate.bind({});
기본.args = {};

export const 사각형_버튼 = LabelTemplate.bind({});
사각형_버튼.args = {
  square: true,
};

export const 센터 = LabelTemplate.bind({});
센터.args = {
  square: true,
  centered: true,
};

export const 수직 = LabelTemplate.bind({});
수직.args = {
  square: true,
  vertical: true,
};

export const 아이콘_기본 = Template.bind({});
아이콘_기본.args = {};

export const ALL_TYPE = AllTypeTemplate.bind({});
ALL_TYPE.args = {};

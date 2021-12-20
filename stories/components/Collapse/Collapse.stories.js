import Collapse from '@/components/Collapse/Collapse.vue';
import CollapseItem from '@/components/Collapse/CollapseItem.vue';
export default {
  title: 'Component/Collapse/Collapse',
  component: Collapse,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Collapse, CollapseItem },
  template: `<Collapse v-bind="$props"> 
  <CollapseItem title="Collapsible Group Item #1">
    <div>
      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
      moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
      Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
      shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
      proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
      aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
    </div>
  </CollapseItem>
  <CollapseItem title="Collapsible Group Item #2">
    <div>
      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
      moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
      Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
      shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
      proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
      aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
    </div>
  </CollapseItem>

  </Collapse> `,
});

export const 기본 = Template.bind({});
기본.args = {};

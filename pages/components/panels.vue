<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <card>
          <template slot="header">
            <h5 class="card-category">Navigation Pills</h5>
            <h3 class="card-title">Horizontal Tabs</h3>
          </template>

          <Tabs type="primary" value="Settings">
            <TabPane label="Profile">
              Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C
              users after installed base benefits. <br /><br />
              Dramatically visualize customer directed convergence without revolutionary ROI.
            </TabPane>

            <TabPane label="Settings">
              Efficiently unleash cross-media information without cross-media value. Quickly maximize timely
              deliverables for real-time schemas.
              <br /><br />Dramatically maintain clicks-and-mortar solutions without functional solutions.
            </TabPane>

            <TabPane label="Options">
              Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate
              one-to-one customer service with robust ideas. <br /><br />Dynamically innovate resource-leveling customer
              service for state of the art customer service.
            </TabPane>
          </Tabs>
        </card>
      </div>

      <div class="col-md-6">
        <card>
          <template slot="header">
            <h5 class="card-category">Navigation Pills</h5>
            <h3 class="card-title">Vertical Tabs</h3>
          </template>

          <Tabs type="primary" vertical class="row">
            <TabPane label="Profile">
              Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C
              users after installed base benefits. <br /><br />
              Dramatically visualize customer directed convergence without revolutionary ROI.
            </TabPane>

            <TabPane label="Settings">
              Efficiently unleash cross-media information without cross-media value. Quickly maximize timely
              deliverables for real-time schemas.
              <br /><br />Dramatically maintain clicks-and-mortar solutions without functional solutions.
            </TabPane>

            <TabPane label="Options">
              Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate
              one-to-one customer service with robust ideas. <br /><br />Dynamically innovate resource-leveling customer
              service for state of the art customer service.
            </TabPane>
          </Tabs>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <card>
          <template slot="header">
            <h5 class="card-category">Collapse Example</h5>
            <h3 class="card-title">Collapsible Accordion</h3>
          </template>

          <Collapse :multiple-active="false" :active-index="0">
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

            <CollapseItem title="Collapsible Group Item #3">
              <div>
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf
                moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
                shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
                proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim
                aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
              </div>
            </CollapseItem>
          </Collapse>
        </card>
      </div>

      <div class="col-md-6">
        <card>
          <template slot="header">
            <h5 class="card-category">Navigation Pills</h5>
            <h3 class="card-title">Vertical Tabs With Icons</h3>
          </template>
          <Tabs
            type="primary"
            tab-nav-wrapper-classes="col-lg-3 col-md-6"
            tab-content-classes="col-md-8"
            vertical
            square
            class="row"
          >
            <TabPane>
              <span slot="label"> <i class="tim-icons icon-istanbul"></i>Home </span>
              Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C
              users after installed base benefits. <br /><br />
              Dramatically visualize customer directed convergence without revolutionary ROI.
            </TabPane>

            <TabPane>
              <span slot="label"> <i class="tim-icons icon-settings"></i>Settings </span>
              Efficiently unleash cross-media information without cross-media value. Quickly maximize timely
              deliverables for real-time schemas.
              <br /><br />Dramatically maintain clicks-and-mortar solutions without functional solutions.
            </TabPane>
          </Tabs>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8 ml-auto mr-auto">
        <card class="card-subcategories card-plain">
          <template slot="header">
            <h4 class="card-title text-center mt-5">Page Subcategories</h4>
            <br />
          </template>

          <Tabs type="primary" tab-content-classes="tab-subcategories" square centered class="row">
            <TabPane>
              <span slot="label"> <i class="tim-icons icon-istanbul"></i>Home </span>
              Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C
              users after installed base benefits. <br /><br />
              Dramatically visualize customer directed convergence without revolutionary ROI.
            </TabPane>

            <TabPane>
              <span slot="label"> <i class="tim-icons icon-bag-16"></i>Messages </span>
              Efficiently unleash cross-media information without cross-media value. Quickly maximize timely
              deliverables for real-time schemas.
              <br /><br />Dramatically maintain clicks-and-mortar solutions without functional solutions.
            </TabPane>

            <TabPane>
              <span slot="label"> <i class="tim-icons icon-settings"></i>Settings </span>
              Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate
              one-to-one customer service with robust ideas. <br /><br />Dynamically innovate resource-leveling customer
              service for state of the art customer service.
            </TabPane>
          </Tabs>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
  import { TabPane, Tabs, Collapse, CollapseItem } from '@/components';

  export default {
    name: 'Panels',
    components: {
      TabPane,
      Tabs,
      Collapse,
      CollapseItem,
    },
    data() {
      return {
        activeName: 'first',
      };
    },
  };
</script>
<style lang="scss"></style>

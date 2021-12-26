import TimeLine from '@/components/Timeline/TimeLine.vue';
import TimeLineItem from '@/components/Timeline/TimeLineItem.vue';

export default {
  title: 'Component/Timeline/TimeLine',
  component: TimeLine,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TimeLine, TimeLineItem },
  template: `
    <TimeLine v-bind="$props" > 
      <TimeLineItem inverted badge-type="danger" badge-icon="tim-icons icon-planet">
        <span slot="header" class="badge badge-pill badge-danger">Some title</span>
        <p slot="content">
          Wifey made the best Father's Day meal ever. So thankful so happy so blessed. Thank you for making my
          family We just had fun with the “future” theme !!! It was a fun night all together ... The always rude
          Kanye Show at 2am Sold Out Famous viewing @ Figueroa and 12th in downtown.
        </p>
    
        <h6 slot="footer"> <i class="ti-time"></i> 11 hours ago via Twitter </h6>
      </TimeLineItem>
    
      <TimeLineItem inverted badge-type="success" badge-icon="tim-icons icon-user-run">
        <span slot="header" class="badge badge-pill badge-success">Another Title</span>
        <p slot="content">
          Thank God for the support of my wife and real friends. I also wanted to point out that it’s the first
          album to go number 1 off of streaming!!! I love you Ellen and also my number one design rule of anything I
          do from shoes to music to homes is that Kim has to like it....
        </p>
      </TimeLineItem>
    
      <TimeLineItem inverted badge-type="info" badge-icon="tim-icons icon-notes">
        <span slot="header" class="badge badge-pill badge-info">Another Title</span>
    
        <template slot="content">
          <p>
            Called I Miss the Old Kanye That’s all it was Kanye And I love you like Kanye loves Kanye Famous viewing
            @ Figueroa and 12th in downtown LA 11:10PM
          </p>
          <p>
            What if Kanye made a song about Kanye Royère doesn't make a Polar bear bed but the Polar bear couch is
            my favorite piece of furniture we own It wasn’t any Kanyes Set on his goals Kanye
          </p>
        </template>
      </TimeLineItem>
    
      <TimeLineItem inverted badge-type="warning" badge-icon="tim-icons icon-gift-2">
        <span slot="header" class="badge badge-pill badge-warning">Another Title</span>
        <p slot="content">
          Tune into Big Boy's 92.3 I'm about to play the first single from Cruel Winter Tune into Big Boy's 92.3 I'm
          about to play the first single from Cruel Winter also to Kim’s hair and makeup Lorraine jewelry and the
          whole style squad at Balmain and the Yeezy team. Thank you Anna for the invite thank you to the whole
          Vogue team
        </p>
      </TimeLineItem>
      <TimeLineItem inverted badge-type="warning" badge-icon="tim-icons icon-gift-2">
        <span slot="header" class="badge badge-pill badge-warning">Another Title</span>
        <p slot="content">
          Tune into Big Boy's 92.3 I'm about to play the first single from Cruel Winter Tune into Big Boy's 92.3 I'm
          about to play the first single from Cruel Winter also to Kim’s hair and makeup Lorraine jewelry and the
          whole style squad at Balmain and the Yeezy team. Thank you Anna for the invite thank you to the whole
          Vogue team
        </p>
      </TimeLineItem>
    </TimeLine>`,
});

export const 기본 = Template.bind({});
기본.args = {};

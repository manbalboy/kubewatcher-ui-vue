import Modal from '../../components/Modal.vue';

export default {
  title: 'Component/Base/Modal',
  component: Modal,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Modal },
  template: `    
            <div>
              <modal :show.sync="modalShow"  :appendToBody="false" :centered="true" :scrollToBottom="false">
                <h4 slot="header" class="title title-up">Modal title</h4>
                <p>
                  Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the
                  blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language
                  ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It
                  is a paradisematic country, in which roasted parts of sentences fly into your mouth.
                </p>
                <template slot="footer">
                  <button @click="modalShow = false">닫기</button>
                </template>
              </modal>

              <button @click="modalShow = true">open</button>
            </div>
            `,

  data() {
    return {
      modalShow: true,
    };
  },
});

export const 기본_모달 = Template.bind({});

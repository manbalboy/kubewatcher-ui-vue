<template>
  <SlideYUpTransition :duration="animationDuration">
    <div
      v-show="show"
      ref="modal"
      class="modal fade"
      :class="[{ 'show d-block': show }, { 'd-none': !show }, { 'modal-mini': type === 'mini' }]"
      tabindex="-1"
      role="dialog"
      :aria-hidden="!show"
      @click.self="closeModal"
    >
      <div
        class="modal-dialog"
        role="document"
        :class="[{ 'modal-notice': type === 'notice' }, { 'modal-dialog-centered': centered }, modalClasses]"
      >
        <div class="modal-content" :class="[gradient ? `bg-gradient-${gradient}` : '', modalContentClasses]">
          <div v-if="$slots.header" class="modal-header" :class="[headerClasses]">
            <slot name="header"></slot>
            <slot name="close-button">
              <button
                v-if="showClose"
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="closeModal"
              >
                <i class="tim-icons icon-simple-remove"></i>
              </button>
            </slot>
          </div>

          <div v-if="$slots.default" class="modal-body" :class="bodyClasses">
            <slot></slot>
          </div>

          <div v-if="$slots.footer" class="modal-footer p-3" :class="footerClasses">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </SlideYUpTransition>
</template>
<script>
  import { SlideYUpTransition } from 'vue2-transitions';

  export default {
    name: 'Modal',
    components: {
      SlideYUpTransition,
    },
    props: {
      /**
       * Modal show hide 플래그
       */
      show: {
        type: Boolean,
        required: true,
      },

      /**
       * slot header 가 있을경우에만 동작가능
       * 모달의 X 버튼 visible 여부
       */
      showClose: {
        type: Boolean,
        default: true,
      },

      /**
       * modal-dialog-centered class 여부
       */
      centered: {
        type: Boolean,
        default: false,
      },
      /**
       * document body 에 append 여부
       */
      appendToBody: {
        type: Boolean,
        default: true,
        description: 'Whether modal should be appended to document body',
      },
      /**
       * 모달이 자동으로 맨 아래로 스크롤되어야 하는지 여부
       */
      scrollToBottom: {
        type: Boolean,
        default: true,
        description: "Whether modal should scroll to it's bottom automatically",
      },

      /**
       * 모달 타입 (notice|mini|"")
       */
      type: {
        type: String,
        default: '',
        validator(value) {
          const acceptedValues = ['', 'notice', 'mini'];
          return acceptedValues.includes(value);
        },
        description: 'Modal type (notice|mini|"") ',
      },

      /**
       * 모달 클래스
       */
      modalClasses: {
        type: [Object, String],
        default: '',
        description: 'Modal dialog css classes',
      },

      /**
       * 모달 컨텐츠 클래스
       */
      modalContentClasses: {
        type: [Object, String],
        default: '',
        description: 'Modal dialog content css classes',
      },

      /**
       * 모달 그라디언트 유형
       */
      gradient: {
        type: String,
        default: '',
        description: 'Modal gradient type (danger, primary etc)',
      },

      /**
       * 모달 해더 클래스
       */
      headerClasses: {
        type: [Object, String],
        default: '',
        description: 'Modal Header css classes',
      },

      /**
       * default slot 존재 해야 의미있음
       * 모달 바디 클래스
       */
      bodyClasses: {
        type: [Object, String],
        default: '',
        description: 'Modal Body css classes',
      },

      /**
       * # footer slot 존재 해야 의미있음
       * 모달 푸터 클래스
       */
      footerClasses: {
        type: [Object, String],
        default: '',
        description: 'Modal Footer css classes',
      },

      /**
       * 모달 닫힘 시간 (ms 초)
       */
      animationDuration: {
        type: Number,
        default: 500,
        description: 'Modal transition duration',
      },
    },

    watch: {
      show(val) {
        const documentClasses = document.body.classList;
        if (val) {
          documentClasses.add('modal-open');
          this.$nextTick(this.scrollModalToBottom);
        } else {
          documentClasses.remove('modal-open');
        }
      },
    },

    mounted() {
      if (this.appendToBody) {
        document.body.appendChild(this.$el);
      }
    },

    destroyed() {
      if (this.appendToBody && this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    },

    methods: {
      closeModal() {
        this.$emit('update:show', false);
        this.$emit('close');
      },

      scrollModalToBottom() {
        if (!this.scrollToBottom) return false;
        const elm = this.$refs.modal;
        elm.scrollTop = elm.scrollHeight - elm.clientHeight;
      },
    },
  };
</script>
<style>
  .modal.show {
    background-color: rgba(0, 0, 0, 0.3);
  }
</style>

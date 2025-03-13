import template from './TableLink.html';

export default Vue.defineComponent({
  name: 'TableLink',
  template,
  props: {
    table: {
      type: String,
      required: true
    },
    setGuess: {
      type: Function,
      required: true
    }
  }
});

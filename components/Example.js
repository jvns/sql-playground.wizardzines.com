import template from "./Example.html";

export default Vue.defineComponent({
  name: "Example",
  template,
  props: {
    query: {
      type: String,
      required: true
    },
    setGuess: {
      type: Function,
      required: true
    }
  }
});

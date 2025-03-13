import template from "./Table.html";

export default Vue.defineComponent({
  name: "Table",
  template,
  props: {
    query: {
      type: Object,
      required: true
    },
    wide: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "Query results"
    }
  }
});

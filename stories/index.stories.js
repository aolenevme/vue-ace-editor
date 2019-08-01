import { storiesOf } from "@storybook/vue";

import AceEditor from "../src/AceEditor";

storiesOf("AceEditor", module).add("default", () => ({
  components: { AceEditor },
  data() {
    return {
      options: {
        fontSize: "1rem",
        autoScrollEditorIntoView: true
      },
      value: "function () {return true;}"
    };
  },
  template: `<ace-editor v-model="value" mode="markdown" theme="twilight" :options="options"/>`
}));

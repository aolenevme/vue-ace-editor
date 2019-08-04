import { storiesOf } from "@storybook/vue";

import VueAceEditor from "../src/VueAceEditor.vue";

storiesOf("VueAceEditor", module)
  .add("javascript editor", () => ({
    components: { VueAceEditor },
    data() {
      return {
        options: {
          fontSize: "1rem"
        },
        value: `
        function simpleJavascriptMethod() {
          return 😁;
        }
      `
      };
    },
    template: `<vue-ace-editor v-model="value" mode="javascript" theme="twilight" :options="options"/>`
  }))
  .add("markdown editor", () => ({
    components: { VueAceEditor },
    data() {
      return {
        options: {
          fontSize: "1rem"
        },
        value: `
        #### This is markdown 🤣
      `
      };
    },
    template: `<vue-ace-editor v-model="value" mode="markdown" theme="xcode" :options="options"/>`
  }));

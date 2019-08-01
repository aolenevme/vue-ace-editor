import { storiesOf } from "@storybook/vue";

import AceEditor from "../src/AceEditor";

storiesOf("AceEditor", module).add("default", () => ({
  components: { AceEditor },
  template: "<ace-editor />"
}));

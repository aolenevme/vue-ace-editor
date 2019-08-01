import Vue from "vue";
import AceEditor from "./AceEditor.vue";

Vue.config.productionTip = false;

new Vue({
  render: h => h(AceEditor)
}).$mount("#ace-editor");

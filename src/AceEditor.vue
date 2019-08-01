<template>
  <div id="ace-editor">
    function foo(items) { var x = "All this is syntax highlighted"; return x; }
  </div>
</template>

<script>
import ace from "ace-builds/src-noconflict/ace.js";
export default {
  name: "AceEditor",
  mounted() {
    // let aceEditorScript = document.createElement("script");
    // // Set the source of the script
    // aceEditorScript.setAttribute("src", "ace-builds/src-noconflict/ace.js");
    //
    // // Set the type of the script
    // aceEditorScript.setAttribute("type", "text/javascript");
    //
    // // Set the charset of the script
    // aceEditorScript.setAttribute("charset", "utf-8");
    //
    // document.head.appendChild(aceEditorScript);
  },
  beforeCreate() {
    var editor = ace.edit("ace-editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/javascript");
  }
};
</script>
<style scoped lang="scss">
#ace-editor {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>

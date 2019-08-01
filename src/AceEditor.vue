<template>
  <div id="ace-editor">
    function foo(items) { var x = "All this is syntax highlighteddd"; return x;
    }
  </div>
</template>

<script>
import ace from "ace-builds/src-noconflict/ace.js";
export default {
  name: "AceEditor",
  mounted() {
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

  width: 100%;
  height: 100%;
}
</style>

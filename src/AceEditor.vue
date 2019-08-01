<template>
  <pre
    id="ace-editor"
    :style="{
      width,
      height,
      lineHeight
    }"
  ></pre>
</template>

<script>
import AceEditor from "brace";
import "brace/mode/javascript";
import "brace/theme/monokai";

export default {
  name: "AceEditor",
  props: {
    fontSize: {
      type: String,
      default: "14px"
    },
    height: {
      type: String,
      default: "100%"
    },
    highlightActiveLine: {
      type: Boolean,
      default: true
    },
    lineHeight: {
      type: String,
      default: "28px"
    },
    lineNumber: {
      type: Boolean,
      default: true
    },
    mode: {
      type: String,
      default: undefined
    },
    theme: {
      type: String,
      default: undefined
    },
    value: {
      type: String,
      default: ""
    },
    width: {
      type: String,
      default: "100%"
    }
  },
  data() {
    return {
      editor: null
    };
  },
  watch: {
    fontSize() {
      this.setFontSize();
    },
    highlightActiveLine() {
      this.setHighlightActiveLine();
    },
    lineNumber() {
      this.setLineNumber();
    },
    mode() {
      this.setMode();
    },
    theme() {
      this.setTheme();
    },
    value(val) {
      if (val === this.editor.getValue()) return;
      this.setValue();
    }
  },
  mounted() {
    this.editor = AceEditor.edit(this.$el);
    this.editor.setShowPrintMargin(false);
    this.setValue();
    this.setFontSize();
    this.setLineNumber();
    this.setHighlightActiveLine();
    this.listening();
    this.setMode();
    this.setTheme();
    this.$on("init", this.editor);
  },
  methods: {
    setFontSize() {
      this.editor.setFontSize(this.fontSize);
    },
    setHighlightActiveLine() {
      this.editor.setHighlightActiveLine(this.highlightActiveLine);
    },
    setLineNumber() {
      this.editor.renderer.setShowGutter(this.lineNumber);
    },
    setMode() {
      if (!this.mode) return false;
      this.editor.session.setMode("ace/mode/" + this.mode);
    },
    setTheme() {
      if (!this.theme) return false;
      this.editor.setTheme("ace/theme/" + this.theme);
    },
    setValue() {
      this.editor.setValue(this.value || "", true);
    },
    listening() {
      this.editor.on("change", () => {
        console.log("Change");
        this.$emit("input", this.editor.getValue());
      });
      this.editor.on("blur", () => {
        console.log("Blur");
        this.$emit("blur", this.editor);
      });
      this.editor.on("focus", () => {
        console.log("Focus");
        this.$emit("focus", this.editor);
      });
    }
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

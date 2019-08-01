<template>
  <pre
    id="ace-editor"
    :style="{
      width,
      height
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
    height: {
      type: String,
      default: "100%"
    },
    mode: {
      type: String,
      default: undefined
    },
    options: {
      type: Object,
      default: () => ({})
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
    // Configure editor
    this.editor = AceEditor.edit(this.$el);
    this.setMode();
    this.setTheme();
    this.setValue();

    // Register events
    this.registerEvents();
    this.$on("init", this.editor);
  },
  methods: {
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
    registerEvents() {
      this.editor.on("change", () => {
        this.$emit("input", this.editor.getValue());
      });
      this.editor.on("blur", () => {
        this.$emit("blur", this.editor);
      });
      this.editor.on("focus", () => {
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

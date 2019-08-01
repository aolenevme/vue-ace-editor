<template>
  <pre id="ace-editor" :style="inlineStyle" />
</template>

<script>
import AceEditor from "brace";

export default {
  name: "AceEditor",
  props: {
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "100%"
    },

    mode: {
      type: String,
      default: undefined
    },
    // The whole list of AceEditor`s options: https://github.com/ajaxorg/ace/wiki/Configuring-Ace
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
    }
  },
  data() {
    return {
      editor: null
    };
  },
  computed: {
    inlineStyle() {
      const { width, height } = this;
      return {
        width,
        height
      };
    }
  },
  watch: {
    value(val) {
      if (val === this.editor.getValue()) {
        return;
      }

      this.setValue();
    }
  },
  async mounted() {
    // Load assets
    await this.loadMode();
    await this.loadTheme();

    // Configure editor
    this.editor = AceEditor.edit(this.$el);
    this.setMode();
    this.setOptions();
    this.setTheme();
    this.setValue();

    // Register events
    this.registerEvents();
    this.$on("init", this.editor);
  },
  methods: {
    /**
     * Loads mode asynchronously
     * @returns {Promise<*>}
     */
    async loadMode() {
      const module = await import(`brace/mode/${this.mode}`);
      return module.default;
    },

    /**
     * Loads theme asynchronously
     * @returns {Promise<*>}
     */
    async loadTheme() {
      const module = await import(`brace/theme/${this.theme}`);
      return module.default;
    },

    // This method registers all editor`s events
    registerEvents() {
      // Blur event
      this.editor.on("blur", () => {
        this.$emit("blur", this.editor);
      });

      // Change event
      this.editor.on("change", () => {
        this.$emit("input", this.editor.getValue());
      });

      // Focus event
      this.editor.on("focus", () => {
        this.$emit("focus", this.editor);
      });
    },

    // Set editor`s mode
    setMode() {
      if (!this.mode) return false;
      this.editor.session.setMode(`ace/mode/${this.mode}`);
    },

    // Set editor`s options
    setOptions() {
      this.editor.setOptions(this.options);
    },

    // Set editor`s theme
    setTheme() {
      if (!this.theme) return false;
      this.editor.setTheme(`ace/theme/${this.theme}`);
    },

    // Set editor`s value
    setValue() {
      this.editor.setValue(this.value || "", true);
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
}
</style>

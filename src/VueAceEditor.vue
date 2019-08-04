<template>
  <pre id="vue-ace-editor" :style="inlineStyle" />
</template>

<script>
/**
 * This is a vue-component for editing different types of programming/markdown languages in the browser.
 * Underneath it uses AceEditor: https://github.com/ajaxorg/ace
 * For easier usage, the special brace module https://github.com/thlorenz/brace is used.
 * Props` hints:
 *    List of options: https://github.com/ajaxorg/ace/wiki/Configuring-Ace
 *    List of modes: https://github.com/thlorenz/brace/tree/master/mode
 *    List of themes: https://github.com/thlorenz/brace/tree/master/theme
 */
import AceEditor from "brace";

import EditorModuleEnum from "./EditorModuleEnum.js";

export default {
  name: "VueAceEditor",
  props: {
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "100%"
    },

    // Allow searching in the editor
    allowSearch: {
      type: Boolean,
      default: false
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
    // Load modules dynamically
    try {
      if (this.mode) {
        await this.loadModule(EditorModuleEnum.MODE, this.mode);
      }

      if (this.theme) {
        await this.loadModule(EditorModuleEnum.THEME, this.theme);
      }

      if (this.allowSearch) {
        await this.loadModule(EditorModuleEnum.EXT, "searchbox");
      }
    } catch (error) {
      console.error(error);
    }

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
     * Loads module asynchronously
     * TODO: Write the method this way because of this issue of webpack: https://github.com/webpack/webpack/issues/6680
     * @props {EditorModuleEnum} moduleType - Whether the module is theme or mode
     * @props {String} moduleName - Name of the module
     * @returns {Promise<*>}
     */
    async loadModule(moduleType, moduleName) {
      let loadedModule = {};

      switch (moduleType) {
        case EditorModuleEnum.THEME:
          loadedModule = await import("brace/theme/" + moduleName);
          break;
        case EditorModuleEnum.MODE:
          loadedModule = await import("brace/mode/" + moduleName);
          break;
        case EditorModuleEnum.EXT:
          loadedModule = await import("brace/ext/" + moduleName);
          break;
        default:
          return;
      }

      return loadedModule.default;
    },

    // This method registers all editor`s events1
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
#vue-ace-editor {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>

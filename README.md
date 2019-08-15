# vue-ace-editor
> This is a VueJS import of the [AceEditor](https://ace.c9.io/)

### How it is done
 * This is a VueJS component for editing of different types of programming languages in the browser;
 * Underneath it uses [AceEditor](https://ace.c9.io/);
 * For the import [the brace library](https://github.com/thlorenz/brace) is used.

### How to use
 * Import the assets in your `index.js` to get it.
~~~~
import 'vue-ace-editor';
import 'vue-ace-editor/dist/vue-ace-editor.css';
~~~~
 * You can use the component this way: 
 ~~~~
<vue-ace-editor v-model="value" mode="javascript" theme="twilight" :options="options"/>
~~~~

### Props
| Name         | Type    | Default   | Explanation                                                          |
|--------------|---------|-----------|----------------------------------------------------------------------|
| width        | String  | "100%"    | Like in CSS                                                          |
| height       | String  | "100%"    | Like in CSS                                                          |
| allow-search | Boolean | false     | Shows search box in the editor                                       |
| mode         | String  | undefined | List of modes: https://github.com/thlorenz/brace/tree/master/mode    |
| theme        | String  | undefined | List of themes: https://github.com/thlorenz/brace/tree/master/theme  |
| options      | Object  | {}        | List of options: https://github.com/ajaxorg/ace/wiki/Configuring-Ace |
| value        | String  | ""        | The text in the editor                                               |

### Feedback
You can write me on:
Telegram: @aolenev
Email: ao.aftr@gmail.com

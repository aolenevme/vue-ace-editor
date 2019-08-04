import { mount } from "@vue/test-utils";
import VueAceEditor from "../../src/VueAceEditor";

import workerHack from "./workerHack";

beforeEach(function() {
  workerHack();
});

describe("VueAceEditor", () => {
  it("is rendered with default props", () => {
    const wrapper = mount(VueAceEditor);

    expect(wrapper.contains("#vue-ace-editor")).toBe(true);
  });

  it("has the right default props", () => {
    const wrapper = mount(VueAceEditor);

    expect(wrapper.props().width).toBe("100%");
    expect(wrapper.props().height).toBe("100%");
    expect(wrapper.props().allowSearch).toBe(false);
    expect(wrapper.props().mode).toBe(undefined);
    expect(wrapper.props().options).toEqual({});
    expect(wrapper.props().theme).toBe(undefined);
    expect(wrapper.props().value).toBe("");
  });

  it("sets inline styles correctly", () => {
    const wrapper = mount(VueAceEditor);

    const testDimension = "100px";

    wrapper.setProps({ width: testDimension, height: testDimension });

    expect(wrapper.element.style.width).toBe(testDimension);
    expect(wrapper.element.style.height).toBe(testDimension);
  });

  it("passes into mode prop", () => {
    const wrapper = mount(VueAceEditor);

    const testMode = "javascript";
    wrapper.setProps({ mode: testMode });

    expect(wrapper.props().mode).toBe(testMode);
  });

  it("passes into theme prop", () => {
    const wrapper = mount(VueAceEditor);

    const testTheme = "twilight";
    wrapper.setProps({ theme: testTheme });

    expect(wrapper.props().theme).toBe(testTheme);
  });

  it("passes into options prop", () => {
    const wrapper = mount(VueAceEditor);

    const testOptions = {
      fontSize: "1rem"
    };

    wrapper.setProps({ options: testOptions });

    expect(wrapper.props().options).toBe(testOptions);
  });

  it("passes into value", () => {
    const wrapper = mount(VueAceEditor);

    const testValue = "Test value";
    wrapper.setProps({ value: testValue });

    expect(wrapper.props().value).toBe(testValue);
  });

  // TODO: Have to significantly improve tests but have problems with component rendering
});

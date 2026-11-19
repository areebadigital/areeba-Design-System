import React from 'react';
import { Checkbox } from '../components/Checkbox/Checkbox.js';
import { Switch } from '../components/Switch/Switch.js';
const h = React.createElement;

/* Shared on/off state for Checkbox and Switch: controlled (`checked`) or uncontrolled (`defaultChecked`). */
function useToggle(p) {
  var st = React.useState(!!p.defaultChecked), on = p.checked !== undefined ? !!p.checked : st[0];
  function toggle() { if (p.disabled) return; var next = p.indeterminate ? true : !on; st[1](next); if (p.onChange) p.onChange(next); }
  return [on, toggle];
}
var TOGGLE_KEYS = ["label", "hint", "className", "id", "checked", "defaultChecked", "onChange", "indeterminate", "name", "value", "required", "disabled"];
function formValue(p, on) { return p.name && on ? h("input", { type: "hidden", name: p.name, value: p.value !== undefined ? p.value : "on" }) : null; }

export { useToggle, TOGGLE_KEYS, formValue };

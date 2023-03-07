export type CheckboxStateChange = CheckboxStateChangeChecked | CheckboxStateChangeDisabled;

export interface CheckboxStateChangeDisabled {
  type: 'disabled';
  disabled: boolean;
}

export interface CheckboxStateChangeChecked {
  type: 'checked';
  checked: boolean;
}

export interface InterfaceSbbCheckboxAttributes {
  size: 'm' | 's';
  iconPlacement?: 'start' | 'end';
}

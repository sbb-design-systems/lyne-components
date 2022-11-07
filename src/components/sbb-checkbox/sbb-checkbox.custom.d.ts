export interface InterfaceSbbCheckbox extends HTMLElement {
  checked: boolean;
  disabled: boolean;
  name: string;
  required: boolean;
}

export interface InterfaceCheckboxAttributes {
  size: 'm' | 's';
  iconPlacement?: 'start' | 'end';
}

export interface SbbCheckboxChange {
  checked: boolean;
  value: string;
}

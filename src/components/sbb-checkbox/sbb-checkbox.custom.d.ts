export interface InterfaceSbbCheckbox extends HTMLElement {
  checked: boolean;
  disabled: boolean;
  required: boolean;
}

export interface InterfaceCheckboxAttributes {
  size: 'm' | 's';
  iconPlacement?: 'start' | 'end';
}

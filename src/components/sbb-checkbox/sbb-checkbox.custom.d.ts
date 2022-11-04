export interface InterfaceCheckboxAttributes extends HTMLElement {
  checked: boolean;
  disabled: boolean;
  iconPlacement?: 'start' | 'end';
  name: string;
  required: boolean;
}

export interface SbbCheckboxChange {
  checked: boolean;
  value: string;
}

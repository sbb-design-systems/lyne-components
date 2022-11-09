export interface InterfaceSbbRadioButton extends HTMLElement {
  name: string;
  checked: boolean;
  disabled: boolean;
  required: boolean;
  value: any;
  labelSize?: 'm' | 's';
}

export interface SbbRadioButtonChangeEventDetail {
  checked: boolean;
  value: any;
}

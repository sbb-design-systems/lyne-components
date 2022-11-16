export interface InterfaceSbbRadioButton {
  checked: boolean;
  disabled: boolean;
  required: boolean;
  allowEmptySelection?: boolean;
  value: any;
  size?: 'm' | 's';
  select?(allowEmptySelection?: boolean): void;
}

export interface SbbRadioButtonChangeEventDetail {
  checked: boolean;
  value: any;
}

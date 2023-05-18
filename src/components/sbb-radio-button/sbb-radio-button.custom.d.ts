export type RadioButtonStateChange = RadioButtonStateChangeChecked | RadioButtonStateChangeDisabled;

export interface RadioButtonStateChangeDisabled {
  type: 'disabled';
  disabled: boolean;
}

export interface RadioButtonStateChangeChecked {
  type: 'checked';
  checked: boolean;
}

export interface InterfaceSbbRadioButtonAttributes {
  size: 'm' | 's';
}

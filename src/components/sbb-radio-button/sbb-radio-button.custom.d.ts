export type StateChange = StateChangeChecked | StateChangeValue;

export interface StateChangeChecked {
  type: 'checked';
  checked: boolean;
}

export interface InterfaceSbbRadioButtonAttributes {
  size: 'm' | 's';
}

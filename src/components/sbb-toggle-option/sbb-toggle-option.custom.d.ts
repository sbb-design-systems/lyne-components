export type StateChange = StateChangeChecked | StateChangeValue;

export interface StateChangeValue {
  type: 'value';
  value: string;
}

export interface StateChangeChecked {
  type: 'checked';
  checked: boolean;
}

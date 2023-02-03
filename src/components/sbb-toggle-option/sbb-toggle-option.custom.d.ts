export type StateChange = StateChangeChecked | StateChangeValue;

interface StateChangeValue {
  type: 'value';
  value: string;
}

interface StateChangeChecked {
  type: 'checked';
  checked: boolean;
}

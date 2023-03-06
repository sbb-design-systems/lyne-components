export type ToggleOptionStateChange = ToggleOptionStateChangeChecked | ToggleOptionStateChangeValue;

export interface ToggleOptionStateChangeValue {
  type: 'value';
  value: string;
}

export interface ToggleOptionStateChangeChecked {
  type: 'checked';
  checked: boolean;
}

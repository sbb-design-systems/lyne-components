export type TagStateChange = TagStateChangeChecked | TagStateChangeValue;

export interface TagStateChangeValue {
  type: 'value';
  value: string;
}

export interface TagStateChangeChecked {
  type: 'checked';
  checked: boolean;
}

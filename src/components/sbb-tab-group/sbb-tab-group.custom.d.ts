export interface InterfaceSbbTabGroupActions {
  activate(): void;
  deactivate(): void;
  enable(): void;
  disable(): void;
  select(): void;
}
export interface InterfaceSbbTabGroupTab extends HTMLElement {
  active?: boolean;
  disabled?: boolean;
  relatedContent?: HTMLElement;
  index?: number;
  tabGroupActions?: InterfaceSbbTabGroupActions;
  size: 'l' | 'xl';
}

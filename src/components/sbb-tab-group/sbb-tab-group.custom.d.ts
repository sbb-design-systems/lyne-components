import { HTMLStencilElement } from '@stencil/core/internal';

export interface InterfaceSbbTabGroupActions {
  activate(): void;
  deactivate(): void;
  enable(): void;
  disable(): void;
  select(): void;
}
export interface InterfaceSbbTabGroupTab extends HTMLStencilElement {
  active?: boolean;
  disabled?: boolean;
  relatedContent?: Element;
  index?: number;
  tabGroupActions?: InterfaceSbbTabGroupActions;
}

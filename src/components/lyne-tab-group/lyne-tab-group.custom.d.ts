import { HTMLStencilElement } from '@stencil/core/internal';

export interface InterfaceLyneTabGroupActions {
  activate(): void;
  deactivate(): void;
  enable(): void;
  disable(): void;
  select(): void;
}
export interface InterfaceLyneTabGroupTab extends HTMLStencilElement {
  active?: boolean;
  disabled?: boolean;
  relatedContent?: Element;
  index?: number;
  tabGroupActions?: InterfaceLyneTabGroupActions;
}

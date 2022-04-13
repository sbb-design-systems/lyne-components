import { HTMLStencilElement } from '@stencil/core/internal';

export interface InterfaceLyneTabGroupAttributes extends HTMLStencilElement {
  active?: boolean;
}

export interface InterfaceLyneTabGroupLabel extends HTMLStencilElement {
  active?: boolean;
  tabGroupState?: { relatedContent?: Element; activate(): void };
}

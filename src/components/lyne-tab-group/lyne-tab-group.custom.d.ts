import { HTMLStencilElement } from '@stencil/core/internal';

export interface InterfaceLyneTabGroupAttributes extends HTMLStencilElement {
  active?: boolean;
}

export interface InterfaceLyneTabGroupLabel extends HTMLStencilElement {
  active?: boolean;
  disabled?: boolean;
  tabGroupState?: { relatedContent?: Element; index?: number; activate(): void; disable(): void; enable(): void };
}

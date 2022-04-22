import { HTMLStencilElement } from '@stencil/core/internal';

export interface InterfaceLyneTabGroupAttributes extends HTMLStencilElement {
  attribute?: any;
}

export interface InterfaceLyneTabGroupTab extends HTMLStencilElement {
  active?: boolean;
  disabled?: boolean;
  relatedContent?: Element;
  index?: number;
  tabGroupActions?: { activate(): void; deactivate(): void; toggle(): void; disable(): void; enable(): void };
}

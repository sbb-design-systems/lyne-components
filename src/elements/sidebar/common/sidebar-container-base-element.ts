import { type CSSResultGroup, LitElement } from 'lit';

import type { SbbSidebarMixinType } from '../common.js';

import style from './sidebar-container-common.scss?lit&inline';

export abstract class SbbSidebarContainerBaseElement<
  T extends SbbSidebarMixinType<SbbSidebarContainerBaseElement<T>>,
> extends LitElement {
  public static override styles: CSSResultGroup = style;

  protected abstract sidebarSelector: string;

  /** The sidebar children. */
  public get sidebars(): T[] {
    return Array.from(this.querySelectorAll<T>(`:scope > ${this.sidebarSelector}`));
  }

  /** The sidebar child with the `start` position. */
  public get start(): T | null {
    return this.querySelector<T>(`:scope > ${this.sidebarSelector}:not([position='end'])`);
  }

  /** The sidebar child with the `end` position. */
  public get end(): T | null {
    return this.querySelector<T>(`:scope > ${this.sidebarSelector}[position='end']`);
  }
}

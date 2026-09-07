import {
  type CSSResultGroup,
  html,
  nothing,
  type PropertyValues,
  svg,
  type TemplateResult,
  unsafeCSS,
} from 'lit';
import { property } from 'lit/decorators.js';

import { defaultDateAdapter, SbbElement } from '../../core.ts';
import type { SbbPearlChainNodeElement } from '../../pearl-chain.pure.ts';

import style from './pearl-chain.scss?inline';

/**
 * It displays a chain of `sbb-pearl-chain-node` elements connected by lines,
 * representing a journey with its stops.
 */
export class SbbPearlChainElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-pearl-chain';
  public static override styles: CSSResultGroup = unsafeCSS(style);

  /**
   * A configured date which acts as the current date instead of the real current date.
   * Only recommended for testing purposes.
   */
  @property()
  public set now(value: Date | string | null) {
    this._now = defaultDateAdapter.getValidDateOrNull(defaultDateAdapter.deserialize(value));
  }
  public get now(): Date | null {
    return this._now;
  }
  private _now: Date | null = null;

  private _nodes: SbbPearlChainNodeElement[] = [];

  /** Registers a `sbb-pearl-chain-node` with this pearl chain. */
  public addNode(node: SbbPearlChainNodeElement): void {
    if (this._nodes.includes(node)) {
      return;
    }
    this._nodes.push(node);
    // Keep nodes ordered by DOM position, regardless of registration order.
    this._nodes.sort((a, b) => a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);
    this.requestUpdate();
  }

  /**
   * Unregisters a `sbb-pearl-chain-node` from this pearl chain.
   * Without arguments, behaves like the native `Element.remove()`.
   */
  public removeNode(node: SbbPearlChainNodeElement): void {
    const index = this._nodes.indexOf(node);
    if (index === -1) {
      return;
    }
    this._nodes.splice(index, 1);
    this.requestUpdate();
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);
    this._positionLines();
  }

  private _positionLines(): void {
    const lines = this.shadowRoot?.querySelectorAll<SVGLineElement>('.sbb-pearl-chain__line');
    if (!lines?.length) {
      return;
    }
    const hostRect = this.getBoundingClientRect();
    const centers = this._nodes.map((node) => {
      const rect = node.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - hostRect.left,
        y: rect.top + rect.height / 2 - hostRect.top,
      };
    });
    lines.forEach((line, index) => {
      const start = centers[index];
      const end = centers[index + 1];
      line.setAttribute('x1', `${start.x}`);
      line.setAttribute('y1', `${start.y}`);
      line.setAttribute('x2', `${end.x}`);
      line.setAttribute('y2', `${end.y}`);
    });
  }

  protected override render(): TemplateResult {
    // ponytail: only a straight line per segment for now; state coloring,
    // horizontal mode and the current-time split/pulse are later increments.
    return html`
      <svg class="sbb-pearl-chain__svg" aria-hidden="true">
        ${
          this._nodes.length > 1
            ? Array.from(
                { length: this._nodes.length - 1 },
                () => svg`<line class="sbb-pearl-chain__line"></line>`,
              )
            : nothing
        }
      </svg>
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-pearl-chain': SbbPearlChainElement;
  }
}

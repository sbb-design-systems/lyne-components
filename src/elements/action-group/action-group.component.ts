import {
  type CSSResultGroup,
  html,
  type PropertyValues,
  type TemplateResult,
  unsafeCSS,
} from 'lit';
import { property } from 'lit/decorators.js';

import type { SbbButtonCommonElementMixinType, SbbButtonSize } from '../button.pure.ts';
import { SbbElement, boxSizingStyles } from '../core.ts';
import type {
  SbbBlockLinkButtonElement,
  SbbBlockLinkElement,
  SbbBlockLinkStaticElement,
  SbbLinkSize,
} from '../link.pure.ts';

import style from './action-group.scss?inline';

/**
 * It can be used as a container for one or more action element, like `sbb-button` or `sbb-block-link`.
 *
 * @slot - Use the unnamed slot to add `sbb-block-link` or `sbb-button` elements to the `sbb-action-group`.
 *
 * @cssprop [--sbb-action-group-justify-content=start] - To specify the horizontal spacing of the group.
 * @cssprop [--sbb-action-group-align-items=center] - To specify the vertical alignment of the group .
 * @cssprop [--sbb-action-group-orientation=row] - To specify the horizontal spacing of the group.
 *
 */
export class SbbActionGroupElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-action-group';
  public static override styles: CSSResultGroup = [boxSizingStyles, unsafeCSS(style)];

  /**
   * Size of the nested sbb-button instances.
   * This will overwrite the size attribute of nested sbb-button instances.
   */
  @property({ attribute: 'button-size', reflect: true })
  public accessor buttonSize: SbbButtonSize | null = null;

  /**
   * Size of the nested sbb-block-link instances.
   * This will overwrite the size attribute of nested sbb-block-link instances.
   */
  @property({ attribute: 'link-size', reflect: true })
  public accessor linkSize: SbbLinkSize | null = null;

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('buttonSize')) {
      this._syncButtons();
    }
    if (changedProperties.has('linkSize')) {
      this._syncLinks();
    }
  }

  private _syncButtons(): void {
    if (!this.buttonSize) {
      return;
    }
    this.querySelectorAll?.<SbbButtonCommonElementMixinType>(':state(sbb-button)').forEach(
      (b) => (b.size = this.buttonSize!),
    );
  }

  private _syncLinks(): void {
    if (!this.linkSize) {
      return;
    }
    this.querySelectorAll?.<
      SbbBlockLinkElement | SbbBlockLinkButtonElement | SbbBlockLinkStaticElement
    >('sbb-block-link, sbb-block-link-button, sbb-block-link-static').forEach((link) => {
      link.size = this.linkSize!;
    });
  }

  protected override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-action-group': SbbActionGroupElement;
  }
}

import {
  type CSSResultGroup,
  html,
  type PropertyValues,
  type TemplateResult,
  unsafeCSS,
} from 'lit';
import { property } from 'lit/decorators.js';

import type { SbbButtonCommonElementMixinType, SbbButtonElement } from '../button.pure.ts';
import type { SbbHorizontalFrom } from '../core.ts';
import { SbbElement } from '../core.ts';
import type {
  SbbBlockLinkButtonElement,
  SbbBlockLinkElement,
  SbbBlockLinkStaticElement,
} from '../link.pure.ts';

import style from './action-group.scss?inline';

/**
 * It can be used as a container for one or more action element, like `sbb-button` or `sbb-block-link`.
 *
 * @slot - Use the unnamed slot to add `sbb-block-link` or `sbb-button` elements to the `sbb-action-group`.
 */
export class SbbActionGroupElement extends SbbElement {
  public static override readonly elementName: string = 'sbb-action-group';
  public static override styles: CSSResultGroup = [unsafeCSS(style)];

  /**
   * Set the slotted `<sbb-action-group>` children's alignment.
   */
  @property({ attribute: 'align-group', reflect: true })
  public accessor alignGroup: 'start' | 'center' | 'stretch' | 'end' = 'start';

  /**
   * Overrides the behavior of `orientation` property.
   */
  // TODO: Needs a breaking change to work with the 'no-default-reflect' behavior
  @property({ attribute: 'horizontal-from', reflect: true })
  public accessor horizontalFrom: SbbHorizontalFrom = 'large';

  /**
   * Indicates the orientation of the components inside the `<sbb-action-group>`.
   */
  @property({ reflect: true })
  public accessor orientation: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * Size of the nested sbb-button instances.
   * This will overwrite the size attribute of nested sbb-button instances.
   * @deprecated Will be removed with next breaking change
   */
  @property({ attribute: 'button-size', reflect: true })
  public accessor buttonSize: SbbButtonElement['size'] = null;

  /**
   * Size of the nested sbb-block-link instances.
   * This will overwrite the size attribute of nested sbb-block-link instances.
   * @deprecated Will be removed with next breaking change
   */
  @property({ attribute: 'link-size', reflect: true })
  public accessor linkSize: SbbBlockLinkElement['size'] = null;

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

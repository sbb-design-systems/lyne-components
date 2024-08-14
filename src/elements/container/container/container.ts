import {
  type CSSResultGroup,
  html,
  LitElement,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { slotState } from '../../core/decorators.js';
import { SbbHydrationMixin } from '../../core/mixins.js';
import type { SbbImageElement } from '../../image.js';

import style from './container.scss?lit&inline';

/**
 * It displays its content with the default page spacing.
 *
 * @slot - Use the unnamed slot to add anything to the container.
 * @slot sticky-bar - The slot used by the sbb-sticky-bar component.
 * @slot image - The slot used to slot an `sbb-image` to use as background.
 */
@customElement('sbb-container')
@slotState()
export class SbbContainerElement extends SbbHydrationMixin(LitElement) {
  public static override styles: CSSResultGroup = style;

  /** Whether the container is expanded. */
  @property({ type: Boolean, reflect: true }) public expanded = false;

  /** Whether the background color is shown on full container width on large screens. */
  @property({ type: Boolean, reflect: true, attribute: 'background-expanded' })
  public backgroundExpanded = false;

  /** Color of the container, like transparent, white etc. */
  @property({ reflect: true }) public color: 'transparent' | 'white' | 'milk' = 'white';

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('expanded')) {
      this.querySelector?.('sbb-sticky-bar')?.toggleAttribute('data-expanded', this.expanded);
    }
  }

  private _imageSlotChanged(): void {
    const image: SbbImageElement = this.querySelector('sbb-image[slot="image"]') as SbbImageElement;
    if (!image) {
      return;
    }

    image.borderRadius = 'none';
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-container">
        <slot name="image" @slotchange=${() => this._imageSlotChanged()}></slot>
        <slot></slot>
      </div>
      <slot name="sticky-bar"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-container': SbbContainerElement;
  }
}

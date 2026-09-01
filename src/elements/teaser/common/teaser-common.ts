import { type CSSResultGroup, html, type TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';

import type { SbbChipLabelElement } from '../../chip-label.pure.ts';
import { type AbstractConstructor, SbbActionBaseElement } from '../../core.ts';
import type { SbbTitleElement } from '../../title.pure.ts';

import style from './teaser-common.scss?inline';

export declare class SbbTeaserCommonElementMixinType extends SbbActionBaseElement {
  public accessor alignment: 'before' | 'before-centered' | 'after' | 'after-centered' | 'below';
  public accessor size: 'm' | 'l' | null;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbTeaserCommonElementMixin = <T extends AbstractConstructor<SbbActionBaseElement>>(
  superClass: T,
): AbstractConstructor<SbbTeaserCommonElementMixinType> & T => {
  abstract class SbbTeaserCommonElement
    extends superClass
    implements SbbTeaserCommonElementMixinType
  {
    public static styles: CSSResultGroup = [unsafeCSS(style)];

    /** Teaser variant - define the position and the alignment of the text block. */
    @property({ reflect: true })
    public accessor alignment: SbbTeaserCommonElementMixinType['alignment'] = 'after-centered';

    /** Size variant, either m (default) or l. */
    @property({ reflect: true })
    public accessor size: SbbTeaserCommonElementMixinType['size'] = null;

    private _handleSlotchange(): void {
      let foundChipLabel = false;
      let foundTitle = false;
      for (const child of this.children) {
        if (child.localName === 'sbb-chip-label' && !foundChipLabel) {
          child.slot ||= 'chip';
          if (child.slot === 'chip') {
            foundChipLabel = true;
          }
        } else if (child.localName === 'sbb-title' && !foundTitle) {
          child.slot ||= 'title';
          if (child.slot === 'title') {
            foundTitle = true;
          }
        } else if (
          /^sbb-(secondary-|accent-|transparent-)?button(-static|-link)?$/.test(child.localName)
        ) {
          if (!child.slot) {
            child.slot = 'action';
          }
        }
      }
    }

    private _configureChip(event: Event): void {
      // We need to check assigned elements because in the image slot it can have labels as well.
      const chipLabel = (event.target as HTMLSlotElement)
        .assignedElements()
        .find((e): e is SbbChipLabelElement => e.localName === 'sbb-chip-label');

      if (chipLabel) {
        customElements.upgrade(chipLabel);
        chipLabel.color = 'charcoal';
        chipLabel.size = 'xxs';
      }
    }

    private _configureTitle(event: Event): void {
      const title = (event.target as HTMLSlotElement)
        .assignedElements()
        .find((e): e is SbbTitleElement => e.localName === 'sbb-title');

      if (title) {
        customElements.upgrade(title);
        title.visualLevel = this.size === 'l' ? '2' : '5';
      }
    }

    protected override renderTemplate(): TemplateResult {
      return html`
        <span class="sbb-teaser__container">
          <span class="sbb-teaser__image-wrapper">
            <slot name="image"></slot>
          </span>
          <span class="sbb-teaser__content">
            <span class="sbb-teaser__text">
              <slot name="chip" @slotchange=${this._configureChip}></slot>
              <slot name="title" @slotchange=${this._configureTitle}></slot>
              <p class="sbb-teaser__description">
                <slot @slotchange=${this._handleSlotchange}></slot>
              </p>
            </span>
            <slot name="action"></slot>
          </span>
        </span>
      `;
    }
  }
  return SbbTeaserCommonElement as AbstractConstructor<SbbTeaserCommonElementMixinType> & T;
};

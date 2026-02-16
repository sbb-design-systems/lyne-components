import {
  type CSSResultGroup,
  LitElement,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import { SbbLanguageController } from '../../core/controllers.ts';
import { forceType, omitEmptyConverter } from '../../core/decorators.ts';
import { i18nTrain, i18nWagonsLabel } from '../../core/i18n.ts';
import { SbbNamedSlotListMixin, type WithListChildren } from '../../core/mixins.ts';
import { boxSizingStyles } from '../../core/styles.ts';
import type { SbbTitleLevel } from '../../title.ts';
import type { SbbTrainBlockedPassageElement } from '../train-blocked-passage.ts';
import type { SbbTrainWagonElement } from '../train-wagon.ts';

import style from './train.scss?lit&inline';

import '../../icon.ts';

/**
 * It can be used as a container for `sbb-train-wagon` or `sbb-train-blocked-passage` components.
 *
 * @slot - Use the unnamed slot to add 'sbb-train-wagon' elements to the `sbb-train`.
 */
export
@customElement('sbb-train')
class SbbTrainElement extends SbbNamedSlotListMixin<
  SbbTrainWagonElement | SbbTrainBlockedPassageElement,
  typeof LitElement
>(LitElement) {
  public static override styles: CSSResultGroup = [boxSizingStyles, style];
  public static readonly events = {
    trainslotchange: 'trainslotchange',
  } as const;
  protected override readonly listChildLocalNames = [
    'sbb-train-wagon',
    'sbb-train-blocked-passage',
  ];

  /** General label for "driving direction". */
  @forceType()
  @property({ attribute: 'direction-label', reflect: true, converter: omitEmptyConverter })
  public accessor directionLabel: string = '';

  /** Heading level of the direction label, used for screen readers. */
  @property({ attribute: 'direction-label-level' })
  public accessor directionLabelLevel: SbbTitleLevel = '6';

  /** Label for the destination station of the train. */
  @forceType()
  @property()
  public accessor station: string = '';

  /** Accessibility label for additional information regarding the leaving direction of the train. */
  @forceType()
  @property({ attribute: 'accessibility-label' })
  public accessor accessibilityLabel: string = '';

  /** Controls the direction indicator to show the arrow left or right. Default is left.  */
  @property({ reflect: true }) public accessor direction: 'left' | 'right' = 'left';

  private _language = new SbbLanguageController(this);

  /**
   * Create the aria-label text out of the direction label, station and the accessibility label.
   */
  private _getDirectionAriaLabel(): string {
    const textParts: string[] = [i18nTrain[this._language.current]];

    if (this.directionLabel && this.station) {
      textParts.push(`${this.directionLabel} ${this.station}`);
    }

    if (this.accessibilityLabel) {
      textParts.push(this.accessibilityLabel);
    }

    return `${textParts.join(', ')}.`;
  }

  protected override willUpdate(changedProperties: PropertyValues<WithListChildren<this>>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('listChildren')) {
      /** @internal */
      this.dispatchEvent(new Event('trainslotchange', { bubbles: true }));
    }
  }

  protected override render(): TemplateResult {
    const TITLE_TAG_NAME = `h${this.directionLabelLevel}`;

    /* eslint-disable lit/binding-positions */
    return html`
      <div class="sbb-train">
        <${unsafeStatic(TITLE_TAG_NAME)} class="sbb-train__direction-label-sr">
          ${this._getDirectionAriaLabel()}
        </${unsafeStatic(TITLE_TAG_NAME)}>
        ${
          this.directionLabel
            ? html`<div class="sbb-train__direction-heading" aria-hidden="true">
                <span class="sbb-train__direction-sticky-wrapper">
                  ${this.direction === 'left'
                    ? html`<sbb-icon name="chevron-small-left-small"></sbb-icon>`
                    : nothing}

                  <span class="sbb-train__direction-label">
                    ${this.directionLabel} ${this.station}
                  </span>

                  ${this.direction === 'right'
                    ? html`<sbb-icon name="chevron-small-right-small"></sbb-icon>`
                    : nothing}
                </span>
              </div>`
            : nothing
        }
        ${this.renderList({
          class: 'sbb-train__wagons',
          ariaLabel: i18nWagonsLabel[this._language.current],
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-train': SbbTrainElement;
  }
}

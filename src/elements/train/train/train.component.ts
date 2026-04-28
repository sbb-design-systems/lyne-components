import {
  type CSSResultGroup,
  nothing,
  type PropertyValues,
  type TemplateResult,
  unsafeCSS,
} from 'lit';
import { property } from 'lit/decorators.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import {
  boxSizingStyles,
  forceType,
  handleDistinctChange,
  i18nTrain,
  i18nWagonsLabel,
  omitEmptyConverter,
  SbbElement,
  type SbbElementType,
  SbbLanguageController,
  SbbNamedSlotListMixin,
  type WithListChildren,
} from '../../core.ts';
import { SbbIconElement } from '../../icon.pure.ts';
import type { SbbTitleLevel } from '../../title.pure.ts';
import type { SbbTrainBlockedPassageElement } from '../train-blocked-passage/train-blocked-passage.component.ts';
import { SbbTrainFormationOrientationMixin } from '../train-formation-orientation-mixin.ts';
import type { SbbTrainWagonMixinType } from '../train-wagon-common.ts';

import style from './train.scss?inline';

/**
 * It can be used as a container for `sbb-train-wagon` or `sbb-train-blocked-passage` components.
 *
 * @slot - Use the unnamed slot to add 'sbb-train-wagon' elements to the `sbb-train`.
 */
export class SbbTrainElement extends SbbTrainFormationOrientationMixin(
  SbbNamedSlotListMixin<SbbTrainWagonMixinType | SbbTrainBlockedPassageElement, typeof SbbElement>(
    SbbElement,
  ),
) {
  public static override readonly elementName: string = 'sbb-train';
  public static override elementDependencies: SbbElementType[] = [SbbIconElement];
  public static override styles: CSSResultGroup = [
    super.styles ?? [],
    boxSizingStyles,
    unsafeCSS(style),
  ];

  protected override readonly listChildLocalNames = [
    'sbb-train-wagon',
    'sbb-train-wagon-button',
    'sbb-train-wagon-link',
    'sbb-train-blocked-passage',
  ];

  /** General label for "driving direction". */
  @forceType()
  @handleDistinctChange((e: SbbTrainElement) => {
    e.dispatchEvent(
      /** @internal */
      new Event('directionlabelchange', { bubbles: true, composed: true }),
    );
  })
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
        <${unsafeStatic(TITLE_TAG_NAME)} class="sbb-screen-reader-only">
          ${this._getDirectionAriaLabel()}
        </${unsafeStatic(TITLE_TAG_NAME)}>
        ${
          this.directionLabel
            ? html`<div class="sbb-train__direction-heading" aria-hidden="true">
                <span class="sbb-train__direction-sticky-wrapper">
                  <sbb-icon class="sbb-train__direction-arrow" name="arrow-left-small"></sbb-icon>
                  <span class="sbb-train__direction-label">
                    ${this.directionLabel} ${this.station}
                  </span>
                </span>
              </div>`
            : nothing
        }
        ${this.renderList({
          class: 'sbb-train__wagons',
          ariaLabel: i18nWagonsLabel[this._language.current],
        })}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-train': SbbTrainElement;
  }
}

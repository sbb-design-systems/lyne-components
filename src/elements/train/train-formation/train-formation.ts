import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import {
  type CSSResultGroup,
  html,
  LitElement,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';

import { SbbConnectedAbortController, SbbLanguageController } from '../../core/controllers.js';
import { forceType } from '../../core/decorators.js';
import { i18nSector, i18nSectorShort, i18nTrains } from '../../core/i18n.js';
import { SbbNamedSlotListMixin, type WithListChildren } from '../../core/mixins.js';
import type { SbbTrainBlockedPassageElement } from '../train-blocked-passage.js';
import type { SbbTrainWagonElement } from '../train-wagon.js';
import type { SbbTrainElement } from '../train.js';

import style from './train-formation.scss?lit&inline';

interface AggregatedSector {
  label: string;
  wagonCount: number;
  blockedPassageCount: number;
}

/**
 * It displays a train composition, acting as a container for one or more `sbb-train` component.
 *
 * @slot - Use the unnamed slot to add 'sbb-train' elements to the `sbb-train-formation`.
 */
export
@customElement('sbb-train-formation')
class SbbTrainFormationElement extends SbbNamedSlotListMixin<SbbTrainElement, typeof LitElement>(
  LitElement,
) {
  public static override styles: CSSResultGroup = style;
  protected override readonly listChildLocalNames = ['sbb-train'];

  /** Option to hide all wagon labels. */
  @forceType()
  @property({ attribute: 'hide-wagon-label', reflect: true, type: Boolean })
  public accessor hideWagonLabel: boolean = false;

  @state() private accessor _sectors: AggregatedSector[] = [];

  /** Element that defines the visible content width. */
  private _formationDiv?: HTMLDivElement;
  private _contentResizeObserver = new ResizeController(this, {
    target: null,
    skipInitial: true,
    callback: () => this._applyCssWidth(),
  });
  private _abort = new SbbConnectedAbortController(this);
  private _language = new SbbLanguageController(this);

  public override connectedCallback(): void {
    super.connectedCallback();
    const signal = this._abort.signal;
    this.addEventListener('trainSlotChange', (e) => this._readSectors(e), { signal });
    this.addEventListener('sectorChange', (e) => this._readSectors(e), { signal });
  }

  /**
   * Apply width of the scrollable space of the formation as a css variable. This will be used from
   * every slotted sbb-train for the direction-label
   */
  private _applyCssWidth(): void {
    const contentWidth = this._formationDiv!.getBoundingClientRect().width;
    this._formationDiv!.style.setProperty('--sbb-train-direction-width', `${contentWidth}px`);
  }

  private _readSectors(event?: Event): void {
    // Keep the event internal.
    event?.stopPropagation();

    this._sectors = Array.from(
      this.querySelectorAll?.<SbbTrainWagonElement | SbbTrainBlockedPassageElement>(
        'sbb-train-wagon,sbb-train-blocked-passage',
      ) ?? [],
    ).reduce(
      (
        aggregatedSectors: AggregatedSector[],
        item: SbbTrainWagonElement | SbbTrainBlockedPassageElement,
      ) => {
        const currentAggregatedSector = aggregatedSectors[aggregatedSectors.length - 1];

        if (item.localName === 'sbb-train-wagon') {
          const sectorAttribute =
            (item as SbbTrainWagonElement).sector ?? item.getAttribute('sector');

          if (!currentAggregatedSector.label && sectorAttribute) {
            currentAggregatedSector.label = sectorAttribute;
          }

          if (!sectorAttribute || currentAggregatedSector.label === sectorAttribute) {
            currentAggregatedSector.wagonCount++;
          } else {
            aggregatedSectors.push({
              label: sectorAttribute,
              wagonCount: 1,
              blockedPassageCount: 0,
            });
          }
        } else if (item.localName === 'sbb-train-blocked-passage') {
          currentAggregatedSector.blockedPassageCount++;
        }

        return aggregatedSectors;
      },
      [{ wagonCount: 0, blockedPassageCount: 0 } as AggregatedSector],
    );
  }

  private async _updateFormationDiv(el: Element | undefined): Promise<void> {
    if (!el) {
      return;
    }
    if (this._formationDiv) {
      this._contentResizeObserver.unobserve(this._formationDiv);
    }
    this._formationDiv = el as HTMLDivElement;
    this._contentResizeObserver.observe(this._formationDiv);
    // There seems to be a slight difference between browser, in how the
    // observer is called. In order to be consistent across browsers
    // we set the width manually once the component update is complete.
    await this.updateComplete;
    this._applyCssWidth();
  }

  protected override willUpdate(changedProperties: PropertyValues<WithListChildren<this>>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('listChildren')) {
      this._readSectors();
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-train-formation" ${ref(this._updateFormationDiv)}>
        ${this._sectors.length && this._sectors[0].label !== undefined
          ? html`<div class="sbb-train-formation__sectors" aria-hidden="true">
              ${this._sectors.map(
                (aggregatedSector) =>
                  html`<span
                    class="sbb-train-formation__sector"
                    style="
                --sbb-train-formation-wagon-count: ${aggregatedSector.wagonCount};
                --sbb-train-formation-wagon-blocked-passage-count: ${aggregatedSector.blockedPassageCount}"
                  >
                    <span class="sbb-train-formation__sector-sticky-wrapper">
                      ${`${
                        aggregatedSector.wagonCount === 1 && aggregatedSector.label
                          ? i18nSectorShort[this._language.current]
                          : i18nSector[this._language.current]
                      } ${aggregatedSector.label ? aggregatedSector.label : ''}`}
                    </span>
                  </span>`,
              )}
            </div>`
          : nothing}

        <div class="sbb-train-formation__trains">
          ${this.renderList({
            class: 'sbb-train-formation__train-list',
            ariaLabel: i18nTrains[this._language.current],
          })}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-train-formation': SbbTrainFormationElement;
  }
}

import { Component, ComponentInterface, Element, h, JSX, Listen, Prop, State } from '@stencil/core';

import { i18nSector, i18nSectorShort, i18nTrains } from '../../global/i18n';
import {
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
} from '../../global/eventing';
import { AgnosticResizeObserver } from '../../global/observers';

interface AggregatedSector {
  label: string;
  wagonCount: number;
  blockedPassageCount: number;
}

/**
 * @slot unnamed - Used for slotting sbb-trains.
 */

@Component({
  shadow: true,
  styleUrl: 'sbb-train-formation.scss',
  tag: 'sbb-train-formation',
})
export class SbbTrainFormation implements ComponentInterface {
  /** Option to hide all wagon labels. */
  @Prop({ reflect: true }) public hideWagonLabel = false;

  @State() private _sectors: AggregatedSector[] = [];

  @State() private _trains: HTMLSbbTrainElement[];

  @State() private _currentLanguage = documentLanguage();

  @Element() private _element!: HTMLSbbTrainFormationElement;

  /** Element that defines the visible content width. */
  private _formationDiv: HTMLDivElement;

  private _contentResizeObserver = new AgnosticResizeObserver(() => this._applyCssWidth());

  private _handlerRepository = new HandlerRepository(
    this._element,
    languageChangeHandlerAspect((l) => (this._currentLanguage = l)),
  );

  public connectedCallback(): void {
    this._handlerRepository.connect();
    this._handleSlotChange();
  }

  public disconnectedCallback(): void {
    this._contentResizeObserver.disconnect();
    this._handlerRepository.disconnect();
  }

  /**
   * Apply width of the scrollable space of the formation as a css variable. This will be used from
   * every slotted sbb-train for the direction-label
   */
  private _applyCssWidth(): void {
    const contentWidth = this._formationDiv.getBoundingClientRect().width;
    this._formationDiv.style.setProperty('--sbb-train-direction-width', `${contentWidth}px`);
  }

  @Listen('trainSlotChange')
  @Listen('sectorChange')
  private _readSectors(event?: Event): void {
    // Keep the event internal.
    event?.stopPropagation();

    this._sectors = Array.from(
      this._element.querySelectorAll('sbb-train-wagon,sbb-train-blocked-passage'),
    ).reduce(
      (
        aggregatedSectors: AggregatedSector[],
        item: HTMLSbbTrainWagonElement | HTMLSbbTrainBlockedPassageElement,
      ) => {
        const currentAggregatedSector = aggregatedSectors[aggregatedSectors.length - 1];

        if (item.tagName === 'SBB-TRAIN-WAGON') {
          const sectorAttribute = (item as HTMLSbbTrainWagonElement).sector;

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
        } else if (item.tagName === 'SBB-TRAIN-BLOCKED-PASSAGE') {
          currentAggregatedSector.blockedPassageCount++;
        }

        return aggregatedSectors;
      },
      [{ wagonCount: 0, blockedPassageCount: 0 } as AggregatedSector],
    );
  }
  private _handleSlotChange(): void {
    this._readSectors();
    this._trains = Array.from(this._element.children).filter(
      (e): e is HTMLSbbTrainElement => e.tagName === 'SBB-TRAIN',
    );
  }

  private _updateFormationDiv(el: HTMLDivElement): void {
    this._contentResizeObserver.disconnect();
    this._formationDiv = el;
    this._contentResizeObserver.observe(this._formationDiv);
  }

  public render(): JSX.Element {
    // We should avoid lists with only one entry
    if (this._trains?.length > 1) {
      this._trains.forEach((train, index) => train.setAttribute('slot', `train-${index}`));
    } else {
      this._trains?.forEach((train) => train.removeAttribute('slot'));
    }

    return (
      <div class="sbb-train-formation" ref={(el): void => this._updateFormationDiv(el)}>
        <div class="sbb-train-formation__sectors" aria-hidden="true">
          {this._sectors.map((aggregatedSector) => (
            <span
              class="sbb-train-formation__sector"
              style={{
                '--sbb-train-formation-wagon-count': aggregatedSector.wagonCount.toString(),
                '--sbb-train-formation-wagon-blocked-passage-count':
                  aggregatedSector.blockedPassageCount.toString(),
              }}
            >
              <span class="sbb-train-formation__sector-sticky-wrapper">
                {`${
                  aggregatedSector.wagonCount === 1 && aggregatedSector.label
                    ? i18nSectorShort[this._currentLanguage]
                    : i18nSector[this._currentLanguage]
                } ${aggregatedSector.label ? aggregatedSector.label : ''}`}
              </span>
            </span>
          ))}
        </div>

        <div class="sbb-train-formation__trains">
          {this._trains?.length > 1 && (
            <ul
              class="sbb-train-formation__train-list"
              aria-label={i18nTrains[this._currentLanguage]}
            >
              {this._trains.map((_, index) => (
                <li class="sbb-train-formation__train-list-item">
                  <slot name={`train-${index}`} onSlotchange={() => this._handleSlotChange()} />
                </li>
              ))}
            </ul>
          )}

          <span class="sbb-train-formation__single-train" hidden={this._trains?.length !== 1}>
            <slot onSlotchange={() => () => this._handleSlotChange()} />
          </span>
        </div>
      </div>
    );
  }
}

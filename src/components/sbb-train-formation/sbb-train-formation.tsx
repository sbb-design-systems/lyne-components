import { Component, ComponentInterface, Element, h, JSX, Listen, Prop, State } from '@stencil/core';

import { AgnosticResizeObserver as ResizeObserver } from '../../global/helpers/resize-observer';
import { i18nSector, i18nTrains } from '../../global/i18n';
import { documentLanguage, SbbLanguageChangeEvent } from '../../global/helpers/language';

interface SectorCollected {
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
  @Element() private _element: HTMLElement;

  /** Option to hide all wagon labels. */
  @Prop({ reflect: true }) public hideWagonLabel = false;

  @State() private _sectors: SectorCollected[] = [];

  @State() private _trains: HTMLSbbTrainElement[];

  @State() private _currentLanguage = documentLanguage();

  /** Element that defines the visible content width. */
  private _formationDiv: HTMLDivElement;

  /**
   * Width of the visible space of the content. It is passed to the sbb-trains as css-var and used
   * for the sticky styling of the direction (indicator/labels/arrows).
   */
  private _contentWidth: number;

  private _contentResizeObserver = new ResizeObserver(() => this._onResize());

  public connectedCallback(): void {
    this._handleSlotChange();
  }

  public componentDidLoad(): void {
    this._contentWidth = this._formationDiv.getBoundingClientRect().width;
    this._contentResizeObserver.observe(this._formationDiv);
    this._applyCssWidth();
  }

  public disconnectedCallback(): void {
    this._contentResizeObserver.disconnect();
  }

  private _onResize(): void {
    this._contentWidth = this._formationDiv.getBoundingClientRect().width;
    this._applyCssWidth();
  }

  /**
   * Apply width of the scrollable space of the formation as a css variable. This will be used from
   * every slotted sbb-train for the direction-label
   */
  private _applyCssWidth(): void {
    this._formationDiv.style.setProperty('--sbb-train-direction-width', `${this._contentWidth}px`);
  }

  @Listen('sbbLanguageChange', { target: 'document' })
  public handleLanguageChange(event: SbbLanguageChangeEvent): void {
    this._currentLanguage = event.detail;
  }

  @Listen('trainSlotChange')
  @Listen('sectorChange')
  private _readSectors(event?: Event): void {
    // Keep the event internal.
    event?.stopPropagation();

    this._sectors = Array.from(
      this._element.querySelectorAll('sbb-train-wagon,sbb-train-blocked-passage')
    ).reduce(
      (
        collected: SectorCollected[],
        item: HTMLSbbTrainWagonElement | HTMLSbbTrainBlockedPassageElement
      ) => {
        if (!collected.length) {
          collected.push({ wagonCount: 0, blockedPassageCount: 0 } as SectorCollected);
        }

        const currentSectorCollected = collected[collected.length - 1];

        if (item.tagName === 'SBB-TRAIN-WAGON') {
          const sectorAttribute = (item as HTMLSbbTrainWagonElement).sector;

          if (!currentSectorCollected.label && sectorAttribute) {
            currentSectorCollected.label = sectorAttribute;
          }

          if (!sectorAttribute || currentSectorCollected.label === sectorAttribute) {
            currentSectorCollected.wagonCount++;
          } else {
            collected.push({
              label: sectorAttribute,
              wagonCount: 1,
              blockedPassageCount: 0,
            });
          }
        } else if (item.tagName === 'SBB-TRAIN-BLOCKED-PASSAGE') {
          currentSectorCollected.blockedPassageCount++;
        }

        return collected;
      },
      []
    );
  }

  private _readTrains(): void {
    this._trains = Array.from(this._element.children).filter(
      (e): e is HTMLSbbTrainElement => e.tagName === 'SBB-TRAIN'
    );
  }

  private _handleSlotChange(): void {
    this._readSectors();
    this._readTrains();
  }

  public render(): JSX.Element {
    // We should avoid lists with only one entry
    if (this._trains?.length > 1) {
      this._trains.forEach((train, index) => train.setAttribute('slot', `train-${index}`));
    } else {
      this._trains.forEach((train) => train.removeAttribute('slot'));
    }

    return (
      <div
        class="sbb-train-formation"
        ref={(el): void => {
          this._formationDiv = el;
        }}
      >
        <div class="sbb-train-formation__sectors" aria-hidden="true">
          {this._sectors.map((sectorCollected) => (
            <span
              class="sbb-train-formation__sector"
              style={{
                '--sbb-train-formation-wagon-count': sectorCollected.wagonCount.toString(),
                '--sbb-train-formation-wagon-blocked-passage-count':
                  sectorCollected.blockedPassageCount.toString(),
              }}
            >
              <span class="sbb-train-formation__sector-sticky-wrapper">
                {i18nSector[this._currentLanguage]} {sectorCollected.label}
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

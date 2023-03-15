import { Component, Element, h, Host, JSX, Listen, Prop, State } from '@stencil/core';

import { AgnosticResizeObserver as ResizeObserver } from '../../global/helpers/resize-observer';

interface SectorCollected {
  label: string;
  wagonsCount: number;
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
export class SbbTrainFormation {
  @Element() private _element: HTMLElement;

  /** Option to hide all wagon numbers. */
  @Prop({ reflect: true }) public hideWagonLabel = false;

  /** Element that defines the visible content width */
  private _formationDiv: HTMLDivElement;

  /**
   * Width of the visible space of the content. It is passed to the sbb-trains as css-var and used
   * for the sticky styling of the direction (indicator/labels/arrows).
   */
  private _contentWidth: number;

  private _contentResizeObserver = new ResizeObserver(this._onResize.bind(this));

  public connectedCallback(): void {
    this._readSectors();
  }

  public disconnectedCallback(): void {
    this._contentResizeObserver.disconnect();
  }

  private _onResize(): void {
    this._contentWidth = this._formationDiv.getBoundingClientRect().width;
    this._applyCssWidth();
  }

  public componentDidLoad(): void {
    this._contentWidth = this._formationDiv.getBoundingClientRect().width;
    this._contentResizeObserver.observe(this._formationDiv);
    this._applyCssWidth();
  }

  /**
   * Apply width of the scrollable space of the formation as a css variable. This will be used from
   * every slotted sbb-train for the direction-label
   */
  private _applyCssWidth(): void {
    this._formationDiv.style.setProperty('--sbb-train-direction-width', `${this._contentWidth}px`);
  }

  @State() private _sectors: SectorCollected[] = [];

  @Listen('trainSlotChange')
  @Listen('sectorChange')
  private _readSectors(event?: Event): void {
    // Keep the event internal.
    event?.stopPropagation();

    this._sectors = Array.from(
      this._element.querySelectorAll('sbb-train-wagon,sbb-train-blocked-passage')
    ).reduce(
      (
        accu: SectorCollected[],
        item: HTMLSbbTrainWagonElement | HTMLSbbTrainBlockedPassageElement
      ) => {
        if (!accu.length) {
          accu.push({ wagonsCount: 0, blockedPassageCount: 0 } as SectorCollected);
        }

        const currentSectorCollected = accu[accu.length - 1];

        if (item.tagName === 'SBB-TRAIN-WAGON') {
          const sectorAttribute = item.getAttribute('sector');
          if (!sectorAttribute && !accu.length) {
            console.error(`No sector specified for first wagon`, item);
            throw new Error(`No sector specified for first wagon`);
          }
          if (!currentSectorCollected.label && sectorAttribute) {
            currentSectorCollected.label = sectorAttribute;
          }
          if (currentSectorCollected.label === sectorAttribute) {
            currentSectorCollected.wagonsCount++;
          } else {
            accu.push({
              label: sectorAttribute,
              wagonsCount: 1,
              blockedPassageCount: 0,
            } as SectorCollected);
          }
        } else if (item.tagName === 'SBB-TRAIN-BLOCKED-PASSAGE') {
          currentSectorCollected.blockedPassageCount++;
        }
        return accu;
      },
      []
    );
  }

  public render(): JSX.Element {
    //TODO: translate
    return (
      <Host role="list" aria-label="Train Formation">
        <div
          class="sbb-train-formation"
          ref={(el): void => {
            this._formationDiv = el;
          }}
        >
          <div class="sbb-train-formation__sectors" aria-hidden="true">
            {this._sectors.map((sectorCollected) => (
              // TODO: translate
              <span
                class="sbb-train-formation__sector"
                style={{
                  '--sbb-train-formation-wagon-count': sectorCollected.wagonsCount.toString(),
                  '--sbb-train-formation-wagon-blocked-passage-count':
                    sectorCollected.blockedPassageCount.toString(),
                }}
              >
                <span class="sbb-train-formation__sector-sticky-wrapper">
                  Sector {sectorCollected.label}
                </span>
              </span>
            ))}
          </div>
          <div class="sbb-train-formation__trains">
            <slot onSlotchange={() => this._readSectors()} />
          </div>
        </div>
      </Host>
    );
  }
}

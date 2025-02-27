import { forceType } from '@sbb-esta/lyne-elements/core/decorators/force-type';
import { EventEmitter } from '@sbb-esta/lyne-elements/core/eventing.js';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { CoachItem } from '../seat-reservation.js';

import style from './seat-reservation-navigation.scss?lit&inline';

/**
 * Describe the purpose of the component with a single short sentence.
 *
 * @slot - Use the unnamed slot to add elements.
 * @event {CustomEvent<number>} selectCoach - Emits when select a coach navigation element and returns the clicked coach nav index
 */
export
@customElement('sbb-seat-reservation-navigation')
class SbbSeatReservationNavigationElement extends LitElement {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    selectCoach: 'selectCoach',
  } as const;

  @forceType()
  @property({ attribute: 'coach-items', type: Object })
  public accessor coachItems: CoachItem[] = null!;

  @forceType()
  @property({ attribute: 'selected-coach-index', type: Number })
  public accessor selectedCoachIndex: number = 0;

  @forceType()
  @property({ attribute: 'align-vertical', type: Boolean })
  public accessor alignVertical: boolean = false;

  /** Emits when an place was selected by user. */
  protected selectNavCoach: EventEmitter = new EventEmitter(
    this,
    SbbSeatReservationNavigationElement.events.selectCoach,
  );

  protected override render(): TemplateResult {
    const classAlignVertical = this.alignVertical
      ? 'sbb-seat-reservation-navigation__wrapper sbb-seat-reservation-navigation__wrapper--vertical'
      : 'sbb-seat-reservation-navigation__wrapper';
    return html` <div class="${classAlignVertical}">
      <ul class="sbb-seat-reservation-navigation__list-coaches">
        ${this._getRenderedNavCoachs(this.coachItems)}
      </ul>
    </div>`;
  }

  private _getRenderedNavCoachs(coaches: CoachItem[]): TemplateResult[] {
    return coaches.map((coachItem: CoachItem, index: number) => {
      const coachSelectedClass =
        this.selectedCoachIndex === index
          ? 'sbb-seat-reservation-navigation__item-coache--selected'
          : '';
      return html`
        <li class="sbb-seat-reservation-navigation__item-coache ${coachSelectedClass}">
          <button
            class="sbb-seat-reservation-place-control__button"
            @click=${() => this._selectNavCoach(index)}
          >
            ${coachItem.number}
          </button>
        </li>
      `;
    });
  }

  private _selectNavCoach(coachIndex: number): void {
    this.selectNavCoach.emit(coachIndex);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-seat-reservation-navigation': SbbSeatReservationNavigationElement;
  }
}

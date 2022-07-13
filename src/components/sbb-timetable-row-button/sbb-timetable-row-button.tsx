import { Component, Element, h, Prop, Watch } from '@stencil/core';
import events from './sbb-timetable-row-button.events';
import getDocumentLang from '../../global/helpers/get-document-lang';
import { i18nShowConnectionDetailsAndBuyOptions } from '../../global/i18n';

@Component({
  shadow: true,
  styleUrl: 'sbb-timetable-row-button.scss',
  tag: 'sbb-timetable-row-button',
})
export class SbbTimetableRowButton {
  private _button!: HTMLElement;
  private _currentLanguage = getDocumentLang();

  @Element() private _element: HTMLElement;

  /** Id which is sent in the event of clicking the button */
  @Prop() public eventId?: string;

  /**
   * Set to true to initially show the
   * state, which would get set by pressing
   * the button.
   */
  @Prop({
    reflect: true,
  })
  public expanded?: boolean;

  @Watch('expanded')
  public watchStateHandler(newValue: boolean): void {
    this.expanded = newValue;
    this._toggleAriaAttributes(false);
  }

  private _toggleAriaAttributes(click): void {
    if (click) {
      this.expanded = !this.expanded;
    }

    const expand = String(this.expanded);

    this._button.setAttribute('aria-expanded', expand);
  }

  private _clickHandler = (): void => {
    this._toggleAriaAttributes(true);

    let eventDetail;

    if (this.eventId) {
      eventDetail = this.eventId;
    }

    const event = new CustomEvent(events.click, {
      bubbles: true,
      composed: true,
      detail: eventDetail,
    });

    this._element.dispatchEvent(event);
  };

  public render(): JSX.Element {
    return (
      <button
        aria-expanded="false"
        aria-haspopup="true"
        aria-label={`${i18nShowConnectionDetailsAndBuyOptions[this._currentLanguage]}`}
        onClick={this._clickHandler}
        ref={(el): void => {
          this._button = el;
        }}
        type="button"
      ></button>
    );
  }

  public componentDidRender(): void {
    this._toggleAriaAttributes(false);
  }
}

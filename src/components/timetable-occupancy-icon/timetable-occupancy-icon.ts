import { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import {
  ConnectedAbortController,
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
} from '../core/eventing';
import { i18nOccupancy } from '../core/i18n';
import { SbbOccupancy } from '../core/interfaces';
import { SbbIcon } from '../icon';

import style from './timetable-occupancy-icon.scss?lit&inline';

/**
 * It displays a wagon's occupancy icon.
 */
@customElement('sbb-timetable-occupancy-icon')
export class SbbTimetableOccupancyIcon extends SbbIcon {
  public static override styles: CSSResultGroup = [SbbIcon.styles, style];

  /** Wagon occupancy. */
  @property() public occupancy!: SbbOccupancy;

  /** Negative coloring variant flag. */
  @property({ type: Boolean }) public negative: boolean = false;

  public constructor() {
    super();
    this.ariaHidden = 'false';
  }

  @state() private _currentLanguage = documentLanguage();

  private _abort = new ConnectedAbortController(this);

  private _handlerRepository = new HandlerRepository(
    this,
    languageChangeHandlerAspect((l) => {
      this._currentLanguage = l;
      this._setAriaLabel();
    }),
  );

  private _setNameAndAriaLabel(): void {
    if (!this.occupancy) {
      return;
    }

    if (window.matchMedia('(forced-colors: active)').matches) {
      // high contrast
      this.name = `utilization-${this.occupancy}-high-contrast`;
    } else if (this.negative || window.matchMedia('(prefer-color-scheme: dark)').matches) {
      // dark
      this.name = `utilization-${this.occupancy}-negative`;
    } else {
      this.name = `utilization-${this.occupancy}`;
    }

    this._setAriaLabel();
  }

  private _setAriaLabel(): void {
    this.ariaLabel = i18nOccupancy[this.occupancy]
      ? `${i18nOccupancy[this.occupancy][this._currentLanguage]}.`
      : null;
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._setNameAndAriaLabel();
    window
      .matchMedia('(forced-colors: active)')
      .addEventListener('change', () => this._setNameAndAriaLabel(), {
        signal: this._abort.signal,
      });
    window
      .matchMedia('(prefer-color-scheme: dark)')
      .addEventListener('change', () => this._setNameAndAriaLabel(), {
        signal: this._abort.signal,
      });
    this._handlerRepository.connect();
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has('occupancy') || changedProperties.has('negative')) {
      this._setNameAndAriaLabel();
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._handlerRepository.disconnect();
  }

  protected override render(): TemplateResult {
    return super.render();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-timetable-occupancy-icon': SbbTimetableOccupancyIcon;
  }
}

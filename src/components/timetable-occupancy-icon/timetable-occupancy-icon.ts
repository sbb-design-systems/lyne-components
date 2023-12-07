import { CSSResultGroup, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import {
  ConnectedAbortController,
  documentLanguage,
  HandlerRepository,
  languageChangeHandlerAspect,
} from '../core/eventing';
import { i18nOccupancy } from '../core/i18n';
import { SbbOccupancy } from '../core/interfaces';
import { SbbIconBase } from '../icon';

import style from './timetable-occupancy-icon.scss?lit&inline';

/**
 * It displays a wagon's occupancy icon.
 */
@customElement('sbb-timetable-occupancy-icon')
export class SbbTimetableOccupancyIconElement extends SbbIconBase {
  public static override styles: CSSResultGroup = [SbbIconBase.styles, style];

  /** Wagon occupancy. */
  @property() public occupancy!: SbbOccupancy;

  /** Negative coloring variant flag. */
  @property({ reflect: true, type: Boolean }) public negative: boolean = false;

  @state() private _currentLanguage = documentLanguage();

  private _abort = new ConnectedAbortController(this);

  private _handlerRepository = new HandlerRepository(
    this,
    languageChangeHandlerAspect((l) => {
      this._currentLanguage = l;
      this._setAriaLabel();
    }),
  );

  private async _setNameAndAriaLabel(): Promise<void> {
    if (!this.occupancy) {
      return;
    }

    let icon = `utilization-${this.occupancy}`;
    if (globalThis.window?.matchMedia('(forced-colors: active)').matches) {
      // high contrast
      icon += '-high-contrast';
    } else if (
      this.negative ||
      globalThis.window?.matchMedia('(prefer-color-scheme: dark)').matches
    ) {
      // dark
      icon += '-negative';
    }

    await this.loadSvgIcon(icon);
  }

  protected override async fetchSvgIcon(namespace: string, name: string): Promise<string> {
    this._setAriaLabel();
    return super.fetchSvgIcon(namespace, name);
  }

  private _setAriaLabel(): void {
    const label = i18nOccupancy[this.occupancy]?.[this._currentLanguage];
    if (label) {
      this.setAttribute('aria-label', label);
    } else {
      this.removeAttribute('aria-label');
    }
  }

  public override connectedCallback(): void {
    super.connectedCallback();
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
    this._setNameAndAriaLabel();
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
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-timetable-occupancy-icon': SbbTimetableOccupancyIconElement;
  }
}

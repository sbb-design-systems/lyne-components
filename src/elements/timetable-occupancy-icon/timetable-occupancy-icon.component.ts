import type { CSSResultGroup, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import {
  SbbDarkModeController,
  SbbLanguageController,
  SbbMediaMatcherController,
  SbbMediaQueryForcedColors,
} from '../core/controllers.ts';
import { i18nOccupancy } from '../core/i18n.ts';
import type { SbbOccupancy } from '../core/interfaces.ts';
import { SbbNegativeMixin } from '../core/mixins.ts';
import { SbbIconBase } from '../icon.ts';

import style from './timetable-occupancy-icon.scss?lit&inline';

/**
 * It displays a wagon's occupancy icon.
 */
export
@customElement('sbb-timetable-occupancy-icon')
class SbbTimetableOccupancyIconElement extends SbbNegativeMixin(SbbIconBase) {
  public static override styles: CSSResultGroup = [SbbIconBase.styles, style];

  /** Wagon occupancy. */
  @property() public accessor occupancy: SbbOccupancy = 'none';

  private _language = new SbbLanguageController(this).withHandler(() => this._setAriaLabel());
  private _mediaMatcher = new SbbMediaMatcherController(this, {
    [SbbMediaQueryForcedColors]: (matches) => {
      this._forcedColors = matches;
      this._setNameAndAriaLabel();
    },
  });
  private _darkModeController = new SbbDarkModeController(this, () => this._setNameAndAriaLabel());

  private _forcedColors: boolean = this._mediaMatcher.matches(SbbMediaQueryForcedColors) ?? false;

  private async _setNameAndAriaLabel(): Promise<void> {
    if (!this.occupancy) {
      return;
    }

    let icon = `utilization-${this.occupancy}`;
    if (this._forcedColors) {
      icon += '-high-contrast';
    } else if (this.negative || this._darkModeController.matches()) {
      icon += '-negative';
    }

    await this.loadSvgIcon(icon);
  }

  protected override async fetchSvgIcon(namespace: string, name: string): Promise<string> {
    this._setAriaLabel();
    return super.fetchSvgIcon(namespace, name);
  }

  private _setAriaLabel(): void {
    this.internals.ariaLabel = (i18nOccupancy[this.occupancy] as Record<string, string>)?.[
      this._language.current
    ];
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._setNameAndAriaLabel();
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('occupancy') || changedProperties.has('negative')) {
      this._setNameAndAriaLabel();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-timetable-occupancy-icon': SbbTimetableOccupancyIconElement;
  }
}

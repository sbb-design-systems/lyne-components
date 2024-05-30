export type SbbLanguage = 'de' | 'en' | 'fr' | 'it';

export type SbbDateLike<T = Date> = T | string | number;

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Hours = `${0 | 1}${Digit}` | `2${0 | 1 | 2 | 3}`;
type Minutes = `${0 | 1 | 2 | 3 | 4 | 5}${Digit}`;
type Seconds = Minutes;

export type SbbShortTime = `${Hours}:${Minutes}`;

export type SbbTime = `${Hours}:${Minutes}:${Seconds}`;

export type SbbHorizontalFrom = 'zero' | 'micro' | 'small' | 'medium' | 'large' | 'wide' | 'ultra';

export type SbbIconPlacement = 'start' | 'end';

export type SbbOccupancy = 'high' | 'medium' | 'low' | 'none';

export type SbbOrientation = 'horizontal' | 'vertical';

export type SbbProtectiveRoom = 'none' | 'minimal' | 'ideal';

export type SbbStateChange = SbbCheckedStateChange | SbbDisabledStateChange | SbbValueStateChange;

export type SbbTimetableAppearance = 'first-level' | 'second-level';

export type SbbOpenedClosedState = 'closed' | 'opening' | 'opened' | 'closing';

export interface SbbCheckedStateChange {
  type: 'checked';
  checked: boolean;
}

export interface SbbDisabledStateChange {
  type: 'disabled';
  disabled: boolean;
}

export interface SbbValueStateChange {
  type: 'value';
  value: string | null;
}

declare global {
  interface GlobalEventHandlersEventMap {
    stateChange: CustomEvent<SbbStateChange>;
  }
}

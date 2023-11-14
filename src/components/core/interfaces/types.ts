export type SbbDateLike = Date | string | number;

export type SbbHorizontalFrom = 'zero' | 'micro' | 'small' | 'medium' | 'large' | 'wide' | 'ultra';

export type SbbIconPlacement = 'start' | 'end';

export type SbbOccupancy = 'high' | 'medium' | 'low' | 'none';

export type SbbOrientation = 'horizontal' | 'vertical';

export type SbbProtectiveRoom = 'none' | 'minimal' | 'ideal';

export type SbbStateChange = SbbCheckedStateChange | SbbDisabledStateChange | SbbValueStateChange;

export type SbbTimetableAppearance = 'first-level' | 'second-level';

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
  value: string;
}

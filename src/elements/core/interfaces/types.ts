export type SbbLanguage = 'de' | 'en' | 'fr' | 'it';

export type SbbTime = `${number}:${number}:${number}`;

export type SbbHorizontalFrom = 'zero' | 'small' | 'large' | 'ultra';

export type SbbIconPlacement = 'start' | 'end';

export type SbbOccupancy = 'high' | 'medium' | 'low' | 'none';

export type SbbOrientation = 'horizontal' | 'vertical';

export type SbbProtectiveRoom = 'none' | 'minimal' | 'ideal';

/** @deprecated */
export type SbbTimetableAppearance = 'first-level' | 'second-level';

export type SbbOpenedClosedState = 'closed' | 'opening' | 'opened' | 'closing';

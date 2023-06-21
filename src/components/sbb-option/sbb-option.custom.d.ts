import { SbbOption } from './sbb-option';

export type SbbOptionVariant = 'autocomplete' | 'select';

export type InternalSbbOption = HTMLSbbOptionElement &
  Pick<SbbOption, 'setSelectedViaUserInteraction'>;

export interface SbbOptionEventData {
  id: string;
  selected: boolean;
  value: any;
}

export type SbbOptionVariant = 'autocomplete' | 'select';

export interface SbbOptionSelectionChange {
  id: string;
  selected: boolean;
  value: any;
}

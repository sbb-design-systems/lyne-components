import type { SbbStateChange } from '../interfaces';
import type { ValidationChangeEvent } from '../interfaces/validation-change';

export interface InputUpdateEvent {
  disabled?: boolean;
  readonly?: boolean;
  min?: string | number;
  max?: string | number;
}

export type SbbCustomVoidEvent = CustomEvent<void>;

// slot change
export const sbbNamedSlotChangeEventName = 'sbbNamedSlotChange';
export type SbbNamedSlotChangeEvent = CustomEvent<Set<string>>;

// datepicker
export const sbbDatepickerEvents = {
  didChange: 'didChange',
  change: 'change',
  inputUpdated: 'inputUpdated',
  datePickerUpdated: 'datePickerUpdated',
  validationChange: 'validationChange',
} as const;
export type SbbDatepickerInputUpdatedEvent = CustomEvent<InputUpdateEvent>;
export type SbbDatepickerValidationChangeEvent = CustomEvent<ValidationChangeEvent>;
interface SbbDatepickerEventMap {
  [sbbDatepickerEvents.didChange]: SbbCustomVoidEvent;
  [sbbDatepickerEvents.change]: SbbCustomVoidEvent;
  [sbbDatepickerEvents.inputUpdated]: SbbDatepickerInputUpdatedEvent;
  [sbbDatepickerEvents.datePickerUpdated]: SbbCustomVoidEvent;
  [sbbDatepickerEvents.validationChange]: SbbDatepickerValidationChangeEvent;
}

// option
export const sbbOptionEvents = {
  selectionChange: 'optionSelectionChange',
  optionSelected: 'optionSelected',
} as const;
export type SbbOptionEvent = CustomEvent<void>;
interface SbbOptionEventMap {
  [sbbOptionEvents.selectionChange]: SbbOptionEvent;
  [sbbOptionEvents.optionSelected]: SbbOptionEvent;
}

// all overlays
export const sbbOverlayEvents = {
  willOpen: 'willOpen',
  didOpen: 'didOpen',
  willClose: 'willClose',
  didClose: 'didClose',
} as const;
interface SbbOverlayEventMap {
  [sbbOverlayEvents.willOpen]: SbbCustomVoidEvent;
  [sbbOverlayEvents.didOpen]: SbbCustomVoidEvent;
  [sbbOverlayEvents.willClose]: SbbCustomVoidEvent;
  [sbbOverlayEvents.didClose]: SbbCustomVoidEvent;
}

// input elements
export const sbbStateChange = {
  stateChange: 'stateChange',
} as const;
interface SbbStateChangeEventMap {
  [sbbStateChange.stateChange]: CustomEvent<SbbStateChange>;
}

declare global {
  interface HTMLElementEventMap
    extends SbbDatepickerEventMap,
      SbbOptionEventMap,
      SbbOverlayEventMap,
      SbbStateChangeEventMap {
    [sbbNamedSlotChangeEventName]: SbbNamedSlotChangeEvent;
  }
}

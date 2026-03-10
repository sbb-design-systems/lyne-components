/** @entrypoint */
import { SbbAutocompleteGridOptionElement } from './autocomplete-grid-option/autocomplete-grid-option.component.ts';

export * from './autocomplete-grid-option/autocomplete-grid-option.component.ts';

SbbAutocompleteGridOptionElement.define();

console.warn(`The entrypoint '@sbb-esta/elements-experimental/autocomplete-grid/autocomplete-grid-option.js' has been deprecated.
Use either '@sbb-esta/elements-experimental/autocomplete-grid.js' or '@sbb-esta/elements-experimental/autocomplete-grid.pure.js' instead.`);

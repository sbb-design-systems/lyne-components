/** @entrypoint */
import { SbbAutocompleteGridElement } from './autocomplete-grid/autocomplete-grid.component.ts';

export * from './autocomplete-grid/autocomplete-grid.component.ts';

SbbAutocompleteGridElement.define();

console.warn(`The entrypoint '@sbb-esta/elements-experimental/autocomplete-grid/autocomplete-grid.js' has been deprecated.
Use either '@sbb-esta/elements-experimental/autocomplete-grid.js' or '@sbb-esta/elements-experimental/autocomplete-grid.pure.js' instead.`);

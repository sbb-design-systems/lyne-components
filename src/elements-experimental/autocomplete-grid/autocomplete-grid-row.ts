/** @entrypoint */
import { SbbAutocompleteGridRowElement } from './autocomplete-grid-row/autocomplete-grid-row.component.ts';

export * from './autocomplete-grid-row/autocomplete-grid-row.component.ts';

SbbAutocompleteGridRowElement.define();

console.warn(`The entrypoint '@sbb-esta/elements-experimental/autocomplete-grid/autocomplete-grid-row.js' has been deprecated.
Use either '@sbb-esta/elements-experimental/autocomplete-grid.js' or '@sbb-esta/elements-experimental/autocomplete-grid.pure.js' instead.`);

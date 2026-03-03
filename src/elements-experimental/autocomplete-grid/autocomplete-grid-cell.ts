/** @entrypoint */
import { SbbAutocompleteGridCellElement } from './autocomplete-grid-cell/autocomplete-grid-cell.component.ts';

export * from './autocomplete-grid-cell/autocomplete-grid-cell.component.ts';

SbbAutocompleteGridCellElement.define();

console.warn(`The entrypoint '@sbb-esta/elements-experimental/autocomplete-grid/autocomplete-grid-cell.js' has been deprecated.
Use either '@sbb-esta/elements-experimental/autocomplete-grid.js' or '@sbb-esta/elements-experimental/autocomplete-grid.pure.js' instead.`);

/** @entrypoint */
import { SbbAutocompleteGridButtonElement } from './autocomplete-grid-button/autocomplete-grid-button.component.ts';

export * from './autocomplete-grid-button/autocomplete-grid-button.component.ts';

SbbAutocompleteGridButtonElement.define();

console.warn(`The entrypoint '@sbb-esta/elements-experimental/autocomplete-grid/autocomplete-grid-button.js' has been deprecated.
Use either '@sbb-esta/elements-experimental/autocomplete-grid.js' or '@sbb-esta/elements-experimental/autocomplete-grid.pure.js' instead.`);

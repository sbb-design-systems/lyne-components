import { unsafeCSS } from 'lit';

import optionPanelStyleString from './autocomplete/option-panel-common.scss?inline';

/** @entrypoint */
export * from './autocomplete/autocomplete-base-element.ts';
export * from './autocomplete/autocomplete.component.ts';
export const optionPanelStyle = unsafeCSS(optionPanelStyleString);

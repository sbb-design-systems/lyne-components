import { unsafeCSS } from 'lit';

import hostScrollbarStylesString from './host-scrollbar.scss?inline';
import optionPanelString from './option-panel-common.scss?inline';
import screenReaderOnlyStylesString from './screen-reader-only.scss?inline';
import scrollbarStylesString from './scrollbar.scss?inline';

export const hostScrollbarStyles = unsafeCSS(hostScrollbarStylesString);
export const optionPanelStyles = unsafeCSS(optionPanelString);
export const screenReaderOnlyStyles = unsafeCSS(screenReaderOnlyStylesString);
export const scrollbarStyles = unsafeCSS(scrollbarStylesString);

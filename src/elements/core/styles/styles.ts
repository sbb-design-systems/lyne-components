import { unsafeCSS } from 'lit';

import buttonResetStylesString from './button-reset.scss?inline';
import hostScrollbarStylesString from './host-scrollbar.scss?inline';
import listResetStylesString from './list-reset.scss?inline';
import screenReaderOnlyStylesString from './screen-reader-only.scss?inline';
import scrollbarStylesString from './scrollbar.scss?inline';

export const buttonResetStyles = unsafeCSS(buttonResetStylesString);
export const hostScrollbarStyles = unsafeCSS(hostScrollbarStylesString);
export const listResetStyles = unsafeCSS(listResetStylesString);
export const screenReaderOnlyStyles = unsafeCSS(screenReaderOnlyStylesString);
export const scrollbarStyles = unsafeCSS(scrollbarStylesString);

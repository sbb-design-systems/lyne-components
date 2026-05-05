import { unsafeCSS } from 'lit';

import hostScrollbarStylesString from './host-scrollbar.scss?inline';
import screenReaderOnlyStylesString from './screen-reader-only.scss?inline';
import scrollbarStylesString from './scrollbar.scss?inline';

export const hostScrollbarStyles = unsafeCSS(hostScrollbarStylesString);
export const screenReaderOnlyStyles = unsafeCSS(screenReaderOnlyStylesString);
export const scrollbarStyles = unsafeCSS(scrollbarStylesString);

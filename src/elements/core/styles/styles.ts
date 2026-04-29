import { unsafeCSS } from 'lit';

import boxSizingStylesString from './box-sizing.scss?inline';
import hostScrollbarString from './host-scrollbar.scss?inline';
import screenReaderOnlyString from './screen-reader-only.scss?inline';

export const boxSizingStyles = unsafeCSS(boxSizingStylesString);
export const hostScrollbarStyles = unsafeCSS(hostScrollbarString);
export const screenReaderOnlyStyles = unsafeCSS(screenReaderOnlyString);

import { unsafeCSS } from 'lit';

import boxSizingStylesString from './box-sizing.scss?inline';
import hostScrollbarString from './host-scrollbar.scss?inline';

export const boxSizingStyles = unsafeCSS(boxSizingStylesString);
export const hostScrollbarStyles = unsafeCSS(hostScrollbarString);

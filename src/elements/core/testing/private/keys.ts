import { isWebkit } from '../../dom.ts';

// Webkit doesn't allow focusing links via just a Tab key press.
// Using additionally the alt key, it works.
export const tabKey = isWebkit ? 'Alt+Tab' : 'Tab';

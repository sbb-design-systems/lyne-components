import { getDocumentWritingMode } from '../dom';

/** Sets basic attributes for an interactive element (link/button) based on the provided properties. */
export function hostProperties(role: string, disabled: boolean): Record<string, string> {
  return Object.assign(
    { role, dir: getDocumentWritingMode() },
    disabled
      ? { 'aria-disabled': 'true', tabIndex: null }
      : { 'aria-disabled': null, tabIndex: '0' },
  );
}

import { getDocumentWritingMode } from '../dom';

/** Sets basic attributes for an interactive element (link/button) based on the provided properties. */
export function hostProperties(
  role: string,
  disabled?: boolean,
): Record<string, string | undefined> {
  return Object.assign(
    { role, dir: getDocumentWritingMode() },
    disabled
      ? { 'aria-disabled': 'true', tabIndex: undefined }
      : { 'aria-disabled': undefined, tabIndex: '0' },
  );
}

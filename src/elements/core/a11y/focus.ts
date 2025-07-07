export const IS_FOCUSABLE_QUERY = [
  'button',
  '[href]',
  'input',
  'select',
  'textarea',
  'details',
  'summary',
  '[tabindex]',
]
  .map((selector) => `${selector}:not([disabled],:disabled,[tabindex="-1"],[inert])`)
  .join(',');

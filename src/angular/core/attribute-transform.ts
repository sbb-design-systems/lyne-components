/**
 * Transform an attribute value to a boolean value.
 * We do not use the Angular implementation because it treats 'false' as a false value,
 * which does not align with the Lit and native interpretation.
 */
export function booleanAttribute(value: unknown): boolean {
  return typeof value === 'boolean' ? value : value != null && !!value;
}

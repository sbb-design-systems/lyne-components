/**
 * The accessibility interface is used to enforce all accessibility labels to be implemented at once.
 */
export interface AccessibilityProperties {
  /** This will be forwarded as aria-label to the relevant nested element. */
  accessibilityLabel: string | undefined;
}

/**
 * Lists all attributes for the AccessibilityProperties interface
 * @param accessibilityProps accessibility props
 */
export function getAccessibilityAttributeList(
  accessibilityProps?: AccessibilityProperties | null
): Record<string, string> {
  return {
    'aria-label': accessibilityProps?.accessibilityLabel
      ? accessibilityProps.accessibilityLabel
      : undefined,
  };
}

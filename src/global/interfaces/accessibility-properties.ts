/**
 * The accessibility interface is used to enforce all accessibility labels to be implemented at once.
 */
export interface AccessibilityProperties {
  /** This will be forwarded as aria-label to the relevant nested element. */
  accessibilityLabel: string | undefined;

  /** This will be forwarded as aria-describedby to the relevant nested element. */
  accessibilityDescribedby: string | undefined;

  /** This will be forwarded as aria-labelledby to the relevant nested element. */
  accessibilityLabelledby: string | undefined;
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
    'aria-labelledby': accessibilityProps?.accessibilityLabelledby
      ? accessibilityProps.accessibilityLabelledby
      : undefined,
    'aria-describedby': accessibilityProps?.accessibilityDescribedby
      ? accessibilityProps.accessibilityDescribedby
      : undefined,
  };
}

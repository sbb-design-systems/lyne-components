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

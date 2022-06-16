import { AnimationBuilder } from '../../global/core/components/animations/animation-interface';

export interface InterfaceLyneToastAttributes {
  ariaLivePoliteness: 'off' | 'assertive' | 'polite';
  horizontalPosition: 'left' | 'center' | 'right' | 'start' | 'end';
  verticalPosition: 'top' | 'bottom';
}

export type InterfaceToastType = 'link' | 'action' | 'icon';

/**
 * Common interface for toast action.
 */
export interface InterfaceToastCommonAction {

  /** Used for discriminating union. */
  type: InterfaceToastType;

  /** Emitted when action is executed. */
  role: 'cancel' | string;

  /** Users CSS classes added to the action item. */
  cssClass?: string | string[];
}

/**
 * Interface for toast's link.
 */
export interface InterfaceToastLink extends InterfaceToastCommonAction {
  type: 'link';

  /** Anchor tag label. */
  label: string;

  /**
   * Link reference. NOTE:
   * - it will be opened in a new window;
   * - toast wil be closed on click.
   */
  href: string;
}

/**
 * Interface for toast's action.
 */
export interface InterfaceToastAction extends InterfaceToastCommonAction {
  type: 'action';

  /** Action button label. */
  label: string;

  /**
   * Action button callback; it will be executed on click
   * (toast will be closed right after).
   */
  handler: () => void;
}

/**
 * Interface for toast's close icon.
 */
export interface InterfaceToastIcon extends InterfaceToastCommonAction {
  type: 'icon';

  /** Default value for close icon. */
  role: 'cancel';
}

/**
 * Interface for toast's configuration.
 */
export interface InterfaceToastConfiguration {

  /** Message to display */
  message: string;

  /** Hide the toast after defined time (in milliseconds). */
  timeout?: number;

  /** SVG string or reference to a SVG element for icon. */
  icon?: string | HTMLElement;

  /** Id of <template> to use for the icon. */
  iconTemplate?: string;

  /** Action configuration. */
  action?: InterfaceToastLink | InterfaceToastAction | InterfaceToastIcon;

  /** Where the toast should be displayed vertically. */
  verticalPosition?: InterfaceLyneToastAttributes['verticalPosition'];

  /** Where the toast should be displayed horizontally. */
  horizontalPosition?: InterfaceLyneToastAttributes['horizontalPosition'];

  /** Value for aria-live attribute. */
  ariaLivePoliteness?: InterfaceLyneToastAttributes['ariaLivePoliteness'];
}

export interface InterfaceToastConfigurationController {
  config: InterfaceToastConfiguration;
  id?: string;
  animated?: boolean;
  keyboardClose?: boolean;
  enterAnimation?: AnimationBuilder;
  leaveAnimation?: AnimationBuilder;
}

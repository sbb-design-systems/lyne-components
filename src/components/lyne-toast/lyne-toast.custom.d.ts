import { AnimationBuilder } from '../../global/core/components/animations/animation-interface';

export interface InterfaceLyneToastAttributes {
  verticalPosition: 'top' | 'bottom';
  horizontalPosition: 'left' | 'center' | 'right' | 'start' | 'end';
  politeness: 'off' | 'assertive' | 'polite';
}

type InterfaceToastType = 'link' | 'action' | 'icon';

/**
 * Common interface for toast action.
 */
interface InterfaceToastCommonAction {
  type: InterfaceToastType;
  role: 'cancel' | string;
  cssClass?: string | string[];
}

/**
 * Interface for toast's link.
 */
export interface InterfaceToastLink extends InterfaceToastCommonAction {
  type: 'link';
  label: string;
  href: string;
}

/**
 * Interface for toast's action.
 */
export interface InterfaceToastAction extends InterfaceToastCommonAction {
  type: 'action';
  label: string;
  handler: () => void;
}

/**
 * Interface for toast's close icon.
 */
export interface InterfaceToastIcon extends InterfaceToastCommonAction {
  type: 'icon';
  role: 'cancel';
}

/**
 * Interface for toast's configuration:
 * - "message": Message to display.
 * - "timeout": Hide the toast after defined time (in milliseconds).
 * - "icon": SVG string or reference to a SVG element for icon.
 * - "iconTemplate": Id of <template> to use for the icon.
 * - "action": Action configuration.
 * - "verticalPosition": Where the toast should be displayed vertically.
 * - "horizontalPosition": Where the toast should be displayed horizontally.
 * - "politeness": Value for aria-live attribute.
 */
export interface InterfaceToastConfiguration {
  message: string;
  timeout?: number;
  icon?: string | HTMLElement;
  iconTemplate?: string;
  action?: InterfaceToastLink | InterfaceToastAction | InterfaceToastIcon;
  verticalPosition?: InterfaceLyneToastAttributes['verticalPosition'];
  horizontalPosition?: InterfaceLyneToastAttributes['horizontalPosition'];
  politeness?: InterfaceLyneToastAttributes['politeness'];
}

export interface InterfaceToastConfigurationController {
  config: InterfaceToastConfiguration;
  id?: string;
  animated?: boolean;
  keyboardClose?: boolean;
  enterAnimation?: AnimationBuilder;
  leaveAnimation?: AnimationBuilder;
}

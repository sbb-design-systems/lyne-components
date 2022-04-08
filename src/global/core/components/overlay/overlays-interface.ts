import { EventEmitter } from '@stencil/core';
import { AnimationBuilder } from '../animations/animation-interface';

export interface InterfaceOverlayEventDetail<T = any> {
  data?: T;
  role?: string;
}

export interface InterfaceOverlay {
  el: HTMLElement;
  animated: boolean;
  keyboardClose: boolean;
  overlayIndex: number;
  presented: boolean;

  enterAnimation?: AnimationBuilder;
  leaveAnimation?: AnimationBuilder;

  didPresent: EventEmitter<void>;
  willPresent: EventEmitter<void>;
  willDismiss: EventEmitter<InterfaceOverlayEventDetail>;
  didDismiss: EventEmitter<InterfaceOverlayEventDetail>;

  present(): Promise<void>;
  dismiss(data?: any, role?: string): Promise<boolean>;
}

export interface InterfaceHTMLStencilElement extends HTMLElement {
  componentOnReady(): Promise<this>;
}

export interface InterfaceHTMLLyneOverlayElement extends InterfaceHTMLStencilElement {
  overlayIndex: number;
  backdropDismiss?: boolean;
  lastFocus?: HTMLElement;

  dismiss(data?: any, role?: string): Promise<boolean>;
}


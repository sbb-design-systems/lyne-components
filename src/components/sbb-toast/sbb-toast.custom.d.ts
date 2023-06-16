type ToastPositionVertical = 'top' | 'bottom';
type ToastPositionHorizontal = 'left' | 'start' | 'center' | 'right' | 'end';
export type ToastPosition = `${ToastPositionVertical}-${ToastPositionHorizontal}`;

export type AriaPoliteness = 'polite' | 'assertive' | 'off';

export type ToastAriaRole = 'status' | 'alert';

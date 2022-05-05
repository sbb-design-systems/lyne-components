export interface InterfaceButtonAttributes {
  variant: 'primary' | 'primary-negative' | 'secondary' | 'secondary-negative' | 'translucent' | 'translucent-negative' | 'transparent' | 'transparent-negative';
  size: 'l' | 'm';
  type: 'button' | 'reset' | 'submit';
  popup: 'true' | 'dialog' | 'menu' | 'listbox' | 'tree' | 'grid';
}

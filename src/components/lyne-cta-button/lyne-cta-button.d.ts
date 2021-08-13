export interface InterfaceButtonAttributes {
  variant: 'primary' | 'primary-negative' | 'secondary' | 'secondary-negative' | 'tertiary' | 'tertiary-negative' | 'transparent' | 'transparent-negative';
  size: 'large' | 'small';
  type: 'button' | 'reset' | 'submit';
  popup: 'true' | 'dialog' | 'menu' | 'listbox' | 'tree' | 'grid';
}

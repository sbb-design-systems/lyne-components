export interface InterfaceNotificationAttributes {
  type: 'info' | 'success' | 'warn' | 'error';
  variant: 'default' | 'transparent' | 'colorful';
  state: 'closed' | 'opening' | 'opened' | 'closing';
}

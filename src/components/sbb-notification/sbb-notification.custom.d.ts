export interface InterfaceNotificationAttributes {
  type: 'info' | 'success' | 'warn' | 'error';
  state: 'closed' | 'opening' | 'opened' | 'closing';
}

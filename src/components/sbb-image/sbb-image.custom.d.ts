export interface InterfaceImageAttributes {
  copyrightHolder?: 'Organization' | 'Person';
  decoding?: 'sync' | 'async' | 'auto';
  importance?: 'auto' | 'high' | 'low';
  loading?: 'eager' | 'lazy';
}

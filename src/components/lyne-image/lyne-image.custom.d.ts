export interface InterfaceImageAttributes {
  ariaHidden?: string;
  blurHash?: true | false;
  decoding?: 'sync' | 'async' | 'auto';
  hideFromScreenreader?: true | false;
  imageFormat?: 'auto' | 'avif';
  loading?: 'eager' | 'lazy';
  role?: string;
  width?: string;
}

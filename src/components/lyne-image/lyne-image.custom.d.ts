export interface InterfaceImageAttributes {
  ariaHidden?: string;
  aspectRatio?: '1/1' | '5/4' | '4/3' | '3/2' | '16/9' | '2/1' | '1/2' | '9/16' | '2/3' | '3/4' | '4/5' ;
  blurHash?: true | false;
  decoding?: 'sync' | 'async' | 'auto';
  hideFromScreenreader?: true | false;
  imageFormat?: 'auto' | 'avif';
  loading?: 'eager' | 'lazy';
  role?: string;
}

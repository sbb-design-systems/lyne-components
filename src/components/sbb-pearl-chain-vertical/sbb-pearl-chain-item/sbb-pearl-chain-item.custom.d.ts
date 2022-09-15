export enum LineTypeEnum {
  dotted = 'dotted',
  standard = 'standard',
  thin = 'thin',
}

export enum DotTypeEnum {
  standard = 'standard',
  thickBullet = 'thick-bullet',
  thinBullet = 'thin-bullet',
}

export enum ColorEnum {
  red = 'red',
  gray = 'gray',
  black = 'black',
}

export interface PearlChainItemAttributes {
  lineType: LineTypeEnum;
  lineColor: ColorEnum;
  dotType: DotTypeEnum;
  dotColor: ColorEnum;
  minHeight: string;
  hideDot: boolean;
  hideLine: boolean;
}

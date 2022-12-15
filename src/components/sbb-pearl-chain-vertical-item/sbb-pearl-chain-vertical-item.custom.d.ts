export type LineType = 'dotted' | 'standard' | 'thin';

export type BulletType = 'standard' | 'thick' | 'thin' | 'double' | 'crossed';

export type Color = 'red' | 'metal' | 'charcoal' | 'sky';

export type BulletSize = 'xs' | 's' | 'm' | 'l' | 'xl';

export interface PearlChainVerticalItemAttributes {
  lineType: LineType;
  lineColor: Color;
  bulletType?: BulletType;
  bulletColor: Color;
  minHeight: number;
  hideLine: boolean;
  bulletSize: BulletSize;
  position?: number;
}

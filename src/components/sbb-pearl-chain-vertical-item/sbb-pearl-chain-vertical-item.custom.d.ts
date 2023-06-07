export type LineType = 'dotted' | 'standard' | 'thin';

export type BulletType = 'default' | 'past' | 'irrelevant' | 'skipped' | 'disruption';

export type LineColor = 'default' | 'past' | 'disruption' | 'walk';

export type BulletSize = 'start-end' | 'stop';

export interface PearlChainVerticalItemAttributes {
  lineType: LineType;
  lineColor: LineColor;
  bulletType?: BulletType;
  minHeight: number;
  hideLine: boolean;
  bulletSize: BulletSize;
  position?: number;
}

export type LineType = 'dotted' | 'standard' | 'thin';

export type DotType =
  | 'standard'
  | 'thick-bullet'
  | 'thin-bullet'
  | 'double-bullet'
  | 'crossed-bullet';

export type Color = 'red' | 'metal' | 'charcoal' | 'sky';

export type DotSize = 'xs' | 's' | 'm' | 'l' | 'xl';

export interface PearlChainVerticalItemAttributes {
  lineType: LineType;
  lineColor: Color;
  dotType?: DotType;
  dotColor: Color;
  minHeight: number;
  hideLine: boolean;
  dotSize: DotSize;
  position?: number;
}

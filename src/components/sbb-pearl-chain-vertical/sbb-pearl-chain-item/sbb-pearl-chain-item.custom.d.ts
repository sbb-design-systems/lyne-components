export type LineType = 'dotted' | 'standard' | 'thin';

export type DotType = 'standard' | 'thick-bullet' | 'thin-bullet';

export type Color = 'red' | 'gray' | 'black';

export interface PearlChainItemAttributes {
  lineType: LineType;
  lineColor: Color;
  dotType: DotType;
  dotColor: Color;
  minHeight: string;
  hideDot: boolean;
  hideLine: boolean;
}

export type LineType = 'dotted' | 'standard' | 'thin';

export type DotType = 'standard' | 'thick-bullet' | 'thin-bullet' | 'double-bullet';

export type Color = 'red' | 'gray' | 'black' | 'sky';

export type DotSize = 'small' | 'medium' | 'large';

export interface PearlChainItemAttributes {
  lineType: LineType;
  lineColor: Color;
  dotType?: DotType;
  dotColor: Color;
  minHeight: number;
  hideLine: boolean;
  dotSize: DotSize;
  position?: number;
}

import grid from './images/field.svg?raw';
import food0 from './images/food/0.svg?raw';
import food1 from './images/food/1.svg?raw';
import food2 from './images/food/2.svg?raw';
import food3 from './images/food/3.svg?raw';
import food4 from './images/food/4.svg?raw';
import food5 from './images/food/5.svg?raw';
import food6 from './images/food/6.svg?raw';
import food7 from './images/food/7.svg?raw';
import train0 from './images/train/0.svg?raw';
import train1 from './images/train/1.svg?raw';
import train10 from './images/train/10.svg?raw';
import train11 from './images/train/11.svg?raw';
import train12 from './images/train/12.svg?raw';
import train13 from './images/train/13.svg?raw';
import train2 from './images/train/2.svg?raw';
import train3 from './images/train/3.svg?raw';
import train4 from './images/train/4.svg?raw';
import train5 from './images/train/5.svg?raw';
import train6 from './images/train/6.svg?raw';
import train7 from './images/train/7.svg?raw';
import train8 from './images/train/8.svg?raw';
import train9 from './images/train/9.svg?raw';

const toDataUrl = (raw: string): string => `data:image/svg+xml;utf8,${encodeURIComponent(raw)}`;

/** The game board (grid) background image. */
export const gridSvgUrl: string = toDataUrl(grid);

/**
 * The 14 train sprite images, indexed the same way as the original snake.js
 * spritesheet: 0/1 straight body segments, 2..5 corner pieces, 6..9 heads,
 * 10..13 tails.
 */
export const trainSvgUrls: readonly string[] = [
  train0,
  train1,
  train2,
  train3,
  train4,
  train5,
  train6,
  train7,
  train8,
  train9,
  train10,
  train11,
  train12,
  train13,
].map(toDataUrl);

/** The 8 food sprite images. */
export const foodSvgUrls: readonly string[] = [
  food0,
  food1,
  food2,
  food3,
  food4,
  food5,
  food6,
  food7,
].map(toDataUrl);

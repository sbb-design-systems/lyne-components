import { text, withKnobs } from '@storybook/addon-knobs';
import { h } from 'jsx-dom';
import { withA11y } from '@storybook/addon-a11y';
import readme from './readme.md';

const textLabel = 'Sample Text';

export const level1 = () => <lyne-test6
  text={text(textLabel, 'Text 61')}
/>;

export const level2 = () => <lyne-test6
  text={text(textLabel, 'Text 62')}
/>;

export const level3 = () => <lyne-test6
  text={text(textLabel, 'Text 63')}
/>;

export const level4 = () => <lyne-test6
  text={text(textLabel, 'Text 64')}
/>;

export const level5 = () => <lyne-test6
  text={text(textLabel, 'Text 65')}
/>;

export const level6 = () => <lyne-test6
  text={text(textLabel, 'Text 66')}
/>;

export const level7 = () => <lyne-test6
  text={text(textLabel, 'Text 67')}
/>;

export const level8 = () => <lyne-test6
  text={text(textLabel, 'Text 68')}
/>;

export default {
  decorators: [
    withKnobs,
    withA11y
  ],
  title: 'Lyne Test 6',
  parameters: {
    chromatic: {
      viewports: [
        320,
        764,
        1201
      ]
    },
    docs: {
      extractComponentDescription: () => {
        return readme;
      }
    }
  }
};

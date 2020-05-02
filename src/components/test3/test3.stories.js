import { text, withKnobs } from '@storybook/addon-knobs';
import { h } from 'jsx-dom';
import { withA11y } from '@storybook/addon-a11y';
import readme from './readme.md';

const textLabel = 'Sample Text';

export const level1 = () => <lyne-test3
  text={text(textLabel, 'Text 31')}
/>;

export const level2 = () => <lyne-test3
  text={text(textLabel, 'Text 32')}
/>;

export const level3 = () => <lyne-test3
  text={text(textLabel, 'Text 33')}
/>;

export const level4 = () => <lyne-test3
  text={text(textLabel, 'Text 34')}
/>;

export const level5 = () => <lyne-test3
  text={text(textLabel, 'Text 35')}
/>;

export const level6 = () => <lyne-test3
  text={text(textLabel, 'Text 36')}
/>;

export const level7 = () => <lyne-test3
  text={text(textLabel, 'Text 37')}
/>;

export const level8 = () => <lyne-test3
  text={text(textLabel, 'Text 38')}
/>;

export default {
  decorators: [
    withKnobs,
    withA11y
  ],
  title: 'Lyne Test 3',
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

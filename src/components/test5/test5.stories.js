import { text, withKnobs } from '@storybook/addon-knobs';
import { h } from 'jsx-dom';
import { withA11y } from '@storybook/addon-a11y';
import readme from './readme.md';

const textLabel = 'Sample Text';

export const level1 = () => <lyne-test5
  text={text(textLabel, 'Text 51')}
/>;

export const level2 = () => <lyne-test5
  text={text(textLabel, 'Text 52')}
/>;

export const level3 = () => <lyne-test5
  text={text(textLabel, 'Text 53')}
/>;

export const level4 = () => <lyne-test5
  text={text(textLabel, 'Text 54')}
/>;

export const level5 = () => <lyne-test5
  text={text(textLabel, 'Text 55')}
/>;

export const level6 = () => <lyne-test5
  text={text(textLabel, 'Text 56')}
/>;

export const level7 = () => <lyne-test5
  text={text(textLabel, 'Text 57')}
/>;

export const level8 = () => <lyne-test5
  text={text(textLabel, 'Text 58')}
/>;

export default {
  decorators: [
    withKnobs,
    withA11y
  ],
  title: 'Lyne Test 5',
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

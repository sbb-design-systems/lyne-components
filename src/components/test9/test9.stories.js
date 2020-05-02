import { text, withKnobs } from '@storybook/addon-knobs';
import { h } from 'jsx-dom';
import { withA11y } from '@storybook/addon-a11y';
import readme from './readme.md';

const textLabel = 'Sample Text';

export const level1 = () => <lyne-test9
  text={text(textLabel, 'Text 91')}
/>;

export const level2 = () => <lyne-test9
  text={text(textLabel, 'Text 92')}
/>;

export const level3 = () => <lyne-test9
  text={text(textLabel, 'Text 93')}
/>;

export const level4 = () => <lyne-test9
  text={text(textLabel, 'Text 94')}
/>;

export const level5 = () => <lyne-test9
  text={text(textLabel, 'Text 95')}
/>;

export const level6 = () => <lyne-test9
  text={text(textLabel, 'Text 96')}
/>;

export const level7 = () => <lyne-test9
  text={text(textLabel, 'Text 97')}
/>;

export const level8 = () => <lyne-test9
  text={text(textLabel, 'Text 98')}
/>;

export default {
  decorators: [
    withKnobs,
    withA11y
  ],
  title: 'Lyne Test 9',
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

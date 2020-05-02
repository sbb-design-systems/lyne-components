import { text, withKnobs } from '@storybook/addon-knobs';
import { h } from 'jsx-dom';
import { withA11y } from '@storybook/addon-a11y';
import readme from './readme.md';

const textLabel = 'Sample Text';

export const level1 = () => <lyne-test10
  text={text(textLabel, 'Text 101')}
/>;

export const level2 = () => <lyne-test10
  text={text(textLabel, 'Text 102')}
/>;

export const level3 = () => <lyne-test10
  text={text(textLabel, 'Text 103')}
/>;

export const level4 = () => <lyne-test10
  text={text(textLabel, 'Text 104')}
/>;

export const level5 = () => <lyne-test10
  text={text(textLabel, 'Text 105')}
/>;

export const level6 = () => <lyne-test10
  text={text(textLabel, 'Text 106')}
/>;

export const level7 = () => <lyne-test10
  text={text(textLabel, 'Text 107')}
/>;

export const level8 = () => <lyne-test10
  text={text(textLabel, 'Text 108')}
/>;

export default {
  decorators: [
    withKnobs,
    withA11y
  ],
  title: 'Lyne Test 10',
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

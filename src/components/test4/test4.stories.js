import { text, withKnobs } from '@storybook/addon-knobs';
import { h } from 'jsx-dom';
import { withA11y } from '@storybook/addon-a11y';
import readme from './readme.md';

const textLabel = 'Sample Text';

export const level1 = () => <lyne-test4
  text={text(textLabel, 'Text 41')}
/>;

export const level2 = () => <lyne-test4
  text={text(textLabel, 'Text 42')}
/>;

export const level3 = () => <lyne-test4
  text={text(textLabel, 'Text 43')}
/>;

export const level4 = () => <lyne-test4
  text={text(textLabel, 'Text 44')}
/>;

export const level5 = () => <lyne-test4
  text={text(textLabel, 'Text 45')}
/>;

export const level6 = () => <lyne-test4
  text={text(textLabel, 'Text 46')}
/>;

export const level7 = () => <lyne-test4
  text={text(textLabel, 'Text 47')}
/>;

export const level8 = () => <lyne-test4
  text={text(textLabel, 'Text 48')}
/>;

export default {
  decorators: [
    withKnobs,
    withA11y
  ],
  title: 'Lyne Test 4',
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

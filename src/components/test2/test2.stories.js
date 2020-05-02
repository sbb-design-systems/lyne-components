import { text, withKnobs } from '@storybook/addon-knobs';
import { h } from 'jsx-dom';
import { withA11y } from '@storybook/addon-a11y';
import readme from './readme.md';

const textLabel = 'Sample Text';

export const level1 = () => <lyne-test2
  text={text(textLabel, 'Text 21')}
/>;

export const level2 = () => <lyne-test2
  text={text(textLabel, 'Text 22')}
/>;

export const level3 = () => <lyne-test2
  text={text(textLabel, 'Text 23')}
/>;

export const level4 = () => <lyne-test2
  text={text(textLabel, 'Text 24')}
/>;

export const level5 = () => <lyne-test2
  text={text(textLabel, 'Text 25')}
/>;

export const level6 = () => <lyne-test2
  text={text(textLabel, 'Text 26')}
/>;

export const level7 = () => <lyne-test2
  text={text(textLabel, 'Text 27')}
/>;

export const level8 = () => <lyne-test2
  text={text(textLabel, 'Text 28')}
/>;

export default {
  decorators: [
    withKnobs,
    withA11y
  ],
  title: 'Lyne Test 2',
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

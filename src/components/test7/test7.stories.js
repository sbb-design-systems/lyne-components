import { text, withKnobs } from '@storybook/addon-knobs';
import { h } from 'jsx-dom';
import { withA11y } from '@storybook/addon-a11y';
import readme from './readme.md';

const textLabel = 'Sample Text';

export const level1 = () => <lyne-test7
  text={text(textLabel, 'Text 71')}
/>;

export const level2 = () => <lyne-test7
  text={text(textLabel, 'Text 72')}
/>;

export const level3 = () => <lyne-test7
  text={text(textLabel, 'Text 73')}
/>;

export const level4 = () => <lyne-test7
  text={text(textLabel, 'Text 74')}
/>;

export const level5 = () => <lyne-test7
  text={text(textLabel, 'Text 75')}
/>;

export const level6 = () => <lyne-test7
  text={text(textLabel, 'Text 76')}
/>;

export const level7 = () => <lyne-test7
  text={text(textLabel, 'Text 77')}
/>;

export const level8 = () => <lyne-test7
  text={text(textLabel, 'Text 78')}
/>;

export default {
  decorators: [
    withKnobs,
    withA11y
  ],
  title: 'Lyne Test 7',
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

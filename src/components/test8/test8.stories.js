import { text, withKnobs } from '@storybook/addon-knobs';
import { h } from 'jsx-dom';
import { withA11y } from '@storybook/addon-a11y';
import readme from './readme.md';

const textLabel = 'Sample Text';

export const level1 = () => <lyne-test8
  text={text(textLabel, 'Text 81')}
/>;

export const level2 = () => <lyne-test8
  text={text(textLabel, 'Text 82')}
/>;

export const level3 = () => <lyne-test8
  text={text(textLabel, 'Text 83')}
/>;

export const level4 = () => <lyne-test8
  text={text(textLabel, 'Text 84')}
/>;

export const level5 = () => <lyne-test8
  text={text(textLabel, 'Text 85')}
/>;

export const level6 = () => <lyne-test8
  text={text(textLabel, 'Text 86')}
/>;

export const level7 = () => <lyne-test8
  text={text(textLabel, 'Text 87')}
/>;

export const level8 = () => <lyne-test8
  text={text(textLabel, 'Text 88')}
/>;

export default {
  decorators: [
    withKnobs,
    withA11y
  ],
  title: 'Lyne Test 8',
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

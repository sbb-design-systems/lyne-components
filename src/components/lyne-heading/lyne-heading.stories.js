import { radios, text, withKnobs } from '@storybook/addon-knobs';
import { h } from 'jsx-dom';
import { withA11y } from '@storybook/addon-a11y';

const textLabel = 'Title Text';
const textDefaultValue = 'Sample Title';
const levelLabel = 'Title Level';
const levelOptions = {
  'Level 1': '1',
  'Level 2': '2',
  'Level 3': '3'
};

export const level1 = () => <lyne-heading
  level={radios(levelLabel, levelOptions, '1')}
  text={text(textLabel, textDefaultValue)}
/>;

export const level2 = () => <lyne-heading
  level={radios(levelLabel, levelOptions, '2')}
  text={text(textLabel, textDefaultValue)}
/>;

export const level3 = () => <lyne-heading
  level={radios(levelLabel, levelOptions, '3')}
  text={text(textLabel, textDefaultValue)}
/>;

export default {
  decorators: [
    withKnobs,
    withA11y
  ],
  title: 'Heading'
};

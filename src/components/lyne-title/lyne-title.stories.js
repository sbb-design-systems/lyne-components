import { storiesOf } from '@storybook/html';
import { withKnobs, text, radios } from '@storybook/addon-knobs';
import { h } from 'jsx-dom';
import { withA11y } from '@storybook/addon-a11y';
import readme from './readme.md';

const groupId = 'General'
const textLabel = 'Title Text';
const textDefaultValue = 'Sample Title';
const levelLabel = 'Title Level';
const levelOptions = {
  'Level 1': '1',
  'Level 2': '2',
  'Level 3': '3'
};

storiesOf('lyne-title', module)
  .addDecorator(withKnobs)
  .addDecorator(withA11y)
  .add(
    'Default Level 1',
    () => {

      const textValue = text(textLabel, textDefaultValue, groupId);
      const levelValue = radios(levelLabel, levelOptions, '1', groupId);

      return (
        <lyne-title
          text={textValue}
          level={levelValue}
        ></lyne-title>
      );

    },
    {
      notes: {
        markdown: readme
      }
    }
  )
  .add(
    'Level 2',
    () => {

      const textValue = text(textLabel, textDefaultValue, groupId);
      const levelValue = radios(levelLabel, levelOptions, '2', groupId);

      return (
        <lyne-title
          text={textValue}
          level={levelValue}
        ></lyne-title>
      );

    },
    {
      notes: {
        markdown: readme
      }
    }
  )
  .add(
    'Level 3',
    () => {

      const textValue = text(textLabel, textDefaultValue, groupId);
      const levelValue = radios(levelLabel, levelOptions, '3', groupId);

      return (
        <lyne-title
          text={textValue}
          level={levelValue}
        ></lyne-title>
      );

    },
    {
      notes: {
        markdown: readme
      }
    }
  );

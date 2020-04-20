import { storiesOf } from '@storybook/html';
import { withKnobs, text, radios } from '@storybook/addon-knobs';
import { h } from 'jsx-dom';
import { withA11y } from '@storybook/addon-a11y';
import readme from './readme.md';

storiesOf('lyne-title', module)
  .addDecorator(withKnobs)
  .addDecorator(withA11y)
  .add(
    'Default',
    () => {

      const groupId = 'General'

      const textLabel = 'Title Text';
      const textDefaultValue = 'Sample Title';
      const textValue = text(textLabel, textDefaultValue, groupId);

      const levelLabel = 'Title Level';
      const levelOptions = {
        'Level 1': '1',
        'Level 2': '2',
        'Level 3': '3'
      };
      const levelDefaultValue = '1';
      const levelValue = radios(levelLabel, levelOptions, levelDefaultValue, groupId);

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

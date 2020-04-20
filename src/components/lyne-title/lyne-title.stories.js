import { storiesOf } from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';
import { h } from 'jsx-dom';
import { withA11y } from '@storybook/addon-a11y';
import readme from './readme.md';

storiesOf('lyne-cta-button', module)
  .addDecorator(withKnobs)
  .addDecorator(withA11y)
  .add(
    'Default',
    () => {

      const textProp = text('text', 'Title Text');

      return (
        <lyne-title
          text={textProp}
        ></lyne-title>
      );

    },
    {
      notes: {
        markdown: readme
      }
    }
  );

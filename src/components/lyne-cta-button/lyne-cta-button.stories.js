import { storiesOf } from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';
import { withActions } from '@storybook/addon-actions';
import { h } from 'jsx-dom';
import { withA11y } from '@storybook/addon-a11y';
import events from './lyne-cta-button.events.ts';

import readme from './readme.md';

storiesOf('lyne-cta-button', module)
  .addDecorator(withActions(events.click))
  .addDecorator(withKnobs)
  .addDecorator(withA11y)
  .add(
    'Default',
    () => {

      const label = text('label', 'Label');

      return (
        <lyne-cta-button
          label={label}
        ></lyne-cta-button>
      );

    },
    {
      notes: {
        markdown: readme,
      },
    }
  );

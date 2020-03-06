import { storiesOf } from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';
import { withActions } from '@storybook/addon-actions';
import { h } from 'jsx-dom';

import readme from './readme.md';

storiesOf('lyne-cta-button', module)
  .addDecorator(withActions('onClick'))
  .addDecorator(withKnobs)
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

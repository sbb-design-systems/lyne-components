import { storiesOf } from '@storybook/html';

import readme from './readme.md';

storiesOf('My Component', module).add(
  'Default',
  () => '<my-component sampleProperty="Prop overwritten"></my-component>',
  {
    notes: {
      markdown: readme,
    },
  }
);

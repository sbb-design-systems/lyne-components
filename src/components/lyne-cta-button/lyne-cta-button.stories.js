import { withKnobs, text } from '@storybook/addon-knobs';
import { withActions, action } from '@storybook/addon-actions';
import { h } from 'jsx-dom';
import { withA11y } from '@storybook/addon-a11y';
import events from './lyne-cta-button.events.ts';

export const defaultButton = () => <lyne-cta-button
  label={text('label', 'Label')}
  onClick={action(events.click)}
/>;

export default {
  decorators: [
    withKnobs,
    withA11y
  ],
  title: 'Button'
};

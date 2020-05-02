import { withKnobs, text } from '@storybook/addon-knobs';
import { withActions, action } from '@storybook/addon-actions';
import { h } from 'jsx-dom';
import { withA11y } from '@storybook/addon-a11y';
import events from './lyne-cta-button.events.ts';
import readme from './readme.md';

export const defaultButton = () => <lyne-cta-button
  label={text('label', 'Label')}
  onClick={action(events.click)}
/>;

export const var1 = () => <lyne-cta-button
  label={text('label', 'Label 1')}
  onClick={action(events.click)}
/>;

export const var2 = () => <lyne-cta-button
  label={text('label', 'Label 2')}
  onClick={action(events.click)}
/>;

export const var3 = () => <lyne-cta-button
  label={text('label', 'Label 3')}
  onClick={action(events.click)}
/>;

export const var4 = () => <lyne-cta-button
  label={text('label', 'Label 4')}
  onClick={action(events.click)}
/>;

export const var5 = () => <lyne-cta-button
  label={text('label', 'Label 5')}
  onClick={action(events.click)}
/>;

export const var6 = () => <lyne-cta-button
  label={text('label', 'Label 6')}
  onClick={action(events.click)}
/>;

export const var7 = () => <lyne-cta-button
  label={text('label', 'Label 7')}
  onClick={action(events.click)}
/>;

export default {
  decorators: [
    withKnobs,
    withA11y
  ],
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
  },
  title: 'Button'
};

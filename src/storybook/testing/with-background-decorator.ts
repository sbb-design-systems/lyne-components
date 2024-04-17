import { makeDecorator } from '@storybook/preview-api';
import type { StoryContext } from '@storybook/types';
import { html } from 'lit';

export const withBackgroundDecorator = makeDecorator({
  name: 'withContextSpecificBackgroundColor',
  parameterName: 'backgroundColor',
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context, { parameters }) => {
    const backgroundColor = parameters as (context: StoryContext) => string;

    // For Chromatic we need to return html
    if (context.name === 'Chromatic Stories') {
      if (!backgroundColor) {
        return getStory(context);
      } else {
        return html`<div style="background-color: ${backgroundColor(context)}">
          ${getStory(context)}
        </div>`;
      }
    } else {
      // For standard case we manipulate the body

      const rootElement = (context.canvasElement as unknown as HTMLElement).closest<HTMLElement>(
        '.docs-story, .sb-show-main',
      )!;

      // If no background function is set, remove background color.
      if (!backgroundColor) {
        rootElement.style.removeProperty('background-color');
      } else {
        rootElement.style.backgroundColor = backgroundColor(context);
      }

      return getStory(context);
    }
  },
});

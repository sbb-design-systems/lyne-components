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
        const isChromaticStoriesMain = !(
          getStory(context) as { strings: string[] }
        ).strings[0].includes('outline');

        return !isChromaticStoriesMain
          ? html`<div style="background-color: ${backgroundColor(context)}">
              ${getStory(context)}
            </div>`
          : getStory(context);
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

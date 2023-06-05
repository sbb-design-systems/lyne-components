/* eslint-disable @typescript-eslint/naming-convention */
/** @jsx h */
import type { Args, Meta, StoryContext, StoryObj } from '@storybook/html';
import { h, JSX } from 'jsx-dom';

type StoryParameter = Record<string, StoryObj> & { __namedExportsOrder?: string[] };

export function combineStories(config: Meta, stories: StoryParameter): StoryObj['render'] {
  const unCamelCase = (string: string): string =>
    string.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3');

  const decorators = (name: string, story: StoryObj): StoryObj['decorators'] =>
    (
      [
        (Story) => (
          <div style={{ 'margin-block-end': '2rem' }}>
            <sbb-title
              level="5"
              style={{
                'margin-block-end': '1rem',
                'margin-block-start': '0',
                'text-transform': 'capitalize',
              }}
            >
              {unCamelCase(name)}
            </sbb-title>
            <div style={{ outline: '1px solid #ad00ff' }}>
              <Story />
            </div>
          </div>
        ),
      ] as StoryObj['decorators']
    )
      .concat(config.decorators || [])
      .concat(story.decorators || []);

  const reduceDecorators = (
    name: string,
    story: StoryObj,
    context: StoryContext
  ): StoryObj['render'] =>
    decorators(name, story).reduceRight(
      (prevStory, decorator) => () => decorator(prevStory as any, context),
      () => story.render(story.args, context)
    );

  // __namedExportsOrder is an additional output for a story import generated by storybook.
  const bundleTemplate = (args: Args, context: StoryContext): JSX.Element => (
    <div>
      {stories.__namedExportsOrder
        .map((name) => ({ name, story: stories[name] }))
        .filter((s) => typeof s.story.render === 'function')
        // eslint-disable-next-line no-unused-vars
        .map(({ name, story }) => reduceDecorators(name, story, context)(args, context))}
    </div>
  );

  return bundleTemplate;
}

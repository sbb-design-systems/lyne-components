import isChromatic from 'chromatic';
import { h } from 'jsx-dom';

export function combineStories(config, stories) {
  const unCamelCase = (string) =>
    string.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3');

  const decorators = (name, story) =>
    [
      (Story) => (
        <div style="margin-bottom: 2rem;">
          <sbb-title level="5" style="margin-bottom: 1rem;text-transform: capitalize;">
            {unCamelCase(name)}
          </sbb-title>
          <div style="outline: 1px solid #ad00ff;">
            <Story />
          </div>
        </div>
      ),
    ]
      .concat(config.decorators || [])
      .concat(story.decorators || []);

  const reduceDecorators = (name, story) =>
    decorators(name, story).reduceRight(
      (prevStory, decorator) => () => decorator(prevStory, story),
      () => story(story.args)
    );

  const bundleTemplate = () => (
    <div>
      {Object.entries(stories)
        .filter(([name]) => name !== 'default')
        // eslint-disable-next-line no-unused-vars
        .map(([name, story]) => reduceDecorators(name, story)())}
    </div>
  );

  return bundleTemplate.bind({});
}

export function chromaticStoryConfig(config) {
  return {
    excludeStories: isChromatic() ? [] : ['chromaticStories'],
    parameters: {
      backgrounds: {
        disable: true,
      },
      chromatic: { disableSnapshot: false },
    },
    title: `chromatic-only/${config.title}`,
  };
}

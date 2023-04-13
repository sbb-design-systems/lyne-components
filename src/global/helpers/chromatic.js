import isChromatic from 'chromatic';
import { h } from 'jsx-dom';

export function combineStories(config, stories) {
  const unCamelCase = (string) =>
    string.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3');

  const decorators = (name, story) =>
    [
      (Story) => (
        <div style="margin-block-end: 2rem;">
          <sbb-title
            level="5"
            style="margin-block-end: 1rem;margin-block-start:0;text-transform: capitalize;"
          >
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
  let additionalChromaticConfig = {};
  if (config.parameters.chromatic?.diffThreshold) {
    additionalChromaticConfig.diffThreshold = config.parameters.chromatic.diffThreshold;
  }
  if (config.parameters.chromatic?.delay) {
    additionalChromaticConfig.delay = config.parameters.chromatic.delay;
  }

  return {
    excludeStories: isChromatic() ? [] : ['chromaticStories'],
    parameters: {
      backgrounds: {
        disable: true,
      },
      chromatic: { disableSnapshot: false, ...additionalChromaticConfig },
    },
    title: `chromatic-only/${config.title}`,
  };
}

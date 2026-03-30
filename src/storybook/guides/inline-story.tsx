import React from 'react';

export const InlineStory = (props: unknown) => (
  // @ts-expect-error tsx not configured, but supported for storybook stories
  <div className="docs-story sbb-inline-story">
    {
      // @ts-expect-error tsx not configured, but supported for storybook stories
      <div {...props} className="sb-story sb-unstyled"></div>
    }
  </div>
);

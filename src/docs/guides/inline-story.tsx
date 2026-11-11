import React from 'react';

/**
 * A wrapper for simple examples which are rendered inline in mdx files (guides).
 */
export const InlineStory = (props: unknown) => (
  // @ts-expect-error tsx not configured, but supported for storybook stories
  <div className="docs-story sbb-inline-story sb-unstyled">
    {
      // @ts-expect-error tsx not configured, but supported for storybook stories
      <div {...props} className="sb-story"></div>
    }
  </div>
);

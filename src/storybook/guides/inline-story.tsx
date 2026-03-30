import React from 'react';

export const InlineStory = (props: unknown) => (
  // @ts-expect-error tsx not configured, but supported for storybook stories
  <div
    style={{
      border:
        'var(--sbb-border-width-1x) solid light-dark(var(--sbb-color-aluminium), var(--sbb-color-anthracite))',
      padding: 'var(--sbb-spacing-fixed-6x)',
      borderRadius: 'var(--sbb-border-radius-2x)',
      marginBlockEnd: 'var(--sbb-spacing-fixed-6x)',
    }}
    className="docs-story"
  >
    {
      // @ts-expect-error tsx not configured, but supported for storybook stories
      <div {...props} className="sb-story sb-unstyled"></div>
    }
  </div>
);

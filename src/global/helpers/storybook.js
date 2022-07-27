import { h } from 'jsx-dom';
import isChromatic from 'chromatic/isChromatic';

export function chromaticOutlineDecorator() {
  return (Story) => (
    <div style={{ display: 'inline-block', outline: isChromatic() ? '1px solid blue' : 'none' }}>
      <Story />
    </div>
  );
}

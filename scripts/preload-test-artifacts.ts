import { preloadFonts } from '../tools/web-test-runner/preload-fonts.ts';
import { preloadIcons } from '../tools/web-test-runner/preload-icons.ts';

await Promise.all([preloadFonts(), preloadIcons()]);

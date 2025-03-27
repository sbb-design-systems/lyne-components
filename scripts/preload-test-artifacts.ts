import { preloadFonts } from '../tools/web-test-runner/preload-fonts.js';
import { preloadIcons } from '../tools/web-test-runner/preload-icons.js';

await Promise.all([preloadFonts(), preloadIcons()]);

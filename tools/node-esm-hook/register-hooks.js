import { register } from 'node:module';

register('./sass-hook.js', import.meta.url);
register('./typescript-hook.js', import.meta.url);

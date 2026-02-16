import { register } from 'node:module';

register('./raw-hook.ts', import.meta.url);
register('./sass-hook.ts', import.meta.url);
register('./typescript-hook.ts', import.meta.url);

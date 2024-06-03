// @ts-check

/**
 * This hook resolves import paths that start with `@sbb-esta/lyne-` to redirect to the dist
 * directory. This allows our entry point verification step in our vite builds to import
 * the code directly, even though the files contain imports to `@sbb-esta/lyne-` that would
 * not normally resolve and crash.
 */

const dist = new URL('../../dist/', import.meta.url).href;

/**
 * @param {string} specifier - The specifier of the resource to resolve.
 * @param {object} context - The context in which the resolve function is called.
 * @param {function} nextResolve - The function to call if nothing is done.
 * @returns {Promise} - A Promise that resolves with an object containing the format, shortCircuit flag, and url of the resource,
 * or rejects with an error.
 */
export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('@sbb-esta/lyne-') && context.parentURL?.startsWith(dist)) {
    const aliasUrl = new URL(specifier.replace(/^@sbb-esta\/lyne-/, './'), dist).href;
    return { format: 'module', shortCircuit: true, url: aliasUrl };
  }
  return nextResolve(specifier, context);
}

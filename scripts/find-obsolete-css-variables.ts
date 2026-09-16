import { globSync, readFileSync } from 'node:fs';

/**
 * CSS Variable Audit Script
 *
 * Scans source files (SCSS, TS, SVG) and external design token packages to audit
 * CSS custom property declarations, API documentation, and usage across the project.
 *
 * Recognized definition sources:
 * - Standard CSS declarations (`--name: value`), JS style objects, and `styleMap` keys
 * - Browser registrations via `@property` and programmatic calls via `setProperty()`
 * - Documented public or protected APIs marked with `@cssprop`, `@cssproperty`, or `@protected` (in scss files)
 * - Dynamically constructed variable name prefixes (e.g., `#{$state}` or `${id}`)
 *
 * Reports generated:
 * 1. Obsolete CSS variables: Defined in `src`, but never referenced anywhere.
 * 2. Undefined CSS variables (without fallback): Used via `var()` without a fallback and missing a definition (potential bugs/typos).
 * 3. Undefined CSS variables (with fallback only): Used via `var()` exclusively with fallbacks (intended for consumer configuration).
 */

/** Files of this repository that can define and/or reference CSS variables. */
const sourceGlob = 'src/**/*.{scss,ts,svg}';

/**
 * External sources that define CSS variables. Without these, the few hundred
 * design token variables (`--sbb-color-*`, `--sbb-spacing-*`, ...) would all be
 * reported as undefined.
 */
const externalDefinitionGlobs = ['node_modules/@sbb-esta/lyne-design-tokens/dist/scss/*.scss'];

/* -------------------------------------------------------------------------- *
 * Patterns
 * -------------------------------------------------------------------------- */

/**
 * Any CSS variable token. Matching the whole name avoids the prefix problem, where
 * `--sbb-foo` would also match inside `--sbb-foo-bar`. The lookbehind makes sure the
 * `--` actually starts a variable, so that BEM modifiers such as
 * `.sbb-pearl-chain__leg--cancelled` are not mistaken for one.
 */
const variableToken = /(?<![\w-])--[a-zA-Z0-9_-]+/g;

/** `@property --name { ... }` registers a variable as well. */
const atPropertyRegex = /@property\s+(--[a-zA-Z0-9_-]+)/g;

/** JSDoc `@cssprop` or `@cssproperty` annotations (e.g., `@cssprop [--name]`, `@cssprop --name`). */
const cssPropRegex = /@cssprop(?:erty)?\s+(?:\{[^}]*\}\s*)?\[?\s*(--[a-zA-Z0-9_-]+)/g;

/** Comment annotations like `// @protected --name` or `@protected [--name]`. */
const protectedRegex = /@protected\s+(?:\{[^}]*\}\s*)?\[?\s*(--[a-zA-Z0-9_-]+)/g;

/** `element.style.setProperty('--name', value)` */
const setPropertyRegex = /setProperty\(\s*['"`](--[a-zA-Z0-9_-]+)/g;

/**
 * Dynamically composed names, e.g. `--sbb-foo-#{$state}-color` in SCSS or
 * `` `--sbb-overlay-anchor-${id}` `` in TypeScript. Only the static prefix can be
 * resolved statically, so it is kept and matched by prefix later on.
 */
const dynamicNameRegex = /(--[a-zA-Z0-9_-]*)(?:#\{|\$\{)/g;

/** `var(--name)` or `var(--name, fallback)`. The second group tells them apart. */
const varUsageRegex = /var\(\s*(--[a-zA-Z0-9_-]+)\s*(,?)/g;

/**
 * Whether the text right after a variable name marks it as a definition. Besides a
 * plain `--name: value` declaration, this also covers quoted object keys as used by
 * `styleMap({ '--name': value })` and inline style objects.
 */
const isDefinitionSuffix = (rest: string): boolean => /^['"`]?\s*:/.test(rest);

/* -------------------------------------------------------------------------- *
 * Collecting
 * -------------------------------------------------------------------------- */

/** Variables defined somewhere, either in this repository or externally. */
const definitions = new Set<string>();
/** Static prefixes of dynamically composed variable names. */
const dynamicPrefixes = new Set<string>();
/** Variables defined within `src`, which are the candidates for being obsolete. */
const ownDefinitions = new Set<string>();
/** Any reference to a variable that is not its own definition. */
const references = new Set<string>();
/** Variables referenced through `var()`, mapped to the files referencing them. */
const varReferences = new Map<string, Set<string>>();
/** Variables referenced through `var()` at least once without a fallback value. */
const referencedWithoutFallback = new Set<string>();

/**
 * Collects the definitions of a file. A variable counts as defined when it is
 * followed by a colon (declaration, `styleMap` key, inline style string, ...),
 * registered via `@property`, documented via `@cssprop`/`@protected`, or written through `setProperty()`.
 */
function collectDefinitions(content: string, isOwnSource: boolean): void {
  const add = (name: string): void => {
    definitions.add(name);
    if (isOwnSource) {
      ownDefinitions.add(name);
    }
  };

  for (const match of content.matchAll(variableToken)) {
    if (isDefinitionSuffix(content.slice(match.index + match[0].length))) {
      add(match[0]);
    }
  }

  for (const match of content.matchAll(atPropertyRegex)) {
    add(match[1]);
  }

  for (const match of content.matchAll(cssPropRegex)) {
    add(match[1]);
  }

  for (const match of content.matchAll(protectedRegex)) {
    add(match[1]);
  }

  for (const match of content.matchAll(setPropertyRegex)) {
    add(match[1]);
  }

  for (const match of content.matchAll(dynamicNameRegex)) {
    // Ignores interpolations in the value instead of the name, e.g. `--foo: #{$bar}`.
    if (match[1].length > 2) {
      dynamicPrefixes.add(match[1]);
    }
  }
}

/** Collects every reference, and separately the `var()` references. */
function collectReferences(content: string, file: string): void {
  for (const match of content.matchAll(variableToken)) {
    if (!isDefinitionSuffix(content.slice(match.index + match[0].length))) {
      references.add(match[0]);
    }
  }

  for (const [, name, comma] of content.matchAll(varUsageRegex)) {
    if (!varReferences.has(name)) {
      varReferences.set(name, new Set());
    }
    varReferences.get(name)!.add(file);
    if (!comma) {
      referencedWithoutFallback.add(name);
    }
  }
}

for (const file of externalDefinitionGlobs.flatMap((glob) => globSync(glob))) {
  collectDefinitions(readFileSync(file, 'utf8'), false);
}

for (const file of globSync(sourceGlob)) {
  const content = readFileSync(file, 'utf8');
  collectDefinitions(content, true);
  collectReferences(content, file);
}

/* -------------------------------------------------------------------------- *
 * Reporting
 * -------------------------------------------------------------------------- */

/** Whether the name is covered by a dynamically composed definition. */
const matchesDynamicDefinition = (name: string): boolean =>
  [...dynamicPrefixes].some((prefix) => name.startsWith(prefix));

const obsolete = [...ownDefinitions]
  .filter((name) => !references.has(name) && !matchesDynamicDefinition(name))
  .sort();

const undefinedVariables = [...varReferences.keys()]
  .filter((name) => !definitions.has(name) && !matchesDynamicDefinition(name))
  .sort();

// Variables used without a fallback have to be defined somewhere, otherwise the
// whole declaration becomes invalid at computed value time.
const undefinedWithoutFallback = undefinedVariables.filter((name) =>
  referencedWithoutFallback.has(name),
);
// Variables only ever used with a fallback are usually part of the public API,
// meant to be set by the consumer (e.g. `--sbb-disable-animation-duration`).
const undefinedWithFallbackOnly = undefinedVariables.filter(
  (name) => !referencedWithoutFallback.has(name),
);

function print(title: string, description: string, names: string[]): void {
  console.log(`\n${title} (${names.length})`);
  console.log(`${description}\n`);
  if (!names.length) {
    console.log('  -');
    return;
  }
  for (const name of names) {
    const files = varReferences.get(name);
    console.log(`  ${name}${files ? ` (e.g. ${[...files][0]})` : ''}`);
  }
}

print('Obsolete CSS variables', 'Defined in src, but never referenced anywhere.', obsolete);

print(
  'Undefined CSS variables, used without a fallback',
  'Used via var() but never defined. These most likely are bugs or typos.',
  undefinedWithoutFallback,
);

print(
  'Undefined CSS variables, used with a fallback only',
  'Used via var() with a fallback but never defined. Usually intentional, as these\n' +
    'are meant to be set by the consumer. Still worth checking for typos.',
  undefinedWithFallbackOnly,
);

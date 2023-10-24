/**
 * Docs: https://github.com/open-wc/custom-elements-manifest/tree/master/packages/to-markdown
 */
import fs from 'fs';
import { customElementsManifestToMarkdown } from '@custom-elements-manifest/to-markdown';
import MagicString from 'magic-string';

const manifestFilePath = './dist/custom-elements.json';
const tempFolderPath = './dist/docs';
const componentsFolder = './src/components';

// List of components for which the 'toKebabCase' naming convention is not followed
const componentNameMapping: { [key: string]: string } = {
  SbbOptGroup: 'sbb-optgroup',
};

function toKebabCase(value: string): string {
  return value
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

function updateComponentReadme(name: string, docs: string): void {
  const compFolder = componentNameMapping[name] ?? toKebabCase(name);
  const path = `${componentsFolder}/${compFolder}/readme.md`;
  if (!fs.existsSync(path)) {
    console.error(`Component ${name} has no readme file, please create it following the template`);
  }
  const newReadme = new MagicString(fs.readFileSync(path, 'utf8'));
  const newDocs = new MagicString(docs);

  // Change the generated doc here
  newDocs.prepend('<!-- Auto Generated Below --> \n \n');

  // Remove the title
  newDocs.replace(/^# class: `.*`\n/m, '');

  newDocs.replace(/## Fields/, '## Properties');

  // Remove the details section
  const detailsSectionStart = newDocs.original.match(/<details>/)?.index;
  newDocs.remove(detailsSectionStart!, newDocs.original.length);

  // Replace the generated doc in the readme
  const generatedStartIndex =
    newReadme.original.match('<!-- Auto Generated Below -->')?.index ?? newReadme.original.length;
  newReadme.update(generatedStartIndex, newReadme.length(), newDocs.toString());
  fs.writeFileSync(path, newReadme.toString());
}

const manifest = JSON.parse(fs.readFileSync(manifestFilePath, 'utf-8'));
const markdown: string = customElementsManifestToMarkdown(manifest, {
  headingOffset: -1,
  private: 'details',
  omitDeclarations: ['exports'],
  omitSections: ['super-class', 'css-properties', 'css-parts', 'main-heading', 'static-fields'],
});

if (!fs.existsSync(tempFolderPath)) {
  fs.mkdirSync(tempFolderPath, { recursive: true });
}
fs.writeFileSync(`${tempFolderPath}/components.md`, markdown);

// Split the generated file into the single readme of each component
const matches = Array.from(markdown.matchAll(/^# class: `(.*)`$/gm));

for (let i = 0; i < matches.length; i++) {
  const startIndex = matches[i].index!;
  const endIndex = matches[i + 1]?.index ?? markdown.length;
  const compName = matches[i][1];

  updateComponentReadme(compName, markdown.substring(startIndex, endIndex));
}
console.log('Docs generated successufly');

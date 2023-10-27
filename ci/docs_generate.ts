/**
 * Docs: https://github.com/open-wc/custom-elements-manifest/tree/master/packages/to-markdown
 */
import fs from 'fs';
import { customElementsManifestToMarkdown } from '@custom-elements-manifest/to-markdown';
import MagicString from 'magic-string';

const manifestFilePath = './dist/custom-elements.json';
const tempFolderPath = './dist/docs';
const componentsFolder = './src/components';
const inheritedFromColumnIndex = 6;
const attributeColumnIndex = 2;

// List of components for which the 'toKebabCase' naming convention is not followed
const componentsNameMapping: { [key: string]: string } = {
  SbbOptGroup: 'sbb-optgroup',
};

function toKebabCase(value: string): string {
  return value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Add the 'attribute' column.
 * Removes the 'Inherited from' column.
 * Replace 'Fields' title with 'Properties'
 */
function updateFieldsTable(newDocs: MagicString, sections: RegExpMatchArray[]): void {
  const fieldsSectionIndex = sections.findIndex((sect) => sect.groups!.name === 'Fields');
  const startIndex = sections[fieldsSectionIndex]?.index;
  const endIndex = sections[fieldsSectionIndex + 1]?.index;
  if (fieldsSectionIndex === -1) {
    return;
  }

  // Create a matrix 'table[row][column]' structure for the fields table
  const fieldsSection = newDocs.original.substring(startIndex!, endIndex);
  const tableRows = Array.from(fieldsSection.matchAll(/^\|.*\|$/gm))
    .map((match) => match[0])
    .map((row) => row.split(/(?<!\\)\|/g)); // Split by not escaped '|'

  // Remove the 'Inherited from' column
  tableRows.forEach((row) => row.splice(inheritedFromColumnIndex, 1));

  // Add the 'attribute' column
  for (let i = 0; i < tableRows.length; i++) {
    let attributeColumn: string;
    if (i === 0) {
      attributeColumn = tableRows[0][1].replace('Name', 'Attribute');
    } else {
      attributeColumn = toKebabCase(tableRows[i][1]);
    }
    tableRows[i].splice(attributeColumnIndex, 0, attributeColumn);
  }

  const fieldsTable = tableRows.map((cols) => cols.join('|')).join('\n');
  newDocs.update(
    startIndex!,
    endIndex ?? newDocs.original.length,
    `## Properties \n\n${fieldsTable}\n\n`,
  );
}

function updateComponentReadme(name: string, docs: string): void {
  const compFolder = componentsNameMapping[name] ?? toKebabCase(name);
  const path = `${componentsFolder}/${compFolder}/readme.md`;
  if (!fs.existsSync(path)) {
    console.error(`Component ${name} has no readme file, please create it following the template`);
  }
  const newReadme = new MagicString(fs.readFileSync(path, 'utf8'));
  let newDocs = new MagicString(docs);

  // Remove the details section and commit the change
  const detailsSectionStart = newDocs.original.match(/<details>/)?.index;
  newDocs.remove(detailsSectionStart!, newDocs.original.length);
  newDocs = new MagicString(newDocs.toString());

  const sections = Array.from(newDocs.original.matchAll(/## (?<name>.+)/g));

  // Change the generated doc here
  newDocs.prepend('<!-- Auto Generated Below --> \n \n');

  // Remove the title
  newDocs.replace(/^# class: `.*`\n/m, '');

  updateFieldsTable(newDocs, sections);

  // Replace the generated doc in the readme
  const generatedStartIndex =
    newReadme.original.match('<!-- Auto Generated Below -->')?.index ?? newReadme.original.length;
  newReadme.update(generatedStartIndex, newReadme.length(), newDocs.toString());
  fs.writeFileSync(path, newReadme.toString());
}

const manifest = JSON.parse(fs.readFileSync(manifestFilePath, 'utf-8'));
const markdown: string = customElementsManifestToMarkdown(manifest, {
  headingOffset: -1, // Default heading is '###'
  private: 'details', // We use 'details' cause it's the only way to remove 'protected' members from the tables
  omitDeclarations: ['exports'],
  omitSections: ['super-class', 'css-properties', 'css-parts', 'main-heading', 'static-fields'],
});

if (!fs.existsSync(tempFolderPath)) {
  fs.mkdirSync(tempFolderPath, { recursive: true });
}
fs.writeFileSync(`${tempFolderPath}/components.md`, markdown);

// Split the generated file into the single readme of each component
const matches = Array.from(markdown.matchAll(/^# class: `(?<name>.*)`$/gm));

for (let i = 0; i < matches.length; i++) {
  const startIndex = matches[i].index!;
  const endIndex = matches[i + 1]?.index ?? markdown.length;
  const compName = matches[i].groups!.name;

  updateComponentReadme(compName, markdown.substring(startIndex, endIndex));
}
console.log('Docs generated successufly');

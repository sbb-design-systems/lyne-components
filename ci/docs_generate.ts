/**
 * Docs: https://github.com/open-wc/custom-elements-manifest/tree/master/packages/to-markdown
 */
import fs from 'fs';
import { customElementsManifestToMarkdown } from '@custom-elements-manifest/to-markdown';
// eslint-disable-next-line @typescript-eslint/naming-convention
import MagicString from 'magic-string';

const manifestFilePath = './dist/custom-elements.json';
const tempFolderPath = './dist/docs';
const componentsFolder = './src/components';
const inheritedFromColumnIndex = 6;
const propertyColumnIndex = 1;
const attributeColumnIndex = 2;

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

  // Generate the 'attribute' column by copying the property column and transform string to kebab case
  [tableRows[0][propertyColumnIndex].replace('Name', 'Attribute').trim()]
    .concat(tableRows.slice(1).map((entry) => toKebabCase(entry[propertyColumnIndex]).trim()))
    .forEach((attributeColumn, i) => tableRows[i].splice(attributeColumnIndex, 0, attributeColumn));

  const fieldsTable = tableRows.map((cols) => cols.join('|')).join('\n');
  newDocs.update(
    startIndex!,
    endIndex ?? newDocs.original.length,
    `## Properties \n\n${fieldsTable}\n\n`,
  );
}

function getTablesWithFixedSpacings(newDocs: string): string {
  const tables = Array.from(newDocs.matchAll(/## (?<name>.+)/g));

  return tables
    .map((table, index) => {
      const startIndex = table.index;
      const endIndex = tables[index + 1]?.index;

      // Create a matrix 'table[row][column]' structure for the table
      const tableRows = Array.from(newDocs.substring(startIndex!, endIndex).matchAll(/^\|.*\|$/gm))
        .map((match) => match[0])
        .map((row) => row.split(/(?<!\\)\|/g)); // Split by not escaped '|'

      // Get max chars count per column
      const maxCharsPerColumn: number[] = [];
      tableRows.forEach((row, rowIndex) =>
        row.forEach((entry, columnIndex) => {
          // We should not count the horizontal separator (row 1)
          const length = rowIndex === 1 ? 0 : entry.trim().length;
          const currentMax = maxCharsPerColumn[columnIndex] || 0;
          maxCharsPerColumn[columnIndex] = length > currentMax ? length : currentMax;
        }),
      );

      const fixedSpacings = tableRows.map((row, rowIndex) =>
        row.map((entry, columnIndex, columnArray) => {
          // First and last column should stay empty
          if (columnIndex < 1 || columnIndex + 1 >= columnArray.length) {
            return;
          }

          const padded =
            rowIndex === 1
              ? '-'.padEnd(maxCharsPerColumn[columnIndex], '-')
              : entry.trim().padEnd(maxCharsPerColumn[columnIndex]);

          return ` ${padded} `;
        }),
      );

      return (
        '## ' + table.groups!.name + '\n\n' + fixedSpacings.map((cols) => cols.join('|')).join('\n')
      );
    })
    .join('\n\n');
}

function updateComponentReadme(name: string, tag: string, docs: string): void {
  const compFolder = tag;
  const path = `${componentsFolder}/${compFolder}/readme.md`;
  if (!fs.existsSync(path)) {
    console.error(`Component ${name} has no readme file, please create it following the template`);
    return;
  }
  const newReadme = new MagicString(fs.readFileSync(path, 'utf8'));
  let newDocs = new MagicString(docs);

  // Remove the details (private API) section and commit the change
  const detailsSectionStart = newDocs.original.match(/<details>/)?.index;
  newDocs.remove(detailsSectionStart!, newDocs.original.length);
  newDocs = new MagicString(newDocs.toString());

  const sections = Array.from(newDocs.original.matchAll(/## (?<name>.+)/g));

  // Remove the title
  newDocs.replace(/^# class: `.*`\n/m, '');

  updateFieldsTable(newDocs, sections);
  newDocs = new MagicString(newDocs.toString());

  // Unescape ` in docs
  newDocs.replace(/\\`/g, '`');

  // Unescape tag openings
  newDocs.replace(/\\</g, '<');

  // Replace &#xA; with new line
  newDocs.replace(/&#xA;/g, ' ');

  newDocs = new MagicString(getTablesWithFixedSpacings(newDocs.toString()));

  // Change the generated doc here
  newDocs.prepend('<!-- Auto Generated Below --> \n \n');

  // Replace the generated doc in the readme
  const generatedStartIndex =
    newReadme.original.match('<!-- Auto Generated Below -->')?.index ?? newReadme.original.length;
  newReadme.update(generatedStartIndex, newReadme.length(), newDocs.toString());
  fs.writeFileSync(path, newReadme.toString() + '\n');
}

const manifest = JSON.parse(fs.readFileSync(manifestFilePath, 'utf-8'));
const markdown: string = customElementsManifestToMarkdown(manifest, {
  headingOffset: -1, // Default heading is '###'
  private: 'details', // We use 'details' because it's the only way to remove 'protected' members from the tables. We remove details section later.
  omitDeclarations: ['exports'],
  omitSections: [
    'super-class',
    'css-properties',
    'css-parts',
    'main-heading',
    'static-fields',
    'attributes',
  ],
});

if (!fs.existsSync(tempFolderPath)) {
  fs.mkdirSync(tempFolderPath, { recursive: true });
}
fs.writeFileSync(`${tempFolderPath}/components.md`, markdown);

// Split the generated file into the single readme of each component
const matches = Array.from(markdown.matchAll(/^# class: `(?<name>.*)`, `(?<tag>.*)`$/gm));

for (let i = 0; i < matches.length; i++) {
  const startIndex = matches[i].index!;
  const endIndex = matches[i + 1]?.index ?? markdown.length;
  const compName = matches[i].groups!.name;
  const compTag = matches[i].groups!.tag;

  const componentMarkdown = markdown.substring(startIndex, endIndex);

  // If there is a `<hr/>` it indicates corrupted data respect. mixed data over different components.
  // If we just stop before occurrence of `<hr/>` we are not including the corrupted data.
  const hrIndex = componentMarkdown.indexOf('<hr/>');
  updateComponentReadme(compName, compTag, componentMarkdown.substring(0, hrIndex));
}
console.log('Docs generated successfully');

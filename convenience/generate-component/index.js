const fs = require('fs');
const path = require('path');

const config = {
  boilerplateComponentName: 'component',
  boilerplateDirectory: 'convenience/generate-component/boilerplate',
  sourceDirectory: 'src/components',
};

const convertKebabCaseToPascalCase = (string) => {
  const capitalize = (_string) => _string.charAt(0).toUpperCase() + _string.slice(1);

  const words = string.split('-');
  const capitalized = words.map((word) => capitalize(word));

  return capitalized.join('');
};

const getBoilerplateFiles = async (_sourceFiles, _foundFiles) => {
  try {
    const sourceFiles = await fs.promises.readdir(_sourceFiles || config.boilerplateDirectory);
    const foundFiles = _foundFiles || [];

    for await (const file of sourceFiles) {
      const fromPath = path.join(_sourceFiles || config.boilerplateDirectory, file);
      const stat = await fs.promises.stat(fromPath);

      if (stat.isFile()) {
        foundFiles.push(fromPath);
      } else if (stat.isDirectory()) {
        await getBoilerplateFiles(fromPath, foundFiles);
      }
    }

    return foundFiles;
  } catch (e) {
    // Catch anything bad that happens
    console.error('There was an error iterating over the boilerplate files... ', e);

    return [];
  }
};

const createDirectories = (targetDirectory) => {
  fs.mkdirSync(targetDirectory);
};

const copyFiles = (foundFiles, componentName, targetDirectory) => {
  foundFiles.forEach((file) => {
    try {
      const fileData = fs.readFileSync(file, 'utf8');

      const fileDataWithCorrectName = fileData
        .replace(/__name__/gu, componentName)
        .replace(/__nameUpperCase__/gu, convertKebabCaseToPascalCase(componentName));

      try {
        const relativePath = path.relative(config.boilerplateDirectory, file);
        const fileName = relativePath.replace(
          `${config.boilerplateComponentName}.`,
          `${componentName}.`,
        );
        const targetPath = `${targetDirectory}/${fileName}`;

        fs.writeFileSync(targetPath, fileDataWithCorrectName);
      } catch (err) {
        console.error(err);
      }
    } catch (err) {
      console.log(`error processing boilerplate file ${file}: ${err}`);
    }
  });
};

(async () => {
  // make sure we get a component name passed as an argument
  const args = process.argv.slice(2);

  if (args.length !== 1) {
    console.log(`
Please pass a component name like so:
yarn generate my-component-name
    `);

    return;
  }

  const [componentName] = args;
  const targetDirectory = `${config.sourceDirectory}/${componentName}`;

  // make sure we have a dash in the name and the "sbb" prefix
  if (componentName.indexOf('sbb-') !== 0) {
    console.log(
      'component name must be in kebab case and must start with "sbb" prefix, eg: sbb-my-component-name',
    );

    return;
  }

  // check if a component with the passed name does not already exist
  if (fs.existsSync(targetDirectory)) {
    console.log(`A component with the name ${componentName} already exists`);

    return;
  }

  const foundFiles = await getBoilerplateFiles();

  if (foundFiles.length < 1) {
    console.log('Could not find boilerplate files');

    return;
  }

  createDirectories(targetDirectory);
  copyFiles(foundFiles, componentName, targetDirectory);
})();

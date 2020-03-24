const fs = require('fs');
const config = require('./deployments_config');

const buildDeployUrls = async (deploymentsDir) => {

  try {
    // prepare content for .html file
    const formatedResults = formatResults();

    // write .md file
    fs.mkdirSync(deploymentsDir);
    fs.writeFileSync(`./${deploymentsDir}/${config.deploymentsPageFileName}`, formatedResults);

    console.log(`-->> BUILD DEPLOY URLS: successcully created ./${deploymentsDir}/${config.deploymentsPageFileName}`);
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

const formatResults = (() => {
  const deploymentsRawFile = fs.readFileSync(`./ci/${config.deploymentsJsonName}`);
  let htmlTemplate = fs.readFileSync(`./ci/${config.deploymentsPageTemplateFileName}`).toString();
  const previewData = JSON.parse(deploymentsRawFile)[config.deploymentsJsonKeyPreview];
  const prodData = JSON.parse(deploymentsRawFile)[config.deploymentsJsonKeyProd];
  const previewHtmlList = [];
  const prodHtmlList = [];

  previewData.forEach((item) => {
    const date = formatDate(item[config.deploymentsJsonKeyDate]);
    previewHtmlList.push(`
      <li>
        <p>Branch: ${item[config.deploymentsJsonKeyTag]}</p>
        <p>${date}</p>
        <p><a href="${item[config.deploymentsJsonKeyUrl]}">View</a></p>
      </li>
    `);
  });

  prodData.forEach((item) => {
    const date = formatDate(item[config.deploymentsJsonKeyDate]);
    prodHtmlList.push(`
      <li>
        <p>${item[config.deploymentsJsonKeyTag]}</p>
        <p>${date}</p>
        <p><a href="${item[config.deploymentsJsonKeyUrl]}">View</a></p>
      </li>
    `);
  });

  const previewHtml = previewHtmlList.join('');
  const prodHtml = prodHtmlList.join('');
  htmlTemplate = htmlTemplate.replace(config.deploymentsPagePlaceholderPreview, previewHtml);
  htmlTemplate = htmlTemplate.replace(config.deploymentsPagePlaceholderProduction, prodHtml);

  return htmlTemplate;
});

const formatDate = ((dateString) => {
  const dateObject = new Date(dateString);
  const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  const formattedDate = dateObject.toLocaleDateString('en-US', dateOptions);

  return formattedDate;
});

module.exports = buildDeployUrls;

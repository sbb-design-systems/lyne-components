import lyneIcons from 'lyne-icons/dist/icons.json';

const getMarkupForSvg = (svgName: string): any => {
  if (!svgName) {
    return '';
  }

  const icon = lyneIcons.icons[svgName];
  const frag = document.createRange().createContextualFragment(icon);

  return frag.firstChild;
};

export default getMarkupForSvg;

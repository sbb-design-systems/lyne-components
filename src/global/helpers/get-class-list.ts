export type CssClassMap = { [className: string]: boolean };

export const getClassList = (classes: string | string[]): string[] => {
  if (classes !== undefined) {
    const array = Array.isArray(classes)
      ? classes
      : classes.split(' ');

    return array
      .map((c: string) => c.trim())
      .filter((c: string) => c !== '');
  }

  return [];
};


export const convertToKebabCase = (string: string) => {
  return string.toLowerCase().replace(/[\s_]+/g, "-");
};

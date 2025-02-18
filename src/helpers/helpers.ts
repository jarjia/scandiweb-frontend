export const convertToKebabCase = (string: string) => {
  console.log(string);

  return string.toLowerCase().replace(/[\s_]+/g, "-");
};

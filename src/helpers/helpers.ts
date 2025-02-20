// converts string to kebab case and lowers it
export const convertToKebabCase = (string: string) => {
  return string.toLowerCase().replace(/[\s_]+/g, "-");
};

// Class builder: helps with conditional statements in JSX
export const clsx = (...classes: string[]) => classes.filter(Boolean).join(" ");

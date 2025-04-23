export const formatCssVariableName = (name: string) => {
  return name.replace(/([A-Z])/g, '-$1').toLowerCase();
};

export const formatString = str => {
  const words = str.replace(/([a-z])([A-Z])/g, '$1 $2').split('_');
  const formatted = words.map(
    word => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return formatted.join(' ');
};

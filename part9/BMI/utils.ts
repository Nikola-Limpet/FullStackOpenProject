export const isNotNumber = (argument: any): boolean => {
  return isNaN(Number(argument));
}

export default "This is the default"


// if (isNaN(target) || data.some(isNaN)) {
//   console.log('All inputs should be numbers');
//   process.exit(1);
// }
//eslint-disable-next-line
const chunkArray = (arr: any[], size: number) => {
  //eslint-disable-next-line
  const result: any[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

export default chunkArray;

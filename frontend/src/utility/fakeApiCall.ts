export const fakeApiCall = async (time?: number) => {
  return new Promise((res) => setTimeout(res, time ? time : 1000));
};

export const generateRandomString = () => {
  const timestamp = new Date().getTime();
  const randomPart = Math.random().toString(36).substring(2, 8);
  const randomString = `${timestamp}_${randomPart}`;
  return randomString;
};

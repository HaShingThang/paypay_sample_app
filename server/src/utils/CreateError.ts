export const createError = (status: number, message: string) => {
  let err: any = new Error();
  err.status = status;
  err.message = message;
  return err;
};

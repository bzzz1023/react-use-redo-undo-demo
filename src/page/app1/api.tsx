import { v4 as uuidv4 } from "uuid";

export const add = (obj: any) => {
  return new Promise((res) => {
    const id = uuidv4();
    setTimeout(() => {
      res({
        code: window.apiStatus ? 200 : 400,
        data: {
          ...obj,
          id,
        },
      });
    }, 200);
  });
};

export const updateOrDelete = (id: string) => {
  return new Promise((res) => {
    setTimeout(() => {
      res({
        code: window.apiStatus ? 200 : 400,
      });
    }, 200);
  });
};

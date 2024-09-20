//  devounce function
export const SantraDebounce = (funct: Function, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: Array<any>) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      funct(args);
    }, delay);
  };
};

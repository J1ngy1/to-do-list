export const timingEnhancer =
  (createStore) =>
  (...args) => {
    const store = createStore(...args);

    const rawDispatch = store.dispatch;
    store.dispatch = (action) => {
      const start = performance.now();
      const result = rawDispatch(action);
      const end = performance.now();
      console.log(`${action.type} took ${(end - start).toFixed(2)}ms`);
      return result;
    };

    return store;
  };

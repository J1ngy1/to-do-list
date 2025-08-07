export const formatAddTitleMiddleware = () => (next) => (action) => {
  if (action.type === "ADD") {
    const now = new Date().toLocaleDateString("en-CA");
    const formatted = `Added at ${now}: ${action.payload.text}`;
    const newAction = {
      ...action,
      payload: {
        ...action.payload,
        text: formatted,
      },
    };
    return next(newAction);
  }

  return next(action);
};

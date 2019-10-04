function Request() {
  const instance = {
    on: (type, callback) => {
      if (type === 'data') {
        callback();
      }
      return instance;
    },
    pipe: callback => {
      if (typeof callback === 'function') {
        callback();
      }
      return instance;
    },
  };
  return instance;
}
Request.defaults = jest.fn();

export default Request;

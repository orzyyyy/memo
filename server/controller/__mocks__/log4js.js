module.exports = {
  getLogger: jest.fn().mockImplementation(() => ({
    level: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    trace: jest.fn(),
    error: jest.fn(),
  })),
  configure: jest.fn,
};

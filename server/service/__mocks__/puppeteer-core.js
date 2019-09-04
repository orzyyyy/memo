const mockDetail = [
  {
    detailUrl: 'https://exhentai.org/g/1476181/884c10c131/',
    postTime: 1567369380000,
    thumbnailUrl:
      'https://exhentai.org/t/60/de/60de2c9b39899a3fd7919dda44b6d7b6492cce1a-1853947-1720-2428-jpg_250.jpg',
  },
  {
    detailUrl: 'https://exhentai.org/g/1476538/29a5343264/',
    postTime: 1567369260000,
    thumbnailUrl:
      'https://exhentai.org/t/ec/02/ec024cb6219e39e5f52c63778b2a1613a2ecd643-3241123-2091-3023-jpg_250.jpg',
  },
];
const setCookie = jest.fn();
const goto = jest.fn();
const $eval = jest.fn().mockImplementation(() => '!@#$% test （——）：；');
const $$eval = jest.fn().mockImplementation(() => mockDetail);
const waitFor = jest.fn();
// this.page
const newPage = jest
  .fn()
  .mockImplementation(() => ({ setCookie, goto, $eval, $$eval, waitFor }));
const launch = jest.fn().mockImplementation(() => ({
  newPage,
}));

module.exports = { launch, goto, mockDetail };

const mockImgUrl = [
  'https://exhentai.org/t/60/de/60de2c9b39899a3fd7919dda44b6d7b6492cce1a-1853947-1720-2428-jpg_250.jpg',
  'https://exhentai.org/t/ec/02/ec024cb6219e39e5f52c63778b2a1613a2ecd643-3241123-2091-3023-jpg_250.jpg',
];
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
const $$eval = jest.fn().mockImplementation(async (_, callback) => {
  await callback([
    {
      src: '',
      href: '',
      lastChild: { innerText: '2019-04-09 23:23' },
      firstChild: { href: '' },
      childNodes: [
        { firstChild: { firstChild: { src: '' } } },
        { firstChild: { firstChild: { src: '' } } },
      ],
    },
    {
      src: '',
      href: '',
      lastChild: { innerText: '2019-04-09 23:24' },
      firstChild: { href: '' },
      childNodes: [
        { firstChild: { firstChild: { src: '' } } },
        { firstChild: { firstChild: { src: '' } } },
      ],
    },
  ]);
  return mockDetail;
});
const waitFor = jest.fn();
const close = jest.fn();
// this.page
const newPage = jest
  .fn()
  .mockImplementation(() => ({ setCookie, goto, $eval, $$eval, waitFor }));
// this.browser
const launch = jest.fn().mockImplementation(() => ({
  newPage,
  close,
}));

module.exports = { launch, goto, mockDetail, mockImgUrl };

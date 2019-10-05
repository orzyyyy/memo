import Service from '../DocumentService';
import path from 'path';
import mapping from '../../../src/assets/mapping.json';

describe('DocumentService', () => {
  let service;

  beforeEach(() => {
    service = new Service();
  });

  afterEach(() => {
    service = null;
  });

  it('updateMapping', () => {
    let result = service.updateMapping({
      id: 'b07b876e6050e333988404e268921906',
      test: undefined,
      category: 'mapping',
    });
    expect(result).toEqual(mapping);
    result = service.updateMapping(
      {
        id: 'b07b876e6050e333988404e268921906',
        test: undefined,
        category: 'mapping',
      },
      true,
    );
    expect(
      result.filter(item => item.id === 'b07b876e6050e333988404e268921906'),
    ).toEqual([]);
  });

  it('getOriginContent', () => {
    let result = service.getOriginContent(
      path.join(__dirname, '../../../src/assets/mapping.json'),
      null,
      true,
    );
    expect(result).toEqual(mapping);
    result = service.getOriginContent(
      path.join(__dirname, '../../../src/assets/mapping.json'),
      'layout',
      true,
    );
    expect(result).toBe('layout');
  });

  it('initHtmlTemplate', () => {
    const result = service.initHtmlTemplate(
      'markdown',
      '7a9a2d738fa682b6c2b1abc0471616b2',
    );
    expect(result).toBe(
      path.join(
        __dirname,
        '../../../',
        'dist/markdown/84a65e108e3721e07261e6b3c4336ff1/index.html', // id comes from ../__mocks__/fs-extra.js
      ),
    );
  });

  it('updateContent', () => {
    expect(
      service.updateContent('markdown', ['7a9a2d738fa682b6c2b1abc0471616b2']),
    ).toMatchSnapshot();
    expect(
      service.updateContent('mapping', ['7a9a2d738fa682b6c2b1abc0471616b2']),
    ).toMatchSnapshot();
  });

  it('deleteTargetDocument', () => {
    try {
      service.deleteTargetDocument(['7a9a2d738fa682b6c2b1abc0471616b2']);
    } catch (error) {
      expect(error.message).toBe(
        "7a9a2d738fa682b6c2b1abc0471616b2 doesn't exist.",
      );
    }
    try {
      service.deleteTargetDocument([
        path.join(
          process.cwd(),
          'src/assets/markdown/7a9a2d738fa682b6c2b1abc0471616b2.md',
        ),
      ]);
    } catch (error) {
      expect(error).toBe();
    }
  });
});

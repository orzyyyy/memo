import { replacePlaceholderWithParams } from '../sql';

describe('sql', () => {
  it('replacePlaceholderWithParams', () => {
    expect(
      replacePlaceholderWithParams(
        'SELECT * FROM dictionary where value = 1;',
        {},
      ),
    ).toBe('SELECT * FROM dictionary where value = 1;');

    expect(
      replacePlaceholderWithParams(
        `SELECT * FROM dictionary where
        value = 1;`,
        {},
      ),
    ).toBe(`SELECT * FROM dictionary where
        value = 1;`);

    expect(
      replacePlaceholderWithParams(
        'SELECT * FROM dictionary where value = @value;',
        { value: 33 },
      ),
    ).toBe('SELECT * FROM dictionary where value = 33;');

    expect(
      replacePlaceholderWithParams(
        'SELECT * FROM dictionary where value = @value;',
        { value: 'test' },
      ),
    ).toBe('SELECT * FROM dictionary where value = \'test\';');

    expect(
      replacePlaceholderWithParams(
        'SELECT * FROM dictionary where value = @value and id = @id;',
        { value: 33 },
      ),
    ).toBe('SELECT * FROM dictionary where value = 33 and id = @id;');

    expect(
      replacePlaceholderWithParams(
        'SELECT * FROM dictionary where value = @value and id = @id;',
        { value: 33, id: '' },
      ),
    ).toBe('SELECT * FROM dictionary where value = 33 and id = \'\';');

    expect(
      replacePlaceholderWithParams(
        'SELECT * FROM dictionary where value = @value and id = @id;',
        { value: 33, id: null },
      ),
    ).toBe('SELECT * FROM dictionary where value = 33 and id = null;');

    expect(
      replacePlaceholderWithParams(
        'SELECT * FROM dictionary where value = @value and id = @id;',
        { value: 33, id: undefined },
      ),
    ).toBe('SELECT * FROM dictionary where value = 33 and id = @id;');

    expect(
      replacePlaceholderWithParams(
        `SELECT * FROM dictionary where value = @value
        and id = @id;`,
        { value: 33, id: '' },
      ),
    ).toBe(`SELECT * FROM dictionary where value = 33
        and id = '';`);
  });
});

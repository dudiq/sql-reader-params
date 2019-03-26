const Reader = require('../src/index');

describe('Reader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('params mismatch', () => {
    const inst = Reader('./reader.sql');

    it('should return correct params count', async () => {
      const values = inst.paramsToValues({
        p1: 1,
        p2: 2,
      });
      expect(values).toEqual([1, 2]);
      expect(inst.getText()).toEqual(
        `$1, $2, $2
`,
      );
    });
  });
});

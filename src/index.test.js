const persianNumberToText = require('./index');

test('number check function', () => {
  expect(persianNumberToText.convert('a1')).toBe('یک');
  persianNumberToText.changeConfig({ inputValidation: true });
  expect(persianNumberToText.convert(1)).toBe('یک'); 
  expect(persianNumberToText.convert('1')).toBe('یک');
  expect(persianNumberToText.convert('a1')).toBeUndefined(); 
});
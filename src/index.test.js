const persianNumberToText = require('./index');

test('number check function', () => {
  expect(persianNumberToText.getText('a1')).toBe('aیک');
  persianNumberToText.changeConfig({ inputValidation: true });
  expect(persianNumberToText.getText(1)).toBe('یک'); 
  expect(persianNumberToText.getText('1')).toBe('یک');
  expect(persianNumberToText.getText('a1')).toBeUndefined(); 
});
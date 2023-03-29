NumberToPersianText  = require('./index')

test('number check function', () => {
  expect(NumberToPersianText.getText('-23.34%')).toBe('منفی بیست و سه ممیز سی و چهار صدم درصد');
  expect(NumberToPersianText.getText(1)).toBe('یک');
  expect(NumberToPersianText.getText('a1')).toBe('aیک');
  NumberToPersianText.changeConfig({ inputValidation: true });
  expect(NumberToPersianText.getText(1)).toBe('یک'); 
  expect(NumberToPersianText.getText('1')).toBe('یک');
  expect(NumberToPersianText.getText('a1')).toBeUndefined(); 
  NumberToPersianText.changeConfig({moneyOutput : true , moneyUnit: 'تومان'});
  expect(NumberToPersianText.getText('1000000')).toBe('یک میلیون تومان');
});
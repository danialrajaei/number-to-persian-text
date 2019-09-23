# Number to persian text
Change number (from number or string)  to Persian (Farsi) text.

e.g. 1366 => هزار و سیصد و شصت و شش


## How to use
### simple usage :
```javascript
const persianNToText = require('number-to-persian-text');

persianNToText.getText('سال 2019 میلادی و 1398 شمسی'); // سال دو هزار و نوزده میلادی و یک هزار و سیصد ونود وهشت شمسی
```
### configuration

default config object :
```javascript
{
        inputValidation: false,
        moneyOutput: false,
        moneyUnit: 'ريال'
 }
 
```
    inputValidation : to check input for valid number only
	moneyOutput : weather the output should contain money unit
	moneyUnit : custom money unit
	
### Change config object

to change config object call "changeConfig":
```javascript
const NumbertoPersianText = require('number-to-persian-text');

NumbertoPersianText.changeConfig({moneyOutput : true , moneyUnit: 'تومان'});
NumbertoPersianText.getText('1000000'); // یک میلیون تومان
```


# Number to persian text
Change number (from number or string)  to Persian (Farsi) text.

e.g. 1366 => هزار و سیصد و شصت و شش

## How to install

`npm i number-to-persian-text`
    or
`yarn add number-to-persian-text`

## How to use
### usage 1:
```javascript
const persianNToText = require('number-to-persian-text');

persianNToText.getText('سال 2019 میلادی و 1398 شمسی'); // سال دو هزار و نوزده میلادی و یک هزار و سیصد ونود وهشت شمسی
persianNToText.getText('-23.34%'); //منفی بیست و سه ممیز سی و چهار صدم درصد
```
### usage 2:    
 see the example in \example\index.html

    <html>
        <head>
            <script src="../dist/index.js"></script>
        </head>
        <body>
            <div id="convertedText"></div>
            <script type="text/javascript" charset="UTF-8">
                 document.getElementById('convertedText').innerHTML = NumberToPersianText.getText('1234');
            </script>
        </body>
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

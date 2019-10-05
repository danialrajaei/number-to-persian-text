module.exports = numberToPersianText = (function () {
    const oneDigit = ['صفر', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
    const tenToTwenty = ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هیجده', 'نوزده'];
    const twoDigits = ['بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
    const threeDigits = ['صد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد'];
    const groupNames = ['', 'هزار', 'میلیون', 'میلیارد', 'بیلیون', 'بیلیارد', 'تریلیون', 'تریلیارد'];

    var config = {
        inputValidation: false,
        moneyOutput: false,
        moneyUnit: 'ريال'
    }

    function _checkIsNumber(val) {
        return /^\d+$/.test(val);
    }

    function _fetchNumberFromInput(inpt) {
        return inpt.replace(',', '').match(/[+,-]{0,}\d+[.]{0,}\d{1,}[%,\b\s%\b]{0,}/g);
    }

    function _oneDigitString(num) {
        return oneDigit[parseInt(num)];
    }

    function _twoDigitToString(num) {
        if (num[0] == '0') {
            return _oneDigitString(num[1]);
        } else if (num[0] == '1') {
            return tenToTwenty[parseInt(num[1])];
        }
        else {
            return num[1] == '0' ? twoDigits[num[0] - 2] : twoDigits[num[0] - 2] + ' و ' + _oneDigitString(num[1]);
        }
    }

    function _threeDigitToString(num) {
        if (num == '000') {
            return '';
        }
        else if (num[0] == '0') {
            return _twoDigitToString(num.substring(1, 3));
        }
        else {
            return num.substring(1, 3) == '00' ? threeDigits[num[0] - 1] : threeDigits[num[0] - 1] + ' و ' + _twoDigitToString(num.substring(1, 3));
        }
    }

    function _splitPhoneNumber(val) {
        return val.replace(/^[+]/, '').split(/[\s-]/);
    }

    function _convertNumberToText(fixedNumber) {
        const splits = fixedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").split(',');
        var retText = '';
        for (let index = 0; index < splits.length; index++) {
            var num = splits[index].padStart(3, '0');
            if (num === '000')
                continue;
            retText += [_threeDigitToString(num), groupNames[splits.length - 1 - index], 'و'].join(' ');
        }
        return retText.replace(/( و)$/g, '').trim();
    }

    function _getFractionLabel(fractionLength) {
        var retVal = '';
        switch (fractionLength) {
            case 1:
                retVal = 'دهم';
                break;
            case 2:
                retVal = 'صدم';
                break;
            case 3:
                retVal = 'هزارم';
                break;
            case 4:
                retVal = 'ده هزارم';
                break;
            case 5:
                retVal = 'صد هزارم';
                break;

            default:
                break;
        }
        return retVal;
    }

    function _convertNumberFromInput(input) {
        var retText = (input[0] && input[0] == '-') ? 'منفی ' : '';
        var postFix = '', fixedNumber = '', fraction = '';
        if (input.match(/[%,\b\s%\b]$/)) {
            postFix = ' درصد';
            fixedNumber = input.replace(/[%,\b\s%\b]$/, '');
        }
        if (fixedNumber.indexOf('.') > -1) {
            [fixedNumber, floatNumber] = fixedNumber.split('.')[0];
            if (floatNumber[0] == '0' && floatNumber.length > 5) {
                var numberOfZeros = 0;
                while (floatNumber[numberOfZeros] == '0') {
                    numberOfZeros++
                }
                fraction = ['ممیز', _convertNumberToText(numberOfZeros.toString()), _convertNumberToText('0'), _convertNumberToText(floatNumber)].join(' ');
            }
            else { fraction = ['ممیز', _convertNumberToText(floatNumber), _getFractionLabel(floatNumber.length)].join(' '); }
        }
        retText += _convertNumberToText(fixedNumber);
        return [retText, fraction, postFix].join(' ');
    }

    return {
        changeConfig: function (newConfig) {
            config = Object.assign(config, newConfig);
        },

        getText: function (val) {
            if (config.inputValidation && !_checkIsNumber(val)) {
                console.warn("Input is not number! (in case of using complex input change config value of 'inputValidation' to false.");
                return;
            }
            else {
                var retText = val.toString();
                numbers = _fetchNumberFromInput(retText);
                numbers.forEach(number => {
                    retText = retText.replace(number, _convertNumberFromInput(number));
                });
                if (config.moneyOutput) {
                    retText += ' ' + config.moneyUnit;
                }
                return retText.trim();
            }
        }
    }
})();
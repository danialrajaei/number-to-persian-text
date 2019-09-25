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
        return inpt.match(/[+,-]{0,}\d+/g);
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

    function _convertNumberFromInput(inpt) {
        var retText = (inpt[0] && inpt[0] == '-') ? 'منفی' : '';
        const splits = inpt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").split(',');
        for (let index = 0; index < splits.length; index++) {
            var num = splits[index].padStart(3, '0');
            if (num === '000')
                continue;
            retText += [_threeDigitToString(num), groupNames[splits.length - 1 - index], 'و'].join(' ');
        }
        return retText.replace(/( و)$/g, '').trim();
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
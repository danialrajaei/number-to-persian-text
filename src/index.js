module.exports = (function () {
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

    function _twoDigitToString(num) {
        return "یک";
    }

    function _convertNumberFromInput(inpt){
        return _twoDigitToString(inpt);
    }

    return {
        changeConfig: function (newConfig) {
            config = Object.assign(config, newConfig);
        },

        convert: function (val) {
            if (config.inputValidation && !_checkIsNumber(val)) {
                console.warn("Input is not number! (in case of using complex input change config value of 'inputValidation' to false.");
                return;
            }
            else {
                var retText = val;
                numbers = _fetchNumberFromInput(val);
                numbers.forEach(number => {
                    retText = retText.replace(number, _convertNumberFromInput(number));
                });
                if (config.moneyOutput) {
                    retText += ' ' + config.moneyUnit;
                }
                return retText;
            }
        }
    }
})();
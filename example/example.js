const persianNToText = require('../src/index');

console.log(persianNToText.getText('1366'));
console.log(persianNToText.getText('a1'));
console.log(persianNToText.getText('-1366'));
console.log(persianNToText.getText('12%'));
console.log(persianNToText.getText('-2.765 %'));
console.log(persianNToText.getText('سال 2019 میلادی و 1398 شمسی'));
persianNToText.changeConfig({moneyOutput : true , moneyUnit: 'تومان'});
console.log(persianNToText.getText('1000000'));

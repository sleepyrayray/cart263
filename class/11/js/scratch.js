const numbers = [1, 2, 3, 4, 5];
const squaredNumbers = numbers.map(
    function (num) {
        return (
            num * num
        )
    }
);
// console.log(squaredNumbers);

const numbers_filter = [1, 28, 355, 44, 51, 78];
const evenNumbers = numbers_filter.filter(
    function (num) {
        return (num % 2 === 0)
    })
console.log(evenNumbers); 
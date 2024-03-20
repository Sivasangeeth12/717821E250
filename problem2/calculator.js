const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 9876;



function PrimeNumbers(n) {
    const primesArray = [];
    for (let range = 2; primesArray.length < n; range++) {
        let flag = true;
        for (let i = 2; i <= Math.sqrt(range); i++) {
            if (range % i === 0) {
                flag = false;
                break;
            }
        }
        if (flag) primesArray.push(range);
    }
    return primesArray;
}

app.get('/primes', (req, res) => {
    const length = 10;
    const primes = PrimeNumbers(length);
    res.json({ numbers: primes });
}); 




function FibonacciNumbers(n) {
    const fibonacciArray = [1, 1];
    for (let i = 2; i < n; i++) {
        fibonacciArray.push(fibonacciArray[i - 1] + fibonacciArray[i - 2]);
    }
    return fibonacciArray;
}

app.get('/fibo', (req, res) => {
    const length = 10; 
    const fibonacci = FibonacciNumbers(length);
    res.json({ numbers: fibonacci });
});


function EvenNumbers(n) {
    const evenArray = [];
    for (let i = 0; evenArray.length < n; i += 2) {
        evenArray.push(i);
    }
    return evenArray;
}

app.get('/even', (req, res) => {
    const length = 10;
    const evenNumbers = EvenNumbers(length);
    res.json({ numbers: evenNumbers });
});

function RandomNumbers(n) {
    const randomArray = [];
    for (let i = 0; randomArray.length < n; i += 2) {
        randomArray.push(Math.floor(Math.random() * 10));
        
    }
    return randomArray;
}

app.get('/random', (req, res) => {
    const length = 10;
    const randomNumbers = RandomNumbers(length);
    res.json({ numbers: randomNumbers });
});




app.get('/numbers/:id', async (req, res) => {
    const name = req.params.id;
    // console.log(name)
    let array = []
    if(name == 'e')
    {
    const length = 10;
    const evenNumbers = EvenNumbers(length);
    array = evenNumbers
    // res.json({ numbers: evenNumbers });
    }
    else if(name == 'f')
    {
        const length = 10; 
    const fibonacci = FibonacciNumbers(length);
    array = fibonacci
    // res.json({ numbers: fibonacci });
    }
    else if(name == 'r')
    {
        const length = 10;
        const randomNumbers = RandomNumbers(length);
        array = randomNumbers
        // res.json({ numbers: randomNumbers });
    }
    else if(name == 'p')
    {
        const length = 10;
        const primes = PrimeNumbers(length);
        array = primes
        // res.json({ numbers: primes });
    }
   res.json({windowsPrevState : [],
    windowsCurrState : array,
    numbers : array,
    avg : parseFloat(calcAvg(array))
})

});

function calcAvg(array)
{
    let sum = 0;
    for(let i=0;i<array.length;i++)
        sum += array[i];
    return (sum/array.length)*1.0
}




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});










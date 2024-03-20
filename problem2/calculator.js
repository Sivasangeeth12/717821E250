const express = require('express');
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



function mergeNumbers(numbers) {
    return Array.from(new Set(numbers)).sort((a, b) => a - b);
}

app.get('/numbers', async (req, res) => {
        const choice = req.query.name;
        if (!choice || !Array.isArray(choice)) {
            return res.status(400).json({ error: 'Invalid choice provided' });
        }
    
        const requests = choice.map(name => axios.get(name, { timeout: 500 }).then(response => response.data.numbers).catch(() => []));
    
        try {
            const responses = await Promise.all(requests);
            const mergedNumbers = mergeNumbers(responses.flat());
            res.json({ numbers: mergedNumbers });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});














// function generatePrimes(n) {
//     const primes = [];
//     for (let num = 2; primes.length < n; num++) {
//         let isPrime = true;
//         for (let i = 2; i <= Math.sqrt(num); i++) {
//             if (num % i === 0) {
//                 isPrime = false;
//                 break;
//             }
//         }
//         if (isPrime) primes.push(num);
//     }
//     return primes;
// }

// // Endpoint to get a list of prime numbers
// app.get('/primes', (req, res) => {
//     const n = 15; // Generating 15 prime numbers
//     const primes = generatePrimes(n);
//     res.json({ numbers: primes });
// }); 




// function generateFibonacci(n) {
//     const fibonacci = [1, 1];
//     for (let i = 2; i < n; i++) {
//         fibonacci.push(fibonacci[i - 1] + fibonacci[i - 2]);
//     }
//     return fibonacci;
// }

// // Endpoint to get a list of Fibonacci numbers
// app.get('/fibo', (req, res) => {
//     const n = 15; // Generating Fibonacci sequence of length 15
//     const fibonacci = generateFibonacci(n);
//     res.json({ numbers: fibonacci });
// });


// function generateOddNumbers(n) {
//     const oddNumbers = [];
//     for (let num = 1; oddNumbers.length < n; num += 2) {
//         oddNumbers.push(num);
//     }
//     return oddNumbers;
// }

// // Endpoint to get a list of odd numbers
// app.get('/odd', (req, res) => {
//     const n = 15; // Generating 15 odd numbers
//     const oddNumbers = generateOddNumbers(n);
//     res.json({ numbers: oddNumbers });
// });


// // Function to merge and sort unique numbers
// function mergeAndSort(numbers) {
//     return Array.from(new Set(numbers)).sort((a, b) => a - b);
// }

// // GET REST API endpoint
// app.get('/numbers', async (req, res) => {
//     const urls = req.query.url;
//     if (!urls || !Array.isArray(urls)) {
//         return res.status(400).json({ error: 'Invalid URLs provided' });
//     }

//     const requests = urls.map(url => axios.get(url, { timeout: 500 }).then(response => response.data.numbers).catch(() => []));

//     try {
//         const responses = await Promise.all(requests);
//         const mergedNumbers = mergeAndSort(responses.flat());
//         res.json({ numbers: mergedNumbers });
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
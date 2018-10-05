var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);                   
            } else {
                reject('Arguments must be numbers');
            }
        }, 1500)
    });
};

asyncAdd(5, '7').then((res) => {
    console.log(res);
    return asyncAdd(res, 30);
}).then((res) => {
    console.log('Should be 42', res)
}).catch((errorMessage) => {
    console.log(errorMessage);
})




// var somePromise = new Promise((resolve, reject) => {
//     // resolve('Hey! It worked');
//     reject('It no work')
// })

// somePromise.then((message) => {
//     console.log('Success', message);
// }, (errorMessage) => {
//     console.log('Error', errorMessage);
// })
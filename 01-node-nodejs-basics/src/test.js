class Chameleon {
    static colorChange(newColor) {
        this.newColor = newColor;
        return this.newColor;
    }

    constructor({ newColor = 'green' } = {}) {
        this.newColor = newColor;
    }
}

// const freddie = new Chameleon({ newColor: 'purple' });
// console.log(freddie.colorChange('orange'));

// (() => {
//     let x, y;
//     try {
//         throw new Error();
//     } catch (x) {
//         (x = 1), (y = 2);
//         console.log(x);
//     }
//     console.log(x);
//     console.log(y);
// })();


function isPromise(value) {
    return Boolean(value && typeof value.then === "function");
}
var i = 1;
var promise = new Promise(function (resolve, reject) {
    resolve();
});

// console.log(isPromise(i));
// console.log(isPromise(promise));

console.log(null ?? true);
console.log(false ?? true);
console.log(undefined ?? true);

(function immediateA(a) {
    return (function immediateB(b) {
        console.log(a);
    })(1);
})(0);

for (var i = 0; i < 3; i++) {
    setTimeout(function log() {
        console.log(i); // What is logged?
    }, 1000);
} 

const clothes = ['jacket', 't-shirt'];
clothes.length = 0;
console.log(clothes[0]);
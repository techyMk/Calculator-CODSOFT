var screen = document.querySelector('.screen'),
    numBtns = document.querySelectorAll('.num'),
    operatorBtns = document.querySelectorAll('.operator'),
    equalBtn = document.querySelector('.equal'),
    allClearBtn = document.querySelector('.allclear'),
    deleteBtn = document.querySelector('.delete'),
    percentBtn = document.querySelector('.percent'),
    resultDisplayed = false;

    // number buttons
    for(var i=0;i<numBtns.length;i++)
    {
        numBtns[i].addEventListener('click', function(e)
        {
            var currentString = screen.value
            var lastChar = currentString[currentString.length-1]
            if(resultDisplayed === false)
            {
                screen.value+=e.target.innerHTML
            }    

            else if(resultDisplayed===true && lastChar=="+" || lastChar=="-" || lastChar=="x" || lastChar=="÷")
            {
                resultDisplayed=false
                screen.value+=e.target.innerHTML
            }

            else
            {
                resultDisplayed=false
                screen.value=""
                screen.value+=e.target.innerHTML
    
            }
        })
    }

    //operator buttons
    for(var i=0;i<operatorBtns.length;i++)
    {
        operatorBtns[i].addEventListener('click',function(e)
    {
        var currentString=screen.value
        var lastChar=currentString[currentString.length-1]

        if(lastChar ==="+" || lastChar ==="-" || lastChar ==="x" || lastChar ==="÷")
        {
            var newString=currentString.substring(0, currentString.length-1)+e.target.innerHTML
            screen.value=newString
        }

        else if(currentString.length==0)
        {
            alert("Enter a number first.")
        }

        else
        {
            screen.value+=e.target.innerHTML
        }
    })
    }

    //equal button
//equal button
equalBtn.addEventListener('click', function() {
    var inputString = screen.value;
    
    // Replace display symbols with actual operators for calculation
    inputString = inputString.replace(/x/g, "*").replace(/÷/g, "/");

    // Split numbers and operators
    var number = inputString.split(/\+|\-|\*|\//g);
    var operator = inputString.replace(/[0-9]|\./g, "").split("");

    // Handle division (now with '/')
    var divide = operator.indexOf("/");
    while (divide != -1) {
        number.splice(divide, 2, number[divide] / number[divide + 1]);
        operator.splice(divide, 1);
        divide = operator.indexOf("/");
    }

    // Handle multiplication (now with '*')
    var product = operator.indexOf("*");
    while (product != -1) {
        number.splice(product, 2, number[product] * number[product + 1]);
        operator.splice(product, 1);
        product = operator.indexOf("*");
    }

    // Handle addition
    var sum = operator.indexOf("+");
    while (sum != -1) {
        number.splice(sum, 2, parseFloat(number[sum]) + parseFloat(number[sum + 1]));
        operator.splice(sum, 1);
        sum = operator.indexOf("+");
    }

    // Handle subtraction
    var minus = operator.indexOf("-");
    while (minus != -1) {
        number.splice(minus, 2, number[minus] - number[minus + 1]);
        operator.splice(minus, 1);
        minus = operator.indexOf("-");
    }

    screen.value = number[0];  // Display the final result
    resultDisplayed = true;
});

// operator buttons (displaying x and ÷ but handling * and / for calculations)
for(var i = 0; i < operatorBtns.length; i++) {
    operatorBtns[i].addEventListener('click', function(e) {
        var currentString = screen.value;
        var lastChar = currentString[currentString.length - 1];

        // Prevent multiple operators and display the correct symbol
        if (lastChar === "+" || lastChar === "-" || lastChar === "x" || lastChar === "÷") {
            var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
            screen.value = newString;
        } else if (currentString.length == 0) {
            alert("Enter a number first.");
        } else {
            screen.value += e.target.innerHTML;
        }
    });
}



    allClearBtn.addEventListener('click', function()
    {
        screen.value=""
    })

    deleteBtn.addEventListener('click', function()
    {
        var deleteValue=screen.value.slice(0,-1)
        screen.value=deleteValue
    })

    percentBtn.addEventListener('click', function()
    {
        var per=eval(screen.value/100)
        screen.value=per
    })


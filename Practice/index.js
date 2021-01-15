const myButton = document.getElementById("alden-button");


function aldenFunction(event) {
    console.log("The button has been clicked!");
}

myButton.addEventListener('click', aldenFunction); 

function crazywarning(event) {
    alert("The bomb is coming! The bomb is coming.")
    alert("your computer is going to exsplode in 3 2 1 bang" )
}

myButton.addEventListener('click', crazywarning);

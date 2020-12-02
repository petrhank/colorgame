let numOfSquares = 6;   //Zde se bude ukládat počet čtverců, obtížnost, aby new game generovalo bud jen 3, nebo 6 barev
let colors = [];    
let pickedColor;

let squares = document.querySelectorAll(".square"); //Vybere všechny čtverce
let colorDisplay = document.getElementById("colorDisplay"); //Vypíše hledanou barvu do názvu
let messageDisplay = document.getElementById("message");    //Vypíše zprávu try again nebo...
let h1 = document.querySelector("h1");
let aside = document.querySelector(".container aside");

let resetBtn = document.querySelector("#reset");
let modeBtns = document.querySelectorAll(".mode");
let hintBtn = document.querySelector("#hintBtn");
colorDisplay.textContent = pickedColor;





let resizeTimer;
window.addEventListener("resize", function(){
  document.body.classList.add("resize-animation-stopper");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function(){
    document.body.classList.remove("resize-animation-stopper");
  }, 400);
});


function init(){        //Funkce seskupující  věci, které se mají stát při načtení stránky
    
    //Mode buttons event listeners
        setUpModeButton();
    //Přidá click listener do čtverců
        setUpSquares();
    //Vytvoří tlačíto nápovědy
        setUpHintButton();
    //Nastaví vše do základního stavu
        reset();
}

////Vytvoření objektů////

function setUpModeButton(){                             //Přidá event listenery mode tlačítkům.
    for(let i = 0; i < modeBtns.length; i++){
        modeBtns[i].addEventListener("click", function(){
            modeBtns[0].classList.remove("selected");       //Odebere třídu selected oboum tlačítkům a pak ji vybranému přidá
            modeBtns[1].classList.remove("selected");
            this.classList.add("selected");                 //Zjistí, kolik čtverců ukázat
                numOfSquares = this.textContent === "Easy" ? 3 : 6;
                reset();
        });
    }
}

function setUpSquares(){                                //Přidá event listenery do čtverců
    for(let i = 0; i < squares.length; i++){

        squares[i].addEventListener("click", function(){
            let clickedColor = this.style.backgroundColor;  //Uloží kliknutou barvu do proměnné
            if(clickedColor === pickedColor){               //Porovná kliknutou barvu s vítěznou barvou
                messageDisplay.textContent = "Correct!";
                changeColors(clickedColor);                 //Změní barvu všech elementů na vítěznou barvu
                h1.style.backgroundColor = clickedColor;
                resetBtn.textContent = "Play Again?";       //Změní obsah reset tlačítka na play again?
            }
            else{
                this.style.background = "#232323";
                messageDisplay.textContent = "Try Again";
            }
        });
    }
}

function setUpHintButton(){                             //Přidá event listener hint tlačítku
    hintBtn.addEventListener("click",function(){
        aside.classList.toggle("hintToggle");                   //Zapíná a vypíná nápovědu
        if (this.innerHTML === '<i class="fas fa-times"></i>'){ //Přepíná ikonku žárovky a křížku
            this.innerHTML = '<i class="far fa-lightbulb">';
        }
        else{
            this.innerHTML = '<i class="fas fa-times"></i>';
        }
    });
}

resetBtn.addEventListener("click", function(){          //Přiřadí funkci reset tlačítku reset
    reset();
});


////Funkcionalita////

function randomColor(){                         //Vybere "red" od 0 do 255, "green" od 0 do 255 a "blue" od 0 do 255
    let r = Math.floor(Math.random() * 256);        //256, protože random je od 0 do 0.999
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";  //POZOR NA MEZERY, musí tam být, aby se daly barvy porovnat s 
}

function generateRandomColors(num){             //Vloží náhodné barvy do pole a vrátí ho. Argumentem je numOfSquares, tedy počet čtverců
    let arr = [];
    for(let i = 0; i < num; i++){                   //Přidá num počet náhodných barev do pole
        arr.push(randomColor());                    //Získá náhodnou barvu a vloží do pole
    }
    return arr;
}

function pickColor(){                           //Funkce pro vybrání náhodné vítězné barvy z pole barev
    let random =  Math.floor(Math.random() * colors.length);   //Vygeneruje náhodné číslo od 0 do 0.9999, vynásobí počtem položek v poli a zaokrouhlíme dolů. Dostaneme číslo od 0 do "delky pole" (takže o 1 položku navíc, než chceme) , což nevadí, protože násobíme maximálně 0.9 a to nám 6 nedá, takže bysme museli přičítat 1 .a podle něho se vybere náhodná barva
    return colors[random];
}

function changeColors(color){                   //Projede cyklem všechny čtverce a přemění je na stejnou barvu
        for(let i = 0; i < squares.length; i++){
            squares[i].style.background = color;
        }
    }
   
function reset(){
    //Vygeneruje nové barvy podle obtížnosti
        colors = generateRandomColors(numOfSquares);
    //Vybere novou náhodnou hledanou barvu
        pickedColor = pickColor();
    //Změní vypsanou hádanou barvu na novou
        colorDisplay.textContent = pickedColor;
    //Change colors of squares
        for(let i = 0; i < squares.length; i++){
            
            if(colors[i]){  //Kontrolujeme, zda je v poli barev další barva, která by se měla aplikovat na čtverec. Pokud už ne, čtverec skryje
                        //Přidá počáteční barvy do čtverců
                squares[i].classList.remove("hidden");
                squares[i].style.backgroundColor = colors[i];
            }
            else{
                squares[i].classList.add("hidden");
            }

        }
        h1.style.backgroundColor = "steelblue";
        resetBtn.textContent = "New Colors";
        messageDisplay.textContent = "";
        aside.classList.remove("hintToggle");
}

init(); //Volání funkce, která provádí všehny věci při načtení stránky




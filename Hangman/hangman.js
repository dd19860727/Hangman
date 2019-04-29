$(document).ready(() => {
    let count = 0;
    let isWin = false;
    let wordSet = {0:"Brain", 1:"Di", 2:"Caleb", 3:"Min"};
    let word = generateWord(wordSet);
    
    setWordOnPage(word);
    setInputOnPage(word);
    inputValid(word.length);
    
    $('.btn-submit').click(() => {
        count++;
        isWin = submit(word.length);
        if(isWin){
            setWinOnpage(isWin);
        }else{
            addCount(count);
        }
    });
});

function setInputOnPage(word){
    let wordArr = Array.from(word);
    for(let i = 0; i<wordArr.length; i++){
        let div = createDiv('input-letter-box', '.input-box');
        
        let input = $('<input>');
        input.prop({
            "type":"text",
            "maxlength":"1",
            'id':'letter'+i,
            "required":"true"
        });
        input.appendTo(div);
    }
};

function createDiv(className, parentClassName){
    let div = $('<div></div>');
     div.prop('class', className);
     div.addClass('className');
     div.appendTo(parentClassName); 

     return div;
};

function setWordOnPage(word){
    let p = $('<p>'+word+'</p>');
    p.appendTo('.word-box');
    $('.word-box>p').hide();
};

function generateWord (wordSet){
    let setSize = Object.keys(wordSet).length;
    let randonKey = Math.floor(Math.random() * setSize);
    let word = wordSet[randonKey];
    return word;
};

function inputValid(wordLen){
    let wordLength = wordLen;
    $('.input-letter-box>input').bind('keypress', checkInput);
    $('.input-letter-box>input').bind('keyup', {length:wordLength}, isEnableSubmit);
}


function checkInput(event) {
    let value = String.fromCharCode(event.which);
    let pattern = new RegExp(/[a-zA-Z]/i);
    let isValid = pattern.test(value);

    if (!isValid) {
        alert("Please type a letter")
    }

    return isValid;
};

function isEnableSubmit(event) {
    if (checkInput) {
        let length = event.data.length;
        let inputArr = getInputArr(length);

        if (!inputArr.includes("")) {
            enableSubmit();
        } else {
            disableSubmit();
        }
    }
};

function getInputArr(wordLength){
    let inputArray = new Array();
    for(let i = 0; i<wordLength; i++){
        let inputLetter = $('#letter'+i).val();
        inputArray.push(inputLetter);
    }
    return inputArray;
};

function submit(wordLen) {

    let word = $('.word-box>p').text();
    let wordLength = wordLen;

    let inputStr = getInputStr(wordLength);

    if (inputStr == word) {
        return true;
    } else {
        let wordArr = Array.from(word);
        let inputArr = getInputArr(wordLength);
        
        for (let i = 0; i < inputArr.length; i++) {
            if (inputArr[i] == wordArr[i]) {
                let rightSel = '#letter' + i;
                disableInput(rightSel);
            } else if (inputArr[i] != "") {
                createWrongDiv(inputArr[i]);
            }
        }

        return false;
    }
}

function getInputStr(wordLength){
    let length = wordLength;
    let inputStr = "";
    for(let i = 0; i<length; i++){
        let inputLetter = $('#letter'+i).val();
        inputStr += inputLetter;
    }
    return inputStr;
}

function setWinOnpage(){
    $('.count-box>p').css({ "color": "red" });
    $('.count-box>p').text("You guess it, Congratulation !!!");
    $('.word-box>p').show();
    disableInput('.input-letter-box > input');
    disableSubmit();
}

function addCount(count) {

    const maxCount = 10;

    $('.count-box>p').text("Total Counts is " + count + ".");

    if (count > maxCount) {
        $('.count-box>p').css({ "color": "red" });
        $('.count-box>p').text("You lose the game!!!");
    }
}

function disableSubmit() {
    $('.btn-submit').css({
        "background-color": "#FC978D",
        "cursor": "not-allowed",
        "transition": "background-color ease-in-out 1s",
    });
    $('.btn-submit').prop("disabled", true);
}

function enableSubmit() {
    $('.btn-submit').css({
        "background-color": "red",
        "cursor": "pointer",
        "transition": "background-color ease-in-out 0.5s",
    });
    $('.btn-submit').prop("disabled", false);
}


function disableInput(selector) {
    $(selector).prop("disabled", true);
    $(selector).css({
        "border-bottom-color": "red",
        "transition": "border-bottom-color ease-in-out 1s",
    });
}

function createWrongDiv(wrongWord){
    let div = createDiv('wrong-word', '.wrong-words-box');
    let span = $('<span>'+wrongWord+'</span>');
    span.appendTo(div);
}


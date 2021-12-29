
function swapDirection (e) {
    this.classList.toggle('forward');
    this.classList.toggle('back');
    if (this.classList.contains('forward')) {
        this.src = './img/forwardTurn.png';
        this.alt = 'forward turn';
    }
    if (this.classList.contains('back')) {
        this.src = './img/backwardsTurn.png';
        this.alt = 'backwards turn';
    }
};

function swapAllDirections (e) {
    let turnDirections = document.querySelectorAll('.directionSelection');
    this.classList.toggle('forward');
    this.classList.toggle('back');
    if (this.classList.contains('forward')) {
        turnDirections.forEach(turn => {
            turn.src = './img/forwardTurn.png';
            turn.alt = 'forward turn';
            turn.classList.add('forward');
            turn.classList.remove('back');
        });
        this.src = './img/forwardTurn.png';
        this.alt = 'forward turn';
    }
    if (this.classList.contains('back')) {
        turnDirections.forEach(turn => {
            turn.src = './img/backwardsTurn.png'
            turn.alt = 'backwards turn'
            turn.classList.remove('forward');
            turn.classList.add('back');
        });
        this.src = './img/backwardsTurn.png';
        this.alt = 'backwards turn';
    }
};

function highlightOnHover (e) {
    let currentRow = e.target.parentElement.classList[1];
    let rowNumbers = document.querySelectorAll('.rowNumber')
    let highlightRow = rowNumbers[currentRow - 1];
    let currentCard = e.target.parentElement.parentElement.parentElement;
    let highlightColumn = currentCard.querySelector('.columnDiv');
    highlightColumn.classList.toggle('highlight');
    highlightRow.classList.toggle('highlight');
}

function removeHighlight (e) {
    let currentRow = e.target.parentElement.classList[1];
    let rowNumbers = document.querySelectorAll('.rowNumber')
    let highlightRow = rowNumbers[currentRow - 1];
    let currentCard = e.target.parentElement.parentElement.parentElement;
    let highlightColumn = currentCard.querySelector('.columnDiv');
    highlightColumn.classList.toggle('highlight');
    highlightRow.classList.toggle('highlight');
}

//convert the card position to an umber for the colorArray
function positionToNumber (oldDirectionSelctor) {
    switch (oldDirectionSelctor.querySelector('span').textContent.charAt(0)) {
        case 'A':
            return 0;
        case 'B':
            return 1;
        case 'C':
            return 2;
        case 'D':
            return 3;
        default:
            return 0;
    }
}

//convert a colorArray position back to a card position Letter
function numberToPosition (positionNumber) {
    switch (positionNumber) {
        case 0:
            return 'A';
        case 1:
            return 'B';
        case 2:
            return 'C';
        case 3:
            return 'D';
        default:
            return 'A';
    }
};

function positionNumberToColorNumber (positionNumber) {
    switch (positionNumber) {
        case 0:
            return 0;
        case 1:
            return 1;
        case 2:
            return 3;
        case 3:
            return 2;
        default:
            return 0;
    }
};

//create the first block of the pattern
function initPattern (newBlock, newLabel, newSpan, newDirectionSelector, colorArray) {
    newLabel.classList.add('1');
            
    //if the pattern is being turned forward select A
    if (newDirectionSelector.classList.contains('forward')) {
        console.log('forward')
        let colorToAdd = colorArray[0]
        newBlock.style.backgroundColor = colorToAdd;
        newBlock.classList.add('a');
        newBlock.classList.add('forward');
        newSpan.innerHTML = 'A <br /> forward';
    //if the pattern is being turned back select B
    } else if (newDirectionSelector.classList.contains('back')) {
        console.log('back')
        let colorToAdd = colorArray[1]
        newBlock.style.backgroundColor = colorToAdd;
        newBlock.classList.add('b');
        newBlock.classList.add('back');
        newSpan.innerHTML = 'B <br /> back';
    }
};

function continuePattern(newBlock, newLabel, newSpan, card, newDirectionSelector, colorArray) {
    let oldDirectionSelctor = card.querySelector('.patternLabel:last-child')
    let oldDirection = oldDirectionSelctor.querySelector('div').classList[1];
    let oldRow = oldDirectionSelctor.classList[1];
    newLabel.classList.add(parseInt(oldRow) + 1);
    let positionNumber = positionToNumber (oldDirectionSelctor);
    let newDirection = newDirectionSelector.classList[1];
    if (newDirection === 'forward') {
        if (oldDirection === 'forward') {
            //next
            //cycle positionNumber up one position
            
            if (positionNumber > 0){
                positionNumber -= 1;
            }else {
                positionNumber = 3;
            }
            let colorNumber = positionNumberToColorNumber(positionNumber);
            newBlock.style.backgroundColor = colorArray[colorNumber];
            let newPosition = numberToPosition(positionNumber);
            newBlock.classList.add(newPosition.toLowerCase());
            newSpan.innerHTML = `${newPosition} <br /> ${newDirection}`;
        }
        else if (oldDirection === 'back') {
            //same
            let colorNumber = positionNumberToColorNumber(positionNumber);
            newBlock.style.backgroundColor = colorArray[colorNumber];
            let newPosition = numberToPosition(positionNumber);
            newBlock.classList.add(newPosition.toLowerCase());
            newSpan.innerHTML = `${newPosition} <br /> ${newDirection}`;
        }

        newBlock.classList.add('forward');
    } else if (newDirection === 'back') {
        if (oldDirection === 'forward') {
            //same
            let colorNumber = positionNumberToColorNumber(positionNumber);
            newBlock.style.backgroundColor = colorArray[colorNumber];
            let newPosition = numberToPosition(positionNumber);
            newBlock.classList.add(newPosition.toLowerCase());
            newSpan.innerHTML = `${newPosition} <br /> ${newDirection}`;
        }
        else if (oldDirection === 'back') {
            //previous
            //cycle positionNumber back one position
            if (positionNumber < 3){
                positionNumber += 1;
            }else {
                positionNumber = 0;
            }
            let colorNumber = positionNumberToColorNumber(positionNumber);
            newBlock.style.backgroundColor = colorArray[colorNumber];
            let newPosition = numberToPosition(positionNumber);
            newBlock.classList.add(newPosition.toLowerCase());
            newSpan.innerHTML = `${newPosition} <br /> ${newDirection}`;
        }
        newBlock.classList.add('back');
    }
};

function advancePattern () {
    let cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        // create an array of the colors selected for each card
        let colorArray = [];
        let colors = card.querySelectorAll('.selection');
        colors.forEach(color => {
            // array order = a,b,d,c
            colorArray.push(color.value)
        })
        //add the color showing to a new div then add it to the card with the right label
        let pattern = card.querySelector('.pattern');
        let newLabel = document.createElement('label');
        newLabel.classList.add('patternLabel');
        let newBlock = document.createElement('div');
        newBlock.style.width = '106px';
        newBlock.style.height = '106px';
        newBlock.style.border = '2px solid';
        let newSpan = document.createElement('span');
        let newDirectionSelector = card.querySelector('.directionSelection')
        //if this is the first card find the right color
        if (pattern.innerHTML === '') {
            initPattern (newBlock, newLabel, newSpan, newDirectionSelector, colorArray);
            newSpan.style.visibility = 'visible';
        //if this is not the first card, find the right color
        } else {
            // find the direction the card is being turned
            continuePattern(newBlock, newLabel, newSpan, card, newDirectionSelector, colorArray);
            let currentLabelVisiblity = document.querySelector('.patternLabel span').style.visibility;
            newSpan.style.visibility = currentLabelVisiblity;
        }
        //add new color block to the pattern
        newBlock.addEventListener('mouseenter', highlightOnHover);
        newBlock.addEventListener('mouseleave', removeHighlight);
        newLabel.appendChild(newBlock);
        newLabel.appendChild(newSpan);
        pattern.appendChild(newLabel);
    })
    let numberOfCards = cards[0].querySelectorAll('.patternLabel')
    let rowCard = document.querySelector('.rowNumbers');
    let rowNumber = document.createElement('div');
    rowNumber.classList.add('rowNumber');
    rowNumber.classList.add(numberOfCards.length);
    rowNumber.innerHTML = `<h2>${numberOfCards.length} </h2>`;
    rowCard.appendChild(rowNumber);
};

function retreatPattern () {
    let patternStarted = document.querySelectorAll('.patternLabel').length;
    if (!patternStarted){
        return;
    } else {
        let cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.querySelector('.patternLabel:last-child').remove();
        });
        document.querySelector('.rowNumber:last-child').remove();
    }
};

function addCard () {
    let patternStarted = document.querySelectorAll('.patternLabel').length;
    if (patternStarted) {
        return;
    } else {
        let container = document.querySelector('.cardContainer');
        let numberOfCards = container.querySelectorAll('.card');
        let oldNode = container.querySelector('.card');
        let newNode = oldNode.cloneNode(true);
        newNode.id = `card${numberOfCards.length+1}`
        let columnNumber = newNode.querySelector('h2');
        columnNumber.textContent = numberOfCards.length+1
        columnNumber.classList.add(numberOfCards.length+1)
        let direction = newNode.querySelector('.directionSelection');
        direction.addEventListener('click', swapDirection);
        container.appendChild(newNode);
    }
};

function removeCard () {
    let patternStarted = document.querySelectorAll('.patternLabel').length;
    if (patternStarted) {
        return;
    } else {
        let cards = document.querySelectorAll('.card');
        if (cards.length > 1){
        document.querySelector('.card:last-child').remove();
        } else {
            return;
        }
    }
};

function clearPattern () {
    let cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        let pattern = card.querySelector('.pattern')
        pattern.innerHTML = '';
    })
    let rowCard = document.querySelector('.rowNumbers');
    rowCard.innerHTML = '';
};

function toggle () {
    let patternStarted = document.querySelectorAll('.patternLabel');
    if (patternStarted.length === 0){
        return;
    } else {
        let patternBlocks = document.querySelectorAll('.patternLabel')
        let firstSpan = patternBlocks[0].querySelector('span');
        if (firstSpan.style.visibility !== 'hidden') {
            patternBlocks.forEach(block => {
                let span = block.querySelector('span')
                span.style.visibility = 'hidden';
            });
        } else {
            patternBlocks.forEach(block => {
                let span = block.querySelector('span');
                span.style.visibility = 'visible';
            });
        }
    }
};



let optionTurnDirection = document.querySelector('.optionDirectionSelection');
optionTurnDirection.addEventListener('click', swapAllDirections);

let turnDirections = document.querySelectorAll('.directionSelection');
turnDirections.forEach(turn => turn.addEventListener('click', swapDirection));

let advance = document.querySelector('.advanceButton')
advance.addEventListener('click', advancePattern);

let retreat = document.querySelector('.retreatButton')
retreat.addEventListener('click', retreatPattern);

let addColumn = document.querySelector('.addColButton')
addColumn.addEventListener('click', addCard);

let removeColumn = document.querySelector('.removeColButton')
removeColumn.addEventListener('click', removeCard);

let clear = document.querySelector('.clearButton')
clear.addEventListener('click', clearPattern);

let toggleLabels = document.querySelector('.toggleLabelsButton')
toggleLabels.addEventListener('click', toggle);
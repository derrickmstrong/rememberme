document.addEventListener('DOMContentLoaded', () => {
  // card options
  const cardArray = [
    {
      name: '1',
      img: 'images/1.png',
    },
    {
      name: '1',
      img: 'images/1.png',
    },
    {
      name: '2',
      img: 'images/2.png',
    },
    {
      name: '2',
      img: 'images/2.png',
    },
    {
      name: '4',
      img: 'images/4.png',
    },
    {
      name: '4',
      img: 'images/4.png',
    },
    {
      name: '5',
      img: 'images/5.png',
    },
    {
      name: '5',
      img: 'images/5.png',
    },
    {
      name: '7',
      img: 'images/7.png',
    },
    {
      name: '7',
      img: 'images/7.png',
    },
    {
      name: '8',
      img: 'images/8.png',
    },
    {
      name: '8',
      img: 'images/8.png',
    },
  ];

  // restart game
  cardArray.sort(() => 0.75 - Math.random());

  // create game board
  const grid = document.querySelector('.grid');

  // keep score
  const score = document.querySelector('h4');
  let resultDisplay = document.querySelector('#result');
  resultDisplay.textContent = '0 out of 6';
  const aww = document.querySelector('#aww');
  aww.style.display = 'none';
  const restart = document.querySelector('#restart');
  restart.style.display = 'none';

  // create empty arrays
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];

  // display instructions
  function checkDisplay() {
    const instructions = document.querySelector('#instructions');
    if (true) {
      instructions.style.display = 'none';
    } else {
      instructions.textContent = 'Click on tiles to play';
      instructions.style.display = 'block';
    }
  }

  // create board
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      let card = document.createElement('img');
      card.setAttribute('src', 'images/front.png');
      card.setAttribute('data-id', i);
      card.addEventListener('click', flipcard);
      grid.appendChild(card);
    }
  }

  // check for click on blank images
  function checkBlank() {
    const img = document.querySelectorAll('img');
    img.forEach(i => {
      if (i.getAttribute('src') === 'images/blank.png')
        i.addEventListener('click', () => {
          i.style.visibility = 'hidden';
        });
    });
  }

  // check for matches
  function checkForMatch() {
    let cards = document.querySelectorAll('img');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];
    if (
      cards[optionOneId].style.visibility == 'hidden' ||
      cards[optionTwoId].style.visibility == 'hidden'
    ) {
      console.log('You already played these cards!');
    } else if (cardsChosen[0] === cardsChosen[1]) {
      // if its a match
      alert('You found a match');
      // replace cards with blank space
      cards[optionOneId].setAttribute('src', 'images/blank.png');
      cards[optionTwoId].setAttribute('src', 'images/blank.png');
      // add cards to cardsWon array
      cardsWon.push(cardsChosen);
      checkBlank();
    } else {
      // if not a match
      alert('Sorry, try again');
      // flip cards back over
      cards[optionOneId].setAttribute('src', 'images/front.png');
      cards[optionTwoId].setAttribute('src', 'images/front.png');
    }

    // clear arrays
    cardsChosen = [];
    cardsChosenId = [];

    // display score
    resultDisplay.textContent = cardsWon.length + ' out of 6';

    // if won game
    if (cardsWon.length === cardArray.length / 2) {
      score.textContent = '';
      aww.style.display = 'inline';
      aww.textContent = 'Awww, you do remember 🥰';
      restart.style.display = 'inline';
      restart.addEventListener('click', () => {
        window.location.reload();
      });
    }
  }

  // flip card
  function flipcard() {
    let cardId = this.getAttribute('data-id');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }

  checkDisplay();
  createBoard();
});

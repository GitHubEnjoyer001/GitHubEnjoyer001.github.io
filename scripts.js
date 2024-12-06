const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();

  //appel ma fonction verifier victoire
  verifierVictoire();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

//ce que je vais ajouter

/*ferme le dialogue jusqu'a la recharge de la page*/
function fermerDialogue()
{
  document.getElementById("boiteDialogue").close();
}

/*ferme le dialog pour toujours*/
function fermerPourDeVrai()
{
  localStorage.setItem("nePlusAfficher", "true");
  document.getElementById("boiteDialogue").close();
}

if(localStorage.getItem("nePlusAfficher") !== "true")
{
  document.getElementById("boiteDialogue").showModal();
}

/*ma fonction vérifie que toutes les cartes ont été retournées et va faire jouer la video de victoire*/
function verifierVictoire() 
{
  //Vérifie si toutes les cartes sont retournées (ont la classe 'flip')
  const flippedCards = document.querySelectorAll('.memory-card.flip');

  //affiche la video si toutes les cartes sont retournées
  if (flippedCards.length === cards.length)
  {
    const video = document.getElementById("videoVictoire");

    //fait en sorte que ma video de victoire recommence tout le temps au début
    video.currentTime = 0;
    video.play();

    //Affiche la vidéo de victoire
    document.getElementById("divVideoVictoire").style.display = "block"; 
    //affiche le bouton recommencer
    document.getElementById("recommencer").style.display = "block";
  }
}

/*ma fonction fait apparaitre mon bouton*/
function apparaitreBouton()
{
  document.getElementById("recommencer");
  window.location.reload();
}
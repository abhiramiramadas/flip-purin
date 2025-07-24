let flippedCards = [];
let moves = 0;
let matchedPairs = 0;

function shuffleCards() {
    const cards = document.querySelectorAll('.card');
    const array = Array.from(cards);
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    array.forEach((card, index) => {
        card.style.order = index;
    });
}

function resetGame() {
    flippedCards = [];
    moves = 0;
    matchedPairs = 0;
    document.getElementById('moves').textContent = moves;
    document.getElementById('winModal').style.display = 'none';
    shuffleCards();
}

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
            const flipSound = document.getElementById('flipSound');
            flipSound.currentTime = 0;
            flipSound.play().catch(error => console.log('Audio play failed:', error));

            card.classList.add('flipped');
            flippedCards.push(card);
            if (flippedCards.length === 2) {
                moves++;
                document.getElementById('moves').textContent = moves;
                const [card1, card2] = flippedCards;
                if (card1.dataset.image === card2.dataset.image) {
                    card1.classList.add('matched');
                    card2.classList.add('matched');
                    matchedPairs++;
                    flippedCards = [];
                    if (matchedPairs === 8) {
                        document.getElementById('winModal').style.display = 'flex';
                    }
                } else {
                    setTimeout(() => {
                        card1.classList.remove('flipped');
                        card2.classList.remove('flipped');
                        flippedCards = [];
                    }, 1000);
                }
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    shuffleCards();
});
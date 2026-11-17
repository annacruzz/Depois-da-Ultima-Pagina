
const books = [
    { title: "Orgulho e Preconceito", category: "Romance" },
    { title: "O Amor nos Tempos do Cólera", category: "Romance" },
    { title: "Uma Breve História do Tempo", category: "Ciências" },
    { title: "O Gene", category: "Ciências" },
    { title: "Harry Potter", category: "Fantasia" },
    { title: "O Senhor dos Anéis", category: "Fantasia" },
    { title: "Sapiens", category: "História" },
    { title: "A Arte da Guerra", category: "História" }
];

const booksContainer = document.getElementById("books-container");
const shelves = document.querySelectorAll(".shelf");
const scoreElement = document.getElementById("score");
const modal = document.getElementById("modal");
const restartButton = document.getElementById("restart-button");

let score = 0;
let selectedBook = null;
let organizedBooks = 0;

function startGame() {
    score = 0;
    organizedBooks = 0;
    selectedBook = null;

    scoreElement.textContent = score;
    booksContainer.innerHTML = "";
    modal.style.display = "none";

    document.querySelectorAll(".shelf-content").forEach(content => {
        content.innerHTML = "";
    });

    const shuffledBooks = [...books].sort(() => Math.random() - 0.5);

    shuffledBooks.forEach(book => {
        const bookElement = document.createElement("div");

        bookElement.classList.add("book");
        bookElement.textContent = book.title;
        bookElement.draggable = true;
        bookElement.dataset.category = book.category;

        bookElement.addEventListener("dragstart", () => {
            selectedBook = bookElement;
        });

        bookElement.addEventListener("dragend", () => {
            selectedBook = null;
        });

        bookElement.addEventListener("click", () => {
            document.querySelectorAll(".book").forEach(item => {
                item.classList.remove("selected");
            });

            selectedBook = bookElement;
            bookElement.classList.add("selected");
        });

        booksContainer.appendChild(bookElement);
    });
}

shelves.forEach(shelf => {

    shelf.addEventListener("dragover", event => {
        event.preventDefault();
        shelf.classList.add("drag-over");
    });

    shelf.addEventListener("dragleave", () => {
        shelf.classList.remove("drag-over");
    });

    shelf.addEventListener("drop", event => {
        event.preventDefault();
        shelf.classList.remove("drag-over");

        if (selectedBook) {
            organizeBook(shelf);
        }
    });

    shelf.addEventListener("click", event => {
        if (
            selectedBook &&
            !event.target.closest(".book") &&
            !selectedBook.classList.contains("selected") === false
        ) {
            organizeBook(shelf);
        }
    });
});

function organizeBook(shelf) {
    if (!selectedBook) return;

    const bookCategory = selectedBook.dataset.category;
    const shelfCategory = shelf.dataset.category;

    if (bookCategory === shelfCategory) {

        shelf.querySelector(".shelf-content").appendChild(selectedBook);

        selectedBook.classList.remove("selected");
        selectedBook.draggable = false;

        selectedBook = null;

        score += 10;
        organizedBooks++;

        scoreElement.textContent = score;

        if (organizedBooks === books.length) {
            setTimeout(() => {
                modal.style.display = "flex";
            }, 500);
        }

    } else {
        alert("Ops! Esse livro não pertence a esta estante.");
    }
}

restartButton.addEventListener("click", startGame);

startGame();

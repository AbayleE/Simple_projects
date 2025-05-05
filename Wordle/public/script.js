document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;
    let currentPosition = 0;
    let currentRow = 0;
    let currentGuess = '';
    let targetWord = '';

    function fetchRandomWord() {
        const url = "https://api.datamuse.com/words?sp=?????&max=500";
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const random_num = Math.floor(Math.random () * 501);
                const array_ = data[random_num];
                targetWord = array_.word;
                targetWord = targetWord.toUpperCase();
            })
            .catch(error => {
                console.error('Error Fetching data', error);
            })


    };

    fetchRandomWord();


    const main_div = document.createElement("div");
    main_div.classList.add("main_div");

    const instructions = document.createElement("div");
    instructions.innerHTML = `
    <ol class="wordle_instructions">
    <i class="fa-solid fa-paperclip"></i>
        <h2> How to Play? </h2>
        <li>Guess the <span class="highlight">5-letter word</span> in <span class="highlight">6 tries</span> or less.</li>
        <li>Each guess must be a valid <span class="highlight">5-letter word</span>.</li>
        <li><span class="tile correct">G</span> <strong>Green</strong> = correct letter, correct position</li>
        <li><span class="tile present">Y</span> <strong>Yellow</strong> = correct letter, wrong position</li>
        <li><span class="tile absent">N</span> <strong>Gray</strong> = letter not in the word</li>
    </ol>
    `;

    main_div.appendChild(instructions);


    const grid_div = document.createElement("div");
    grid_div.classList.add("grid_div");

    const header_title = document.createElement("h1");
    header_title.innerText = "Wordle";

    const wordle_grid = document.createElement("div");
    wordle_grid.classList.add("wordle_grid");

    for (let i = 0; i < 30; i++) {
        const cell_block = document.createElement('div');
        cell_block.classList.add('grid_item');
        cell_block.id = i;
        wordle_grid.appendChild(cell_block);
    }

    grid_div.append(header_title, wordle_grid);
    main_div.appendChild(grid_div);
    body.appendChild(main_div);



    const key_div = document.createElement("div");
    key_div.classList.add("key_div");

    const keys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
        'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
        'Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL'];

    const Top_row = document.createElement("div");
    Top_row.classList.add("key_row");

    for (let i = 0; i < 10; i++) {
        const key_block = document.createElement("button");
        key_block.classList.add('key_item');
        key_block.innerText = keys[i];
        key_block.addEventListener("click", handleKeyInput);
        Top_row.appendChild(key_block);
    }


    const Home_row = document.createElement("div");
    Home_row.classList.add("key_row");

    for (i = 10; i < 19; i++) {
        const key_block = document.createElement("button");
        key_block.classList.add('key_item');
        key_block.innerText = keys[i];
        key_block.addEventListener("click", handleKeyInput);
        Home_row.appendChild(key_block);

    }

    const Bottom_row = document.createElement("div");
    Bottom_row.classList.add("key_row");

    for (i = 19; i < 28; i++) {
        const key_block = document.createElement("button");
        key_block.classList.add('key_item');
        key_block.innerText = keys[i];
        key_block.addEventListener("click", handleKeyInput);
        Bottom_row.appendChild(key_block);

    }

    key_div.append(Top_row, Home_row, Bottom_row);
    body.appendChild(key_div);

    const displayBanner = document.createElement('div');
    displayBanner.classList.add('message_banner');
    displayBanner.style.visibility = "Hidden";
    body.appendChild(displayBanner);



    function handleKeyInput(ev) {
        const value = ev.target.innerText;
        if (value == 'Enter') {
            validateGuess();
        } else if (value == 'DEL') {
            removeInput();
        } else {
            addLetterToGuess(value);
        }
    }

    function removeInput() {
        let newcurrentPos = currentPosition;
        if (currentPosition % 5 !== 0) {
            newcurrentPos = currentPosition-1;
            currentGuess = currentGuess.slice(0, -1);
        }

        const cellBlock = document.getElementById(newcurrentPos);
        cellBlock.innerText = ' ';
        currentPosition = newcurrentPos;
    }

    function validateGuess() {

        if (currentGuess.length !== 5) {
            showMessage("Not enough letters", "error");
            return;
        }

        UpdateColor();

        if (currentGuess === targetWord) {
            resetBoard();
            showMessage(`🎉 You Won! ${targetWord}`, "success");
        } else {
            getCurrentRow();
            currentGuess = '';
        }

    }


    function UpdateColor() {
        const startPosition = currentPosition - 5;
        for (let i = 0; i < 5; i++) {
            const CellBlock = document.getElementById(startPosition + i);
            const guessChar = currentGuess[i].toUpperCase();
            const targetChar = targetWord[i].toUpperCase();
            if (guessChar === targetChar) {
                CellBlock.classList.add('correct');
            } else if (targetWord.includes(guessChar)) {
                CellBlock.classList.add('present');
            } else {
                CellBlock.classList.add('absent');
            }
        }
    }

    function addLetterToGuess(key) {
        const GetCellBlock = document.getElementById(currentPosition);
        GetCellBlock.innerText = key;
        currentPosition++;
        currentGuess += key.toUpperCase();
        if (currentPosition % 5 === 0) {
            console.log("Guess : ", currentGuess);
            validateGuess();
        }

    }

    function getCurrentRow() {
        if (currentPosition % 5 === 0) {
            currentRow++;
        }
        if (currentRow === 6) {
            resetBoard();
            showMessage(`❌ Game Over! The word was ${targetWord}`, "error");
        }
    }

    function resetBoard() {
        fetchRandomWord();
        for (let i = 0; i < 30; i++) {
            const block = document.getElementById(i);
            block.innerText = '';
            block.classList.remove('correct', 'present', 'absent');
        }
        currentPosition = 0;
        currentRow = 0;
        currentGuess = '';
    }

    function showMessage(message, type = "info") {
        let displayBanner = document.querySelector('.message_banner');
        displayBanner.style.visibility = "Visible";
        displayBanner.innerText = message;
        displayBanner.className = `message_banner ${type}`;
        setTimeout(() => {
            displayBanner. innerText = " ";
            displayBanner.style.visibility = "Hidden";
        }, 3000);

    }




});
let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

function addButtons(alphabet) {
    for (let index = 0; index < alphabet.length; index++) {
        const letter = alphabet[index];
        $("#buttons").append(`<button id=${index} value=${letter}>${letter.toUpperCase()}</button>`)

        $(`#${index}`).on("click", (event) => {
            let letterValue = event.target.value.toUpperCase();
            $("#info").text(`You have selected the letter: ${letterValue}`)

            getAuthors(letterValue)
        })
    };
};
addButtons(alphabet);

function getAuthors(letter) {
    let baseUrl = "http://localhost:3000/authors/filter/";
    let url = baseUrl + letter
    fetch(url)
        .then(response => response.json())
        .then(authors => {
            createAuthorsTable(authors)
            $("#authorsCount").text(`There are ${authors.length} that starts with the letter: ${letter}`);
        })
}

function createAuthorsTable(authorsArray) {
    let table = $("#body");
    let bookDetails;
    for (const author of authorsArray) {
        if (author.books) {
            bookDetails = true;
        } else {
            bookDetails = false;
        }

        table.append(`<tr>
                        <td>${author.id}</td>
                        <td>${author.name}</td>
                        <td>${author.bookCount}</td>
                        <td>${bookDetails}</td>
                    </tr>`)
    }
}


function clearTable() {
    $("#body").text("");
};

$("#clear").on("click", clearTable)
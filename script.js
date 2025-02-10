let searchInputE1 = document.getElementById("searchInput");
let spinnerE1 = document.getElementById("spinner");
let searchResultsE1 = document.getElementById("searchResults");

function appendBooks(result) {
    let imgUrl = result.imageLink;
    let authorName = result.author;


    let imageE1 = document.createElement("img");
    imageE1.src = imgUrl;
    searchResultsE1.appendChild(imageE1);

    let authorE1 = document.createElement("p");
    authorE1.classList.add("authorPara");
    authorE1.textContent = authorName;
    searchResultsE1.appendChild(authorE1);
}

function displayHttpRequestResults(search_results) {
    searchInputE1.value = '';
    let headingE1 = document.createElement("h1");
    headingE1.classList.add("errorHeading");
    searchResultsE1.appendChild(headingE1);

    let headingE2 = document.createElement("h1");
    headingE2.classList.add("popularBooks");
    searchResultsE1.appendChild(headingE2);
    if (search_results && search_results.length === 0) {
        spinnerE1.classList.add("d-none");
        headingE1.textContent = 'No results found';
    } else if (search_results) {
        spinnerE1.classList.remove("d-none");
        headingE2.textContent = 'Popular Books';
        for (let result of search_results) {
            appendBooks(result);
        }
    } else {
        spinnerE1.classList.add("d-none");
        headingE1.textContent = 'Error: Invalid response from server';
    }
}

searchInputE1.addEventListener("keydown", function(event) {
    let searchInputValue = event.target.value;
    searchResultsE1.textContent = "";
    if (event.key === "Enter") {
        spinnerE1.classList.remove("d-none");
        let url = `https://apis.ccbp.in/book-store?title=${searchInputValue}`;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                displayHttpRequestResults(jsonData.search_results);
            });
    }
});
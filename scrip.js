const accessKey = "44857418-bf4b2b0eef69108315559f3dc";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://pixabay.com/api/?key=${accessKey}&q=${encodeURIComponent(keyword)}&page=${page}&per_page=12`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (page === 1) {
            searchResult.innerHTML = "";
        }

        const results = data.hits;

        results.forEach((result) => {
            const image = document.createElement("img");
            image.src = result.webformatURL; // Use webformatURL for medium-sized images
            image.alt = result.tags;
            const imageLink = document.createElement("a");
            imageLink.href = result.pageURL;
            imageLink.target = "_blank";

            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);
        });

        // Show the "Show More" button if there are more results
        if (data.totalHits > page * 12) {
            showMoreBtn.style.display = "block";
        } else {
            showMoreBtn.style.display = "none";
        }

    } catch (error) {
        console.error("Error fetching the images:", error);
    }
}


searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});

const API_KEY = "1e6b492a6e6b482282e74d079dc942d9";
const BASE_URL = "https://newsapi.org/v2/everything?q=";


// Fetch default news on page load
window.addEventListener("load", () => fetchNews("Technology"));

async function fetchNews(query) {
    const response = await fetch(`${BASE_URL}${encodeURIComponent(query)}&apiKey=${API_KEY}`);
    const data = await response.json();
    console.log(data); // Check what you're getting
    bindData(data.articles); // Only if data.articles exists
}


function bindData(articles) {
    const cardContainer = document.getElementById("cardcontainer");
    const template = document.getElementById("template-news-cards");

    cardContainer.innerHTML = ""; // Clear previous results

    articles.forEach(article => {
        if (!article.urlToImage) return;

        const cardClone = template.content.cloneNode(true);

        // Bind data to card
        const newsImg = cardClone.querySelector("#news-img");
        const newsTitle = cardClone.querySelector("#news-title");
        const newsSource = cardClone.querySelector("#news-source");
        const newsDesc = cardClone.querySelector("#news-desc");
        const readMoreLink = cardClone.querySelector("a");

        newsImg.src = article.urlToImage;
        newsTitle.textContent = article.title;
        newsDesc.textContent = article.description;

        const date = new Date(article.publishedAt).toLocaleString("en-US", {
            timeZone: "Asia/Kolkata"
        });

        newsSource.textContent = `${article.source.name} • ${date}`;
       
readMoreLink.href = article.url;
        readMoreLink.target = "_blank"; 
        cardContainer.appendChild(cardClone);
    });
}

// Search functionality
const searchBtn = document.getElementById("searchBtn");
const searchBox = document.getElementById("searchBox");

searchBtn.addEventListener("click", () => {
    const query = searchBox.value.trim();
    if (!query) {
        alert("Please enter a search term.");
        return;
    }
    fetchNews(query).catch(error => console.error("Error fetching news:", error));
});
// Category click functionality
const categoryLinks = document.querySelectorAll(".links ul li");

categoryLinks.forEach(link => {
    link.addEventListener("click", () => {
        const category = link.textContent.trim();
        fetchNews(category).catch(error => console.error("Error fetching category news:", error));
    });
});


// News API key for authentication
const apiKey = '71b94df969e44c3384e64408a2145dbe';

// API endpoint URL for fetching news articles related to Daly City and San Francisco
const apiUrl = `https://newsapi.org/v2/everything?q=Daly+City+San+Francisco&apiKey=${apiKey}`;

// Make an AJAX request to the News API
$.ajax({
    url: apiUrl,
    method: 'GET',
    success: function (response) {
        // Extract the first 5 articles from the response
        const articles = response.articles.slice(0, 5);

        // Iterate through each article
        articles.forEach(function (article) {
            // Extract information about the article
            const title = article.title;
            const description = article.description;
            const url = article.url;

            // Create HTML elements for each article and append to the 'news-container' element
            const articleElement = `<div>
                <h2><a href="${url}" target="_blank">${title}</a></h2>
                <p>${description}</p>
            </div>`;

            $('#news-container').append(articleElement);
        });
    },
    // Handle errors if the API request fails
    error: function (error) {
        console.log(error);
    }
});

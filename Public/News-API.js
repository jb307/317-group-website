// article api

const apiKey = '71b94df969e44c3384e64408a2145dbe';
const apiUrl = `https://newsapi.org/v2/everything?q=Daly+City+San+Francisco&apiKey=${apiKey}`;

$.ajax({
    url: apiUrl,
    method: 'GET',
    success: function (response) {
        const articles = response.articles;

     
        articles.forEach(function (article) {
            const title = article.title;
            const description = article.description;
            const url = article.url;

            const articleElement = `<div>
                <h2><a href="${url}" target="_blank">${title}</a></h2>
                <p>${description}</p>
            </div>`;


            $('#news-container').append(articleElement);
        });
    },
    error: function (error) {
        console.log(error);
    }
});
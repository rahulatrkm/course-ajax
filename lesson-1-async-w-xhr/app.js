(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        const imgRequest = new XMLHttpRequest();
        imgRequest.onload = addImage;
        imgRequest.onerror = function(err) {
          requestError(err, 'image');
        }
        imgRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        imgRequest.setRequestHeader('Authorization', 'Client-ID 462d22cae6dd1d4877bb082c9e9c6502893a9bb730');
        imgRequest.send();
    });

function addImage(){
  let htmlContent = '';
  const data = JSON.parse.this.responseText;
  if (data && data.results && data.results[0]) {
    const firstImage = data.results[0];
    htmlC0ntent = `<figure>
      <img src="${firstImage.urls.regular}" alt="${searchedForText}">
      <figCaption>${searchedForText} by ${firstImage.user.name}</figCaption>
      </figure>`;
  } else {
    htmlContent = '<div class="error-no-image">No images available</div>';
  }
  responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
}

function addArticles() {
  let htmlContent = '';
  const data =JSON.parse(this.responseText);

  if (data.response && data.response.docs && data.response.docs.length > 1) {
    htmlContent = '<ul>' + data.response.docs.map(article => `<li class="article">
      <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
      <p>${article.snippet}</p>
      </li>`
    ).join('') + '</ul>';
  } else {
    htmlContent = '<div class="error-no-articles">No articles available</div>'
  }
  responseContainer.insertAdjacentHTML('beforeend', htmlContent);
}

function requestError(e,part) {
  console.log(e);
  responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning error-no-articles">No articles available</p>`);
})();

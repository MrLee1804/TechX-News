const generalBtn = document.getElementById("general");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sports");
const technologyBtn = document.getElementById("technology");
const entertainBtn = document.getElementById("entertainment");


// search box
const searchQuery = document.getElementById("searchquery")
const searchBtn = document.getElementById("searchBtn")


// news container
const newsType = document.getElementById("newstype")
const newsDetails = document.getElementById("newsdetails")


// Array
var newsData = [];


// API key
const apikey = "YOUR_NEWS_API_KEY" <!-- REPLACE THIS PART -->
const Headlines = "https://newsapi.org/v2/top-headlines?country=us&apiKey="
const General = "https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey="
const Business = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey="
const Sports = "https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey="
const Technology = "https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey="
const Entertain = "https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey="
const search = "https://newsapi.org/v2/everything?q="

// Add Event Listener Function

window.onload = function() {
    newsType.innerHTML = "<h2>Headlines</h2>"
    fetchHeadlines();
}

generalBtn.addEventListener('click', function(){
    newsType.innerHTML = "<h2>General News</h2>"
    fetchGeneralData();
});
businessBtn.addEventListener('click', function(){
    newsType.innerHTML = "<h4>Business News</h4>"
    fetchBusinessData();
});
sportsBtn.addEventListener('click', function(){
    newsType.innerHTML = "<h4>Sports News</h4>"
    fetchSportsData();
});
technologyBtn.addEventListener('click', function(){
    newsType.innerHTML = "<h4>Technology News</h4>"
    fetchTechnoData();
});
entertainBtn.addEventListener('click', function(){
    newsType.innerHTML = "<h4>Entertainment News</h4>"
    fetchEntertainData();
});

// Get Data Functions

searchBtn.addEventListener('click', function(){
    fetchSearchQuery();
});


const fetchHeadlines = async () => {
    const response = await fetch(Headlines+apikey);
    newsData = [];
    if(response.status >= 200) {
        const myJson = await response.json();
        newsData = myJson.articles;
    }else{
        // Error Handler
        console.log(response.status);
    }
    displayNews();
}


const fetchGeneralData = async () => {
    const response = await fetch(General+apikey);
    newsData = [];
    if(response.status >= 200) {
        const myJson = await response.json();
        newsData = myJson.articles;
    }else{
        // Error Handler
        console.log(response.status);
    }
    displayNews();
}

const fetchBusinessData = async () => {
    const response = await fetch(Business+apikey);
    newsData = [];
    if(response.status >= 200) {
        const myJson = await response.json();
        newsData = myJson.articles;
    }else{
        // Error Handler
        console.error(response.status, response.statusText);
    }
    displayNews();
}

const fetchSportsData = async () => {
    const response = await fetch(Sports+apikey);
    newsData = [];
    if(response.status >= 200) {
        const myJson = await response.json();
        newsData = myJson.articles;
    }else{
        // Error Handler
        console.error(response.status, response.statusText);
    }
    displayNews();
}

const fetchTechnoData = async () => {
    const response = await fetch(Technology+apikey);
    newsData = [];
    if(response.status >= 200) {
        const myJson = await response.json();
        newsData = myJson.articles;
        console.log(newsData)
    }else{
        // Error Handler
        console.error(response.status, response.statusText);
    }
    displayNews();
}

const fetchEntertainData = async () => {
    const response = await fetch(Entertain+apikey);
    newsData = [];
    if(response.status >= 200) {
        const myJson = await response.json();
        newsData = myJson.articles;
    }else{
        // Error Handler
        console.error(response.status, response.statusText);
    }
    displayNews();
}

// search Query News
const fetchSearchQuery = async () => {
    
    if(searchQuery.value == null) {
        newsDetails.innerHTML = "<h5>No Data Found</h5>"
        return;
    }
    
    const response = await fetch(search+searchQuery.value+"&apiKey="+apikey);
    newsData = [];
    if(response.status >= 200) {
        const myJson = await response.json();
        newsData = myJson.articles;
    }else{
        // Error Handler
        console.error(response.status, response.statusText);
    }
    displayNews();
}

function displayNews() {
    
    newsDetails.innerHTML = "";
    
    if(newsData.length == 0) {
        newsDetails.innerHTML = "<h5>No Data Found</h5>"
        return;
    }
    newsData.forEach(news => {
        
        var date = news.publishedAt.split('T')
        
        var col = document.createElement('div');
        col.className = "col-sm-12 col-md-4 col-lg-2 p-2 card";
        
        var card = document.createElement('div');
        card.className = "p-2";
        
        var image = document.createElement('img');
        image.setAttribute("height", "matchprent");
        image.setAttribute("width", "100%");
        image.src = news.urlToImage;
        
        var cardBody = document.createElement("div");
        
        var newsHead = document.createElement('h5');
        newsHead.className = "card-title mt-3";
        newsHead.innerHTML = news.title;
        
        var dateH = document.createElement('h6');
        dateH.className = "text-primary";
        dateH.innerHTML = date[1];
        
        var link = document.createElement('a');
        link.className = "btn btn-dark"
        link.setAttribute("target", "_blank")
        link.href = news.url;
        link.innerHTML = "Read More"
        
        var description = document.createElement('p');
        description.className = "text-muted";
        description.innerHTML = news.description;
        
        cardBody.appendChild(newsHead)
        cardBody.appendChild(dateH)
        cardBody.appendChild(description)
        cardBody.appendChild(link)
        
        card.appendChild(image)
        card.appendChild(cardBody)
        
        col.appendChild(card)
        
        newsDetails.appendChild(col)
    })
}

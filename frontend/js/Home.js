let newslist=[];

function addwatchlistcards(){
    const newcard = document.createElement('div');
    const stockname = document.createTextNode('APPL');
    const price = document.createTextNode('123');
  //  newcard.textContent="APPL";
  newcard.appendChild(stockname);
  newcard.appendChild(price);
    const div1= document.getElementById('cardcomponent');

   // document.body.insertBefore(newcard,currentdiv);
   div1.appendChild(newcard);
}

addwatchlistcards();

function addnewscards(){
    const newcard = document.createElement('div');
    const news = document.createTextNode('blah blah');
    const author = document.createTextNode('some author');
    newcard.appendChild(news);
    newcard.appendChild(author);
    newcard.classList.add('newscard');
    const newz = document.getElementById('cardcomponentofnews');
    newz.appendChild(newcard)

}

addnewscards();

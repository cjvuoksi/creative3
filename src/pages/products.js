import React from 'react';
import {useLocation, Link} from 'react-router-dom'

  
/*
cd public_html/react-website
npm run start
*/
  
function Products() {
    const location = useLocation(); 
    class Products extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                loaded: false,
                url: 'https://gutendex.com/books',
                urlParams: new URLSearchParams(),
                next: null,
                prev: null,
                count: 0,
                adv: true,
                content: [
                        {
                          "id": 37106,
                          "title": "Sample Book",
                          "authors": [
                            {
                              "name": "Author Name",
                              "birth_year": 1832,
                              "death_year": 1888
                            }
                          ],
                          "translators": [],
                          "subjects": [
                            "Autobiographical fiction",
                            "Bildungsromans",
                            "Domestic fiction",
                            "Family life -- New England -- Fiction",
                            "March family (Fictitious characters) -- Fiction",
                            "Mothers and daughters -- Fiction",
                            "New England -- Fiction",
                            "Sisters -- Fiction",
                            "Young women -- Fiction"
                          ],
                          "bookshelves": [],
                          "languages": [
                            "en"
                          ],
                          "copyright": false,
                          "media_type": "Text",
                          "formats": {
                            "text/html; charset=iso-8859-1": "https://www.gutenberg.org/files/37106/37106-h/37106-h.htm",
                            "text/plain; charset=us-ascii": "https://www.gutenberg.org/files/37106/37106.txt",
                            "image/jpeg": "https://www.gutenberg.org/cache/epub/37106/pg37106.cover.medium.jpg",
                            "text/plain": "https://www.gutenberg.org/ebooks/37106.txt.utf-8",
                            "application/rdf+xml": "https://www.gutenberg.org/ebooks/37106.rdf",
                            "application/epub+zip": "https://www.gutenberg.org/ebooks/37106.epub3.images",
                            "application/x-mobipocket-ebook": "https://www.gutenberg.org/ebooks/37106.kf8.images",
                            "text/html": "https://www.gutenberg.org/ebooks/37106.html.images"
                          },
                          "download_count": 109619
                        }
                    ]
            }
            this.getBooks = this.getBooks.bind(this);
            this.nextPage = this.nextPage.bind(this);
            this.prevPage = this.prevPage.bind(this); 
            this.getUrl = this.getUrl.bind(this); 
            this.upSort = this.upSort.bind(this); 
            this.upLang = this.upLang.bind(this); 
            this.upTopic = this.upTopic.bind(this); 
            this.handleSub = this.handleSub.bind(this); 
            this.toggleSearch = this.toggleSearch.bind(this); 
            this.getBooks(); 
        }
        //Accesses the gutendex api and returns an array of book objects
        getBooks(url="https://gutendex.com/books") {
            alert(url); 
            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then((json) => {
                    console.log(json); 
                    this.setState({content: json.results});
                    this.setState({count: json.count}); 
                    this.setState({next: json["next"]}); 
                    this.setState({prev: json.prev}); 
                    this.setState({loaded: true}); 
                    
                })
                .catch((error) => {
                    alert(error); 
                });
        }
        //Navigates to the next page if it exists
        nextPage() {
            if (this.state["next"]) {
                this.getBooks(this.state["next"])
            }
            else {
                alert("No new pages")
            }
        }
        //Navigates to the previous page if it exists
        prevPage() {
            if (this.state["prev"]) {
                this.getBooks(this.state["prev"])
            }
            else {
                alert("Page 1")
            }
        }
        
        //Gets url with search params
        getUrl() {
            this.state.urlParams.set("search", location.state.value); 
            if (location.state.value == "") {
                this.state.urlParams.delete("search"); 
            }
            if (Array.from(this.state.urlParams).length !== 0) {
                this.state.url = 'https://gutendex.com/books/?' ; 
            }
            return (this.state.url + this.state.urlParams.toString()).replaceAll('%2C', ','); 
        }
        
        //updates sorting type
        upSort(event) {
            this.state.urlParams.set("sort", event.target.value);
            this.getBooks(this.getUrl());
        }
        
        //updates language selection
        upLang(event) {
            var options = event.target.options;
            var value = [];
            for (var i = 0; i < options.length; i++) {
                if (options[i].selected) {
                    value.push(options[i].value);
                }
            }
            if (value[0] != "") {
                this.state.urlParams.set("languages",value.join(","));
            }
            else {
                this.state.urlParams.delete("languages"); 
            }
        }
        
        //updates topic
        upTopic(event) {
            if (event.target.value !== "") {
                this.state.urlParams.set("topic", event.target.value); 
            }
            else {
                this.state.urlParams.delete("topic"); 
            }
        }
        
        //handles submit
        handleSub(event) {
            event.preventDefault(); 
            this.getBooks(this.getUrl()); 
            this.render(); 
        }
        
        //toggles advanced search dropdown
        toggleSearch(event) {
            if (this.state.adv == true) {
                this.state.adv.setState(false); 
            }
            else {
                this.state.adv.setState(true); 
            }
            this.render()
        }
        
        render() {
            var productList = this.state.content.map((bookObj, i) => 
                <div key={bookObj.id} className="bookCover">
                    <h2 title={bookObj.id}>{bookObj.title}</h2>
                    <div className="book">
                        <div className={bookObj.authors.length == 0 ? "noDisp" : ""}>
                            <h4>{(bookObj.authors.length > 1 ? "Authors: " : "Author: ")}</h4>
                            <ul>
                                {bookObj.authors.map((authorObj) => <li>{authorObj.name}</li>)}
                            </ul>
                        </div>
                        <div className={bookObj.translators.length == 0 ? "noDisp" : ""}>
                            <h4>{(bookObj.translators.length > 1 ? "Translators: " : "Translator: ")}</h4>
                            <ul>
                                {bookObj.translators.map((translatorObj) => <li>{translatorObj.name}</li>)}
                            </ul>
                        </div>
                        <p>{bookObj.subjects.join(", ")}</p>
                        <a 
                            href={"https://www.gutenberg.org/ebooks/" + bookObj.id} 
                            target="_blank"
                            rel="noopener noreferrer"
                            >View
                        </a>
                    </div>
                </div>
            ); 
            
            var advSearch = (
                <div className={[(this.state.adv ? "": "hidden"),"search"].join(' ')} onClick={this.toggleSearch}>
                    Advanced Search
                    <div className="searchGrid">
                        <div>
                        <label>By language <br></br></label>
                        <select onChange={this.upLang} size="4" multiple>
                            <option value="" selected>All</option>
                            <option value="da">Dansk</option>
                            <option value="de">Deutsch</option>
                            <option value="en">English</option>
                            <option value="el">Ελληνικά</option>
                            <option value="es">Español</option>
                            <option value="fi">Suomi</option>
                            <option value="fr">Français</option>
                            <option value="hu">Magyar</option>
                            <option value="it">Italiano</option>
                            <option value="la">Latina</option>
                            <option value="pt">Português</option>
                            <option value="sv">Svenska</option>
                            <option value="tl">Tagalog</option>
                            <option value="zh">中文</option>
                        </select>
                        </div>
                        <div>
                        <input placeholder="Search by topic" onChange={this.upTopic}></input>
                        </div>
                        <div>
                        <button type="Submit">Apply</button>
                        </div>
                    </div>
                </div>    
            );

        
            return (
                <div className={this.state.loaded ? "" : "loading"}>
                    <form onSubmit={this.handleSub}>
                        <select onChange={this.upSort}>
                            <option value="" selected>Sort by...</option>
                            <option value="">popularity</option>
                            <option value="ascending">ascending</option>
                            <option value="descending">descending</option>
                        </select>
                        
                        {advSearch}
                    </form>
                    <p>{this.state.count + " results found" + (location.state.value ? " for query " + location.state.value : "")}</p>
                    <div className="bookShelf"> {productList} </div>
                    <div> 
                    <button onClick={this.prevPage}>Previous</button>
                    <button onClick={this.nextPage}>Next</button>
                    </div>
                </div>
            );
        }
    }
    
    // <option value=""></option>
    
    return (
        <div>
            <h1>Products</h1>
            <Products /> 
        </div>
    );
}
  
export default Products; 
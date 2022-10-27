import React, { useState } from 'react';
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
            this.toggleMenu = this.toggleMenu.bind(this); 
            this.getBooks(); 
        }
        //Accesses the gutendex api and returns an array of book objects
        getBooks(url="https://gutendex.com/books") {
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
        
        //Toggles advanced search
        toggleMenu(event) {
            if (event.target.classList.contains("search")) event.target.classList.toggle("hidden"); 
        }
        
        
        render() {
            var productList = this.state.content.map((bookObj, i) => 
                <div key={bookObj.id} className="bookCover">
                    <h2 title={bookObj.id}>{bookObj.title}</h2>
                    <div className="book">
                        <div className={bookObj.authors.length == 0 ? "noDisp" : ""}>
                            <h4><i>{"By "} 
                                {bookObj.authors.map((authorObj) => 
                                    authorObj.name.split(',').reverse().join(" ")).join(", ")}</i>
                            </h4>
                        </div>
                        <div className={bookObj.translators.length == 0 ? "noDisp" : ""}>
                            <h4><i>{"Translated by "}
                                {bookObj.translators.map((translatorObj) => translatorObj.name.split(',').reverse().join(' ')).join(", ")}</i>
                            </h4>
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
            
            const advSearch = (
                <div className={["hidden","search"].join(' ')} onClick={this.toggleMenu}tabindex={1}>
                    Advanced Search
                    <div className="searchGrid">
                        <div>
                        <input placeholder="Search by topic" onChange={this.upTopic}></input>
                        </div>
                        <div>
                        <label>By language  <br></br></label>
                        <select onChange={this.upLang} size="4" multiple tabindex={-1}>
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
                        <button type="Submit" tabindex={-1}>Apply</button>
                    </div>
                </div>    
            );

        
            return (
                <div className={this.state.loaded ? "" : "loading"}>
                    <form onSubmit={this.handleSub}>
                        <select onChange={this.upSort} className="sort">
                            <option value="" selected>Sort by...</option>
                            <option value="">popularity</option>
                            <option value="ascending">ascending</option>
                            <option value="descending">descending</option>
                        </select>
                        
                        {advSearch}
                    </form>
                    <p><i>{this.state.count + " results found" + (location.state.value ? " for query " + location.state.value : "")}</i></p>
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
            <h1>Books</h1>
            <Products /> 
        </div>
    );
}
  
export default Products; 
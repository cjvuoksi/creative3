import React from 'react';
import {useLocation} from 'react-router-dom'
  
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
                next: null,
                prev: null,
                count: 0,
                sort: "",
                filter: ["","", ""],
                adv: false,
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
            this.filter = this.filter.bind(this); 
            this.upSort = this.upSort.bind(this); 
            this.upLang = this.upLang.bind(this); 
            this.upTopic = this.upTopic.bind(this); 
            this.handleSub = this.handleSub.bind(this); 
            this.toggleSearch = this.toggleSearch.bind(this); 
            this.getBooks(); 
        }
        //Accesses the gutendex api and returns an array of book objects
        getBooks(filter="", url="https://gutendex.com/books") {
            url += filter; 
            if (location.hasOwnProperty('state') && location.state.value) {
                url += filter.length != 0 ? '&' : '?';  
                url += "search=" + location.state.value; 
            }
            alert(url)
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
        
        //Filters results
        filter() {
            let filtered = this.state.filter.filter((item) => item != "")
            if (filtered.length > 1) {
            return "?" + filtered.join('&'); 
            }
            else {
                if (filtered[0]) return "?" + filtered[0]
            }
            return "";
        }
        
        //updates sorting type
        upSort(event) {
            this.state.filter[0] = event.target.value;
            alert("updating"); 
            this.getBooks(this.filter());
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
                this.state.filter[1] = "languages=" + value.join();
            }
            else {
                this.state.filter[1] = ""; 
            }
            alert(this.filter());
            this.getBooks(this.filter()); 
        }
        
        //updates topic
        upTopic(event) {
            this.state.filter[2] = "topic=" + event.target.value; 
        }
        
        //handles submit
        handleSub() {
            alert("Submit: " + this.filter()); 
            this.getBooks(this.filter()); 
        }
        
        //toggles advanced search dropdown
        toggleSearch(event) {
            if (this.state.adv) {
                this.state.adv = false; 
            }
            else {
                this.state.adv = true; 
            }
            event.target.classList.toggle("hidden"); 
        }
        
        render() {
            var productList = this.state.content.map((bookObj, i) => 
                <ul key={i}>
                    <li>{bookObj.title}</li>  
                    <li>{bookObj.authors.length > 0 ? bookObj.authors[0].name : ""}</li>
                    <li>{bookObj.id}</li>
                    <li>{bookObj.subjects.join(", ")}</li>
                </ul>
            ); 
            
            var advSearch = (
                <div className="hidden" onClick={this.toggleSearch}>
                    Advanced Search
                    <div>
                        <input placeholder="Search by topic" onChange={this.upTopic}></input>
                        <button type="Submit">Apply</button>
                    </div>
                </div>    
            );

        
            return (
                <div className={this.state.loaded ? "" : "loading"}>
                    <form onSubmit={this.handleSub}>
                        <select onChange={this.upSort}>
                            <option value="" selected>Sort by...</option>
                            <option value="sort">popularity</option>
                            <option value="sort=ascending">ascending</option>
                            <option value="sort=descending">descending</option>
                        </select>
                        <label>Filter language</label>
                        <select onChange={this.upLang} multiple id='lang'>
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
                        {advSearch}
                    </form>
                    <p>{this.state.count + " results found" + (location.state.value ? " for query " + location.state.value : "")}</p>
                    <div> {productList} </div>
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
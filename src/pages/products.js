import React from 'react';
import {useLocation} from 'react-router-dom'
  
function Products() {
    const location = useLocation(); 
    class Products extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
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
            this.getBooks(); 
        }
        //Accesses the gutendex api and returns an array of book objects
        getBooks(url="https://gutendex.com/books", filter="") {
            url += filter; 
            if (location.hasOwnProperty('state') && location.state.value) {
                url += "?search=" + location.state.value; 
            }
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
        
        
        render() {
            var productList = this.state.content.map((bookObj, i) => 
                <ul key={i}>
                    <li>{bookObj.title}</li>  
                    <li>{bookObj.authors.length > 0 ? bookObj.authors[0].name : ""}</li>
                    <li>{bookObj.id}</li>
                </ul>
            ); 
        
            return (
                <div>
                    <button onClick={this.getBooks}>Get Books</button>
                    <p>{"results: " + this.state.count}</p>
                    <div> {productList} </div>
                    <div> 
                    <button onClick={this.prevPage}>Previous</button>
                    <button onClick={this.nextPage}>Next</button>
                    </div>
                </div>
            );
        }
    }
    
    
    
    return (
        <div>
            <h1>Products</h1>
            <Products /> 
        </div>
    );
}
  
export default Products; 
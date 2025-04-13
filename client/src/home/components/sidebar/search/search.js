import './search.css'
function Search({ searchKey, setSearchKey }) { //here same name as in sidebar bcoz we are using destructuring array
    return (
        <div className="user-search-area">
            <input type="text" className="user-search-text"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)} />
            <i className="fa fa-search user-search-button"></i>

        </div>
    )
}
export default Search;
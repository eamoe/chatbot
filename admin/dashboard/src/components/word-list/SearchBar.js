const SearchBar = ({filterText, onFilterTextChange}) => {
    return (
        <form>
            <div className="mb-3">
                <input type="text"
                       value={filterText}
                       onChange={(e) => onFilterTextChange(e.target.value)}
                       className="form-control"
                       placeholder="Search..."/>
            </div>
        </form>
    );
}

export default SearchBar

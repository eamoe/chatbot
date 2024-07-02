const SearchBar = ({filterText, onFilterTextChange}) => {
    return (
        <form>
            <div className="row mt-5">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <div className="mb-3">
                        <input type="text"
                               value={filterText}
                               onChange={(e) => onFilterTextChange(e.target.value)}
                               className="form-control"
                               placeholder="Search..."/>
                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>
        </form>
    );
}

export default SearchBar

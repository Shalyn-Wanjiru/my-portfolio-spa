
function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <input
      type="text"
      className="search-input"
      placeholder="Search Projects..."
      value={searchTerm}
      onChange={(event) => onSearchChange(event.target.value)}
    />
  )
}

export default SearchBar

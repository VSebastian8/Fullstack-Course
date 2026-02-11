const SearchFilter = ({ searchString, setSearchString }) => {
  const changeSearch = (event) => {
    setSearchString(event.target.value);
  };

  return (
    <div>
      show names containing:{" "}
      <input value={searchString} onChange={changeSearch} />
    </div>
  );
};

export default SearchFilter;

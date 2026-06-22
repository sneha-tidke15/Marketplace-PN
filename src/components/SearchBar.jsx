import SearchSuggestions from "./SearchSuggestions";

export default function SearchBar({ value, onChange, placeholder = "Search handmade products..." }) {
  return <SearchSuggestions value={value} onChange={onChange} placeholder={placeholder} />;
}

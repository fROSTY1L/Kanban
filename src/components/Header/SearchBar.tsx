import { useState } from "react";
import { Icon, Input, SecondWrap, Wrap } from "../../styles/Header/SearchBar.style";
import icon from "../../assets/Header/search.png";
import { useDispatch } from "react-redux";
import { setSearch } from "../../store/slices/searchSlice";

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useDispatch();
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  return (
    <Wrap isFocused={isFocused}>
      <SecondWrap>
        <Icon src={icon} />
        <Input
          placeholder="поиск..."
          onFocus={() => setIsFocused(true)} 
          onBlur={() => setIsFocused(false)} 
          onChange={handleSearch}
        />
      </SecondWrap>
    </Wrap>
  );
};

export default SearchBar;

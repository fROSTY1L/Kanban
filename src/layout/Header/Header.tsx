import SearchBar from "../../components/Header/SearchBar";
import { Title } from "../../components/Header/Title";
import { Wrap } from "../../styles/Header/Header.style";

export default function Header() {
  return (
    <Wrap>
      <Title/>
      <SearchBar/>
    </Wrap>
  )
}

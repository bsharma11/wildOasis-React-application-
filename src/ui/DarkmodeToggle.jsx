import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../context/Darkmodecontext";

function DarkmodeToggle() {
  const { isDarkmode, ToggledarkMode } = useDarkMode();

  return (
    <ButtonIcon onClick={ToggledarkMode}>
      {isDarkmode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkmodeToggle;

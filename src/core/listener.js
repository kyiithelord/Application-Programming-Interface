import { debounce } from "lodash";
import {
  courseEditFormHandler,
  courseFormHandler,
  editCellHandler,
  rowGroupHandler,
  searchInputHandler,
} from "./handler";
import { courseEditForm, courseForm, rowGroup, searchInput } from "./selector";

const listener = () => {
  courseForm.addEventListener("submit", courseFormHandler);
  rowGroup.addEventListener("click", rowGroupHandler);
  courseEditForm.addEventListener("submit", courseEditFormHandler);
  rowGroup.addEventListener("dblclick", editCellHandler);
  searchInput.addEventListener("keyup", debounce(searchInputHandler, 500));
};
export default listener;

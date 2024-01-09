import {
  courseEditFormHandler,
  courseFormHandler,
  editCellHandler,
  rowGroupHandler,
} from "./handler";
import { courseEditForm, courseForm, rowGroup } from "./selector";

const listener = () => {
  courseForm.addEventListener("submit", courseFormHandler);
  rowGroup.addEventListener("click", rowGroupHandler);
  courseEditForm.addEventListener("submit", courseEditFormHandler);
  rowGroup.addEventListener("dblclick", editCellHandler);
};
export default listener;

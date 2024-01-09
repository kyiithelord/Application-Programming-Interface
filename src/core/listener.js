import {
  courseEditFormHandler,
  courseFormHandler,
  rowGroupHandler,
} from "./handler";
import { courseEditForm, courseForm, rowGroup } from "./selector";

const listener = () => {
  courseForm.addEventListener("submit", courseFormHandler);
  rowGroup.addEventListener("click", rowGroupHandler);
  courseEditForm.addEventListener("submit", courseEditFormHandler);
};
export default listener;

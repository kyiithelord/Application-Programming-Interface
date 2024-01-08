import { courseFormHandler, rowGroupHandler } from "./handler";
import { courseForm, rowGroup } from "./selector";

const listener = () => {
  courseForm.addEventListener("submit", courseFormHandler);
  rowGroup.addEventListener("click", rowGroupHandler);
};
export default listener;

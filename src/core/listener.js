import { courseFormHandler } from "./handler";
import { courseForm } from "./selector";

const listener = () => {
    courseForm.addEventListener("submit",courseFormHandler)
};
export default listener;

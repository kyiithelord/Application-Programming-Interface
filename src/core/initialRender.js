import { rowRender, url } from "./functions";

const initialRender = () => {
  fetch(url("/courses"))
    .then((res) => res.json())
    .then((json) => rowRender(json));
};
export default initialRender;

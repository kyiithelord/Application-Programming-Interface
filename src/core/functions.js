import { baseUrl } from "./config";
import { rowGroup, rowTemplate } from "./selector";

export const rowUi = ({ id, title, short_name, fee }) => {
  const row = rowTemplate.content.cloneNode(true);
  row.querySelector(".row-id").innerText = id;
  row.querySelector(".row-title").innerText = title;
  row.querySelector(".row-short").innerText = short_name;
  row.querySelector(".row-fee").innerText = fee;
  return row;
};
export const rowRender = (rows) => {
  rowGroup.innerHTML = "";
  rows.forEach((row) => rowGroup.append(rowUi(row)));
};

export const url = (path) => {
  return baseUrl + path;
};

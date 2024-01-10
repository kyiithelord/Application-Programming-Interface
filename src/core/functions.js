import Swal from "sweetalert2";
import { baseUrl } from "./config";
import { editDrawer, rowGroup, rowTemplate } from "./selector";

export const rowUi = ({ id, title, short_name, fee }) => {
  const row = rowTemplate.content.cloneNode(true);
  row.querySelector("tr").setAttribute("course-id", id);
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

export const toast = (message, icon = "success") => {
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: icon,
    title: message,
  });
};

export const confirmBox = (
  approve,
  title = "Are you sure to delete?",
  text = "You won't be able to revert this!",
  icon = "warning",
  confirmButtonText = "Confirm"
) => {
  Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText,
  }).then((result) => {
    if (result.isConfirmed) {
      approve();
    }
  });
};

export const removeRow = (id) => {
  const currentRow = document.querySelector(`tr[course-id='${id}']`);
  confirmBox(async () => {
    currentRow.querySelector(".row-del").toggleAttribute("disabled");
    const res = await fetch(url("/courses/" + id), { method: "DELETE" });
    currentRow.querySelector(".row-del").toggleAttribute("disabled");
    if (res.status === 204) {
      toast("Course Delete");
      currentRow.remove();
    }
  });
};

export const editRow = async (id) => {
  const currentRow = document.querySelector(`tr[course-id='${id}']`);
  currentRow.querySelector(".row-edit").toggleAttribute("disabled");
  const res = await fetch(url("/courses/" + id));
  const json = await res.json();
  currentRow.querySelector(".row-edit").toggleAttribute("disabled");
  courseEditForm.querySelector("#edit_course_id").value = json.id;
  courseEditForm.querySelector("#edit_course_title").value = json.title;
  courseEditForm.querySelector("#edit_short_name").value = json.short_name;
  courseEditForm.querySelector("#edit_course_fee").value = json.fee;

  editDrawer.show();
};

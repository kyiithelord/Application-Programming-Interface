import Swal from "sweetalert2";
import { rowUi, toast, url } from "./functions";
import { courseEditForm, courseForm, editDrawer, rowGroup } from "./selector";

export const courseFormHandler = (event) => {
  event.preventDefault();

  const formData = new FormData(courseForm);
  const jsonData = JSON.stringify({
    title: formData.get("course_title"),
    short_name: formData.get("short_name"),
    fee: formData.get("course_fee"),
  });
  const myHeader = new Headers();
  myHeader.append("Content-Type", "application/json");
  //   disable form
  courseForm.querySelector("button").toggleAttribute("disabled");
  fetch(url("/courses"), {
    method: "POST",
    headers: myHeader,
    body: jsonData,
  })
    .then((res) => res.json())
    .then((json) => {
      courseForm.querySelector("button").toggleAttribute("disabled");

      rowGroup.append(rowUi(json));
      courseForm.reset();
      toast("Added Course Successfully");
    });
};

export const rowGroupHandler = (event) => {
  if (event.target.classList.contains("row-del")) {
    const currentRow = event.target.closest("tr");
    const currentRowId = currentRow.getAttribute("course-id");

    Swal.fire({
      title: "Are you sure to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        event.target.toggleAttribute("disabled");
        fetch(url("/courses/" + currentRowId), { method: "DELETE" }).then(
          (res) => {
            event.target.toggleAttribute("disabled");

            if (res.status === 204) {
              toast("Course Delete Successfully");
              currentRow.remove();
            }
          }
        );
      }
    });
  } else if (event.target.classList.contains("row-edit")) {
    // first to take old value
    // update changes
    const currentRow = event.target.closest("tr");
    const currentRowId = currentRow.getAttribute("course-id");
    event.target.toggleAttribute("disabled");
    fetch(url("/courses/" + currentRowId))
      .then((res) => res.json())
      .then((json) => {
        // show old value
        event.target.toggleAttribute("disabled");
        courseEditForm.querySelector("#edit_course_id").value = json.id;
        courseEditForm.querySelector("#edit_course_title").value = json.title;
        courseEditForm.querySelector("#edit_short_name").value =
          json.short_name;
        courseEditForm.querySelector("#edit_course_fee").value = json.fee;

        editDrawer.show();
      });
  }
};

export const courseEditFormHandler = (event) => {
  event.preventDefault();

  //url
  //header
  const myHeader = new Headers();
  myHeader.append("Content-Type", "application/json");
  //body
  const formData = new FormData(courseEditForm);
  //id
  const currentId = formData.get("edit_course_id");
  const jsonData = JSON.stringify({
    title: formData.get("edit_course_title"),
    short_name: formData.get("edit_short_name"),
    fee: formData.get("edit_course_fee"),
  });
  //method
  courseEditForm.querySelector("button").toggleAttribute("disabled");
  fetch(url("/courses/" + currentId), {
    method: "PUT",
    headers: myHeader,
    body: jsonData,
  })
    .then((res) => res.json())
    .then((json) => {
      courseEditForm.querySelector("button").toggleAttribute("disabled");
      courseEditForm.reset();
      editDrawer.hide();

      const currentRow = document.querySelector(`tr[course-id='${json.id}']`);
      currentRow.querySelector(".row-title").innerText = json.title;
      currentRow.querySelector(".row-short").innerText = json.short_name;
      currentRow.querySelector(".row-fee").innerText = json.fee;
    });
};

export const editCellHandler = (event) => {
  if (event.target.classList.contains("cell-editable")) {
    const currentRow = event.target.closest("tr");
    const currentRowId = currentRow.getAttribute("course-id");
    const currentCell = event.target;
    const currentText = currentCell.innerText;
    const currentCellColumnName = currentCell.getAttribute("cell-col");
    currentCell.innerText = "";
    const input = document.createElement("input");
    input.value = currentText;
    input.className =
      "bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-blue-600 dark:placeholder-blue-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
    currentCell.append(input);
    input.focus();

    input.addEventListener("blur", () => {
      const newValue = input.value;
      currentCell.innerText = newValue;
      const myHeader = new Headers();
      myHeader.append("Content-Type", "application/json");
      const updateData = {};
      updateData[currentCellColumnName] = newValue;
      const jsonData = JSON.stringify(updateData);
      fetch(url("/courses/" + currentRowId), {
        method: "PATCH",
        headers: myHeader,
        body: jsonData,
      })
        .then((res) => res.json())
        .then((json) => toast("Update Successfully"));
    });
  }
};

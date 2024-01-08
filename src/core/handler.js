import Swal from "sweetalert2";
import { rowUi, toast, url } from "./functions";
import { courseForm, rowGroup } from "./selector";

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
    const currentRowId = currentRow.getAttribute("course-id");
  }
};

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

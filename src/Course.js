import initialRender from "./core/initialRender";
import listener from "./core/listener";

export class Course {
  init() {
    console.log("App start");
    initialRender();
    listener();
  }
}

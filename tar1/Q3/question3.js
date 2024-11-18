class Time {
  constructor(c, h, m, s) {
    this.cityName = c;
    this.hours = h;
    this.minutes = m;
    this.seconds = s;
  }

  get CityName() {
    return this.CityName;
  }
  set CityName(name) {
    this.CityName = name;
  }
  get Hours() {
    return this.hours;
  }
  set Hours(value) {
    this.Hours = value;
  }

  get Minutes() {
    return this.minutes;
  }
  set Minutes(value) {
    this.Minutes = value;
  }
  get Seconds() {
    return this.seconds;
  }
  set Seconds(value) {
    this.Seconds = value;
  }

  convertToSeconds() {
    return this.hours * 3600 + this.minutes * 60 + this.seconds * 1;
  }
  show() {
    return `${this.hours.toString().padStart(2, "0")}:${this.minutes
      .toString()
      .padStart(2, "0")}:${this.seconds.toString().padStart(2, "0")}`;
  }
}

let timesArr = [];
let submissionCount = 0;

$(document).ready(() => {
  $("#submit").click(() => {
    let c = $("#cityName").val();
    let h = $("#hours").val();
    let m = $("#minutes").val();
    let s = $("#seconds").val();
    if (validation(c, h, m, s)) {
      t = new Time(c, h, m, s);
      timesArr.push(t);
      submissionCount++;
      $("#clickCount").text(submissionCount);
    } else alert("Please insert invalid inputs!!!");
    if (submissionCount == 5) {
      $("#submit").prop("disabled", true).addClass("disabled-button");
      $("#output").empty();
      str = "";
      for (let i = 0; i < timesArr.length; i++) {
        str += `
          <div class="time-item">
             <div> ${i + 1}:</div>
             <div>city: ${timesArr[i].cityName}</div>
             <div>time: ${timesArr[i].show()}</div>
             <div>total seconds: ${timesArr[i].convertToSeconds()}</div>
           </div>
            `;
      }
      $("#output").html(str);
    }
  });
});

validation = (c, h, m, s) => {
  if (
    c == "" ||
    h < 0 ||
    h > 23 ||
    m < 0 ||
    m > 59 ||
    s < 0 ||
    s > 59 ||
    h == "" ||
    m == "" ||
    s == ""
  )
    return false;
  return true;
};

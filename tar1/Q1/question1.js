class Counter {
  constructor() {
    this.number = 0;
  }
  get Number() {
    return this.number;
  }
  set Number(value) {
    this.number = value;
  }
  Initialize = () => this.Number = $("#counterValue").val();
  
  Increment=() => $("#counterValue").val(++this.Number);
  Go() {
    let str = "";
    for (let i = 0; i <= this.Number; i++) {
      str += `<p>${i}</p>`;
    }
    return str;
  }
}

let c;
$(document).ready(() => {
  $("#btnStart").click(() => {
    if (!$("#counterValue").val()) alert("Please enter a number first!");
    else {
      c = new Counter();
      c.Initialize();
      $("#counterValue").prop("readonly", true);
    }
  });
  $("#btnAdd").click(() => {
    if (!c) alert("Please click Start first!!");
    else c.Increment();
  });
  $("#btnGo").click(() => {
    if (!c) alert("Please click Start first!!");
    else $("#output").html(c.Go());
  });
});

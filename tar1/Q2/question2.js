class Duck {
  constructor(n, a, c, w, i) {
    this.Name = n;
    this.Color = c;
    this.Age = a;
    this.Weight = w;
    this.ImgURL = i;
  }
  get Name() {
    return this.name;
  }
  set Name(value) {
    this.name = value;
  }
  get Age() {
    return this.age;
  }
  set Age(value) {
    this.age = value;
  }
  get Color() {
    return this.color;
  }
  set Color(value) {
    this.color = value;
  }
  get Weight() {
    return this.weight;
  }
  set Weight(value) {
    this.weight = value;
  }
  get ImgURL() {
    return this.imgURL;
  }
  set ImgURL(value) {
    this.imgURL = value;
  }
}

let d;
$(document).ready(() => {
  $("#submit").click(() => {
    $("#show").show();
    $("#quack").show();
    $("#submit").prop("disabled", true).addClass("disabled-button");
    $("#name").prop("readonly", true);
    $("#age").prop("readonly", true);
    $("#color").prop("readonly", true);
    $("#weight").prop("readonly", true);
    $("#image").prop("readonly", true);
    d = new Duck(
      $("#name").val(),
      $("#age").val(),
      $("#color").val(),
      $("#weight").val(),
      $("#image").val()
    );
  });

  $("#show").click(() => {
    $("#duckDisplay").html(`
        <h3>Duck Details</h3>
        <p><strong>Name:</strong> ${d.Name}</p>
        <p><strong>Color:</strong> ${d.Color}</p>
        <p><strong>Age:</strong> ${d.Age}</p>
        <p><strong>Weight:</strong> ${d.Weight} kg</p>
        <p><img src="${d.ImgURL}" alt="Duck Image" width="100"></p>
    `);
  });
  $("#quack").click(() => {
    let str = "";
    for (let index = 0; index <= (d.Age * d.Weight) / 2; index++) {
      str += "Quack ";
    }
    $("#duckDisplay").html(`${str}`);
    const $quackSound = $("#quackSound")[0];
    const playQuackSound = () => {
      $quackSound.currentTime = 0;
      $quackSound.play();
    };
    playQuackSound();
    setTimeout(playQuackSound, 500);
    setTimeout(playQuackSound, 1000);
  });
});

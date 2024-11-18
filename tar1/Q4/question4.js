class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  get X() {
    return this.x;
  }
  set X(value) {
    this.x = value;
  }
  get Y() {
    return this.y;
  }
  set Y(value) {
    this.y = value;
  }

  show() {
    return `(${this.X},${this.Y})`;
  }
  Equal(p) {
    return this.X == p.X && this.Y == p.Y;
  }
}
checkPoint = (x, y, pointsArr) => {
  for (let point of pointsArr) {
    if (point.X === x && point.Y === y) {
      return true;
    }
  }
  return false;
};

checkPoint2 = (p, pointsArr) => {
  for (let point of pointsArr) {
    if (point.Equal(p)) {
      return true;
    }
  }
  return false;
};

sortPointsByX = (pointsArr) => {
  return pointsArr.sort((a, b) => {
    if (a.X !== b.X) {
      return a.X - b.X;
    }
    return a.Y - b.Y;
  });
};
calculateDistances = (p1, p2) => {
  return Math.sqrt(Math.pow(p2.Y - p1.Y, 2) + Math.pow(p2.X - p1.X, 2));
};
$(document).ready(() => {
  // Test code
  pointsArr = [
    new Point(6, 1),
    new Point(1.4, 2.1),
    new Point(5, 4),
    new Point(3, 6),
  ];
  console.log(checkPoint(1, 2, pointsArr)); // true
  console.log(checkPoint(3, 3, pointsArr)); // false
  console.log(checkPoint2(new Point(3, 4), pointsArr)); // true
  console.log(checkPoint2(new Point(3, 3), pointsArr)); // false

  const drawPoint = (point, index) => {
    const scale = 40;
    const x = point.X * scale;
    const y = 400 - point.Y * scale;
    const pointElement = $("<div>")
      .addClass("point")
      .css({
        left: x + "px",
        top: y + "px",
      });

    const label = $("<div>")
      .addClass("point-label")
      .text(`P${index + 1}(${point.X},${point.Y})`);

    pointElement.append(label);
    $("#grid").append(pointElement);
  };

  const drawLines = (points) => {
    $(".line").remove();
    for (let i = 0; i < points.length - 1; i++) {
      const scale = 40;
      const x1 = points[i].X * scale;
      const y1 = 400 - points[i].Y * scale;
      const x2 = points[i + 1].X * scale;
      const y2 = 400 - points[i + 1].Y * scale;

      const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;

      const line = $("<div>")
        .addClass("line")
        .css({
          left: x1 + "px",
          top: y1 + "px",
          width: length + "px",
          transform: `rotate(${angle}deg)`,
        });
      $("#grid").append(line);
    }
  };
  const updateVisualization = () => {
    $("#grid").empty();
    sortedPoints = sortPointsByX(pointsArr);
    sortedPoints.forEach((point, index) => {
      drawPoint(point, index);
    });
    drawLines(sortedPoints);
    $("#points-list").html(
      "<h4>Points (sorted by X):</h4>" +
        sortedPoints.map((p, i) => `Point ${i + 1}: ${p.show()}`).join("<br>")
    );
    let distancesHtml = "<h4>Distances:</h4>";
    let total = 0;
    for (let i = 0; i < sortedPoints.length - 1; i++) {
      const distance = calculateDistances(sortedPoints[i], sortedPoints[i + 1]);
      total += distance;
      distancesHtml += `From ${sortedPoints[i].show()} to ${sortedPoints[
        i + 1
      ].show()}: ${distance.toFixed(2)}<br>`;
    }
    $("#distances").html(distancesHtml);
    $("#total-distance").html(`<h4>Total Distance: ${total.toFixed(2)}</h4>`);
  };
  $("#add-point").click(() => {
    const x = $("#x-input").val();
    const y = $("#y-input").val();

    if (!isNaN(x) && !isNaN(y)) {
      const newPoint = new Point(x, y);
      if (!checkPoint2(newPoint, pointsArr)) {
        pointsArr.push(newPoint);
        console.log(pointsArr);
        updateVisualization();
        $("#x-input").val("");
        $("#y-input").val("");
      } else {
        alert("This point already exists!");
      }
    } else {
      alert("Please enter valid coordinates!");
    }
  });
  updateVisualization();
});

let image_input = document.querySelector("#image_input");
let uploaded_image = "";

//SVG img
let bg = document.getElementById("bg-img");
let im = document.getElementById("img");
//hidden click
let im_img = document.getElementById("image_button");
im_img.addEventListener("click", () => {
  image_input.click();
});

//load img
image_input.addEventListener("change", function () {
  // console.log(image_input.value);
  let reader = new FileReader();
  reader.addEventListener("load", () => {
    uploaded_image = reader.result;

    bg.setAttribute("xlink:href", uploaded_image);

    im.setAttribute("xlink:href", uploaded_image);
  });
  reader.readAsDataURL(this.files[0]);
  count0 = 0;
  rightBtn0.innerText = "White Glass";
});

//button white glass
let glass0 = document.querySelector("#glass");
let rightBtn0 = document.querySelectorAll("button")[1];
let count0 = 0;
rightBtn0.addEventListener("click", () => {
  if (count0 >= 1) {
    rightBtn0.innerText = "White Glass";
    im.setAttribute("xlink:href", uploaded_image);
    count0 = 0;
  } else {
    rightBtn0.innerText = "Normal Glass";
    im.setAttribute("xlink:href", "img/white.jpg");
    count0++;
  }
});

let glass = document.querySelector("#glass");
let leftBtn = document.querySelectorAll("button")[2];
let count1 = 0;
leftBtn.addEventListener("click", () => {
  if (count1 >= 1) {
    leftBtn.innerText = "Blur Sunglass";
    im.classList.remove("blur");
    count1 = 0;
  } else {
    leftBtn.innerText = "Unblur Sunglass";
    im.classList.add("blur");
    count1++;
  }
});

// button center
let body = document.querySelector("body");
let centerBtn = document.querySelectorAll("button")[3];
let count2 = 0;
centerBtn.addEventListener("click", () => {
  if (count2 >= 1) {
    centerBtn.innerText = "Blur Image";
    bg.classList.remove("blur");
    count2 = 0;
  } else {
    centerBtn.innerText = "Unblur Image";
    bg.classList.add("blur");
    count2++;
  }
});

// button Rigth
let rightBtn = document.querySelectorAll("button")[4];
let count3 = 0;
rightBtn.addEventListener("click", () => {
  if (count3 >= 1) {
    rightBtn.innerText = "Hide Image";
    bg.classList.remove("hideImage");
    count3 = 0;
  } else {
    rightBtn.innerText = "Show Image";
    bg.classList.add("hideImage");
    count3++;
  }
});

//move image
var svgElement = document.querySelector("svg");
var lenses = document.querySelector("#lenses");
var wayfarers = document.querySelector("#wayfarers");
var svgPoint = svgElement.createSVGPoint();

function cursorPoint(e, svg) {
  svgPoint.x = e.clientX;
  svgPoint.y = e.clientY;
  return svgPoint.matrixTransform(svg.getScreenCTM().inverse());
}

function update(svgCoords) {
  var wayWidth = wayfarers.getBoundingClientRect().width;
  var wayHeight = wayfarers.getBoundingClientRect().height;
  var coos =
    svgCoords.x / 2 - wayWidth / 4 + " " + (svgCoords.y / 2 - wayHeight / 4);
  lenses.setAttribute("transform", "scale(2) translate(" + coos + ")");
  wayfarers.setAttribute("transform", "scale(2) translate(" + coos + ")");
}

wayfarers.addEventListener("mousedown", () => {
  svgElement.addEventListener("mousemove", moving);
});

function moving(e) {
  //   console.log("hi");
  update(cursorPoint(e, svgElement));
}

svgElement.addEventListener("mouseup", () => {
  //   console.log("hee");
  svgElement.removeEventListener("mousemove", moving);
});

// for mobile
svgElement.addEventListener(
  "touchmove",
  function (e) {
    // console.log("hiho");
    e.preventDefault();
    var touch = e.targetTouches[0];
    if (touch) {
      update(cursorPoint(touch, svgElement));
    }
  },
  false
);

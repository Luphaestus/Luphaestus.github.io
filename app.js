// Dynamically calculate the number of columns and rows based on viewport size
let columns = Math.floor(document.body.clientWidth / (document.body.clientWidth * .08)) + 1;
let rows = Math.floor(document.body.clientHeight / (document.body.clientWidth * .08)) + 1;

let toggled = false;

// Toggle function to switch between toggled and untoggled states
const toggle = () => {
  toggled = !toggled;
  document.body.classList.toggle("toggled");
};

// Function to handle tile click events
const tileClicked = (index) => {
  toggle();

  var blob = document.querySelector('.blob');

  var targetOpacity = toggled ? 0 : 1;
  blob.style.transition = 'opacity .5s ease';
  blob.style.opacity = targetOpacity;

  if (!toggled) {
    const menu = document.getElementById('menu');
    menu.style.zIndex = 0;
  } else {
    const title = document.getElementById('title');
    title.style.transition = 'opacity .5s ease';
    title.style.opacity = 0;
  }

  const itemahah = document.getElementById('menu-items');
  itemahah.style.opacity = toggled ? 1 : 0;
  itemahah.style.transition = `opacity ${!toggled ? 0.5 : 1.4}s ease`;

  const menudecor = document.getElementById('menu-decorations');
  menudecor.style.opacity = toggled ? 1 : 0;
  menudecor.style.transition = `opacity ${!toggled ? 0.5 : 1.4}s ease`;

  // Animate tiles
  anime({
    targets: ".tile",
    opacity: toggled ? 0 : 1,
    delay: anime.stagger(50, {
      grid: [columns, rows],
      from: index,
    })
  });

  setTimeout(() => {
    const menu = document.getElementById('menu');
    menu.style.zIndex = toggled ? 10 : 0;

    const title = document.getElementById('title');
    title.style.transition = 'opacity .5s ease';
    title.style.opacity = toggled ? 0 : 1;
  }, 700);

};

// Initialize tile wrapper with grid layout
const tileWappper = document.querySelector(".tiles");
tileWappper.style.setProperty("--columns", columns);
tileWappper.style.setProperty("--rows", rows);

// Function to create a single tile element
const createTile = (index) => {
  const tile = document.createElement("div");
  tile.classList.add("tile");
  tile.onclick = (e) => tileClicked(index);
  return tile;
};

// Function to create tiles based on the specified quantity
const createTiles = (quantity) => {
  Array.from(Array(quantity)).map((tile, index) => {
    tileWappper.appendChild(createTile(index));
  });
};

// Create tiles for the initial grid
createTiles(columns * rows);

// Function to recreate grid on window resize
const createGird = () => {
  if (toggled) return
  tileWappper.innerHTML = "";
  let newColumns = Math.floor(document.body.clientWidth / (document.body.clientWidth * .08)) + 1;
  let newRows = Math.floor(document.body.clientHeight / (document.body.clientWidth * .08)) + 1;
  tileWappper.style.setProperty("--columns", newColumns);
  tileWappper.style.setProperty("--rows", newRows);
  createTiles(newColumns * newRows);
  columns = newColumns;
  rows = newRows;
};

window.onresize = () => createGird();

// Blob animation on pointer move
const blob = document.querySelector(".blob");
document.body.onpointermove = event => {
  const { clientX, clientY } = event;
  const blobWidth = blob.offsetWidth;
  const blobHeight = blob.offsetHeight;
  const blobX = clientX - blobWidth / 2;
  const blobY = clientY - blobHeight / 2;
  blob.animate({
    left: `${blobX}px`,
    top: `${blobY}px`
  }, { duration: 3000, fill: "forwards" });
};

// Flag to track whether menu is active
let inmenu = false;
function scaleSVG() {

  if (inmenu) {
    var menuClose = document.getElementById('rsquare');

    var viewportWidth = window.innerWidth * 2;
    var viewportHeight = window.innerHeight * 2;
    var viewportDiagonal = Math.max(viewportWidth, viewportHeight);

    menuClose.style.transition = `width 2000ms ease-in-out, height 2000ms ease-in-out`;
    menuClose.style.width = viewportDiagonal * 2 + "px";
    menuClose.style.height = viewportDiagonal * 2 + "px";
  }
}

// Event listeners for menu items
const menu = document.getElementById("menu");
const letters = "abcdefghijklmnopqrstuvwxyz";
// let iterations = 0;
// Array.from(document.getElementsByClassName("menu-item"))
//   .forEach((item, index) => {
//
//
//     item.addEventListener("mouseover", function() {
//      if (!inmenu)
//      {document.querySelector("#rsquaresvg path").setAttribute("fill", "url(#grad" + (index+1) + ")");
//     var path = document.querySelector("#rsquaresvg path");
//     path.style.fillOpacity = 0;
//     path.style.transition = "fill-opacity 0.5s ease";
//     path.style.fillOpacity = 1;
//     }});
//
//
//     item.addEventListener('click', function () {
//       console.log(index);
//       inmenu = true;
//       scaleSVG();
//     });
//     item.onmouseover = event => {
//       menu.dataset.activeIndex = index;
//       const interval = setInterval(() => {
//
//         event.target.innerText = event.target.innerText.split("")
//           .map((letter, index) => {
//             if (index < iterations) {
//               return event.target.dataset.value[index];
//             }
//             return letters[Math.floor(Math.random() * 26)];
//           })
//           .join("");
//
//         if (iterations >= event.target.dataset.value.length) {
//           iterations = 0;
//           clearInterval(interval);
//         }
//
//         iterations += (1 / 3);
//       }, 30);
//     }
//   })

let interval; // Declare interval variable outside the event listener functions

Array.from(document.getElementsByClassName("menu-item")).forEach((item, index) => {
    item.addEventListener("mouseout", function() {
   resetMenuItems();
});

    item.addEventListener("mouseover", function() {
        if (!inmenu) {
            clearInterval(interval); // Clear interval when moving to a different text item
            document.querySelector("#rsquaresvg path").setAttribute("fill", "url(#grad" + (index+1) + ")");
            var path = document.querySelector("#rsquaresvg path");
            path.style.fillOpacity = 0;
            path.style.transition = "fill-opacity 0.5s ease";
            path.style.fillOpacity = 1;
            document.querySelector("#rsquaresvg").style.scale = 1.3;
        }
    });

    item.addEventListener('click', function () {
        console.log(index);
        inmenu = true;
        scaleSVG();
    });

    item.onmouseover = event => {
        clearInterval(interval); // Clear interval when moving to a different text item
        menu.dataset.activeIndex = index;
        let iterations = 0; // Reset iterations when moving to a different text item
        interval = setInterval(() => {
            event.target.innerText = event.target.innerText.split("")
                .map((letter, index) => {
                    if (index < iterations) {
                        return event.target.dataset.value[index];
                    }
                    return letters[Math.floor(Math.random() * 26)];
                })
                .join("");

            if (iterations >= event.target.dataset.value.length) {
                iterations = 0;
                clearInterval(interval);
            }

            iterations += (1 / 3);
        }, 30);
    }
});

function resetMenuItems() {
    document.querySelectorAll('.menu-item').forEach((item, index) => {
      console.log(index)
        item.innerText = item.dataset.value;
    });
}


window.addEventListener('resize', scaleSVG);
document.querySelector('.icon-tabler-square-rotated').addEventListener('click', function () {
  var menuClose = document.getElementById('rsquare');
  menuClose.style.transition = `width 1000ms ease-in-out, height 1000ms ease-in-out`;
  menuClose.style.height = "";
  menuClose.style.width = "";
  inmenu = false;
});

document.getElementById("menu-items").addEventListener("mouseout", function() {
   if (!inmenu) document.querySelector("#rsquaresvg path").style.fillOpacity = 0;
    document.querySelector("#rsquaresvg").style.scale = "";
});


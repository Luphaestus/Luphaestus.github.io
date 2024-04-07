let columns = Math.floor(document.body.clientWidth / 100) + 1;
let rows = Math.floor(document.body.clientHeight / 100) + 1;

let toggled = false;

const toggle = () => {
  toggled = !toggled;
  document.body.classList.toggle("toggled");
};

const tileClicked = (index) => {
  toggle();
  anime({
    targets: ".tile",
    opacity: toggled ? 0 : 1,
    delay: anime.stagger(50, {
      grid: [columns, rows],
      from: index,
    }),
  });
};

const tileWappper = document.querySelector(".tiles");
tileWappper.style.setProperty("--columns", columns);
tileWappper.style.setProperty("--rows", rows);

const createTile = (index) => {
  const tile = document.createElement("div");
  tile.classList.add("tile");
  tile.onclick = (e) => tileClicked(index);
  return tile;
};

const createTiles = (quantity) => {
  Array.from(Array(quantity)).map((tile, index) => {
    tileWappper.appendChild(createTile(index));
  });
};

createTiles(columns * rows);

const createGird = () => {
  tileWappper.innerHTML = "";
  let newColumns = Math.floor(document.body.clientWidth / 100) + 1;
  let newRows = Math.floor(document.body.clientHeight / 100) + 1;
  tileWappper.style.setProperty("--columns", newColumns);
  tileWappper.style.setProperty("--rows", newRows);
  createTiles(newColumns * newRows);
  columns = newColumns;
  rows = newRows;
};

window.onresize = () => createGird();

const blob = document.querySelector(".blob");
document.body.onpointermove = event => {
    const { clientX, clientY } = event;
    // Calculate the center position of the blob
    const blobWidth = blob.offsetWidth;
    const blobHeight = blob.offsetHeight;
    const blobX = clientX - blobWidth / 2;
    const blobY = clientY - blobHeight / 2;
    // Set the position of the blob
    blob.animate({
      left: `${blobX}px`,
      top: `${blobY}px`
    }, { duration: 3000, fill: "forwards" });
};

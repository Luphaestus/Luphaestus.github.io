let columns = Math.floor(document.body.clientWidth / 100) + 1;
let rows = Math.floor(document.body.clientHeight / 100) + 1;

let toggled = false;

const toggle = () => {
  toggled = !toggled;
  document.body.classList.toggle("toggled");
};

const tileClicked = (index) => {
  toggle();

  var blob = document.querySelector('.blob');


  var targetOpacity = toggled ? 0 : 1;
  blob.style.transition = 'opacity .5s ease';
  blob.style.opacity = targetOpacity;

  if (!toggled)
  {
    const menu = document.getElementById('menu');
    menu.style.zIndex =  0;



  }
  else
  {
    const title = document.getElementById('title');
    title.style.transition = 'opacity .5s ease';
    title.style.opacity = 0;
  }

    const itemahah = document.getElementById('menu-items');
    itemahah.style.opacity =toggled ? 1 : 0;
    itemahah.style.transition = `opacity ${!toggled ? 0.5 : 1.4}s ease`;

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
  if(toggled) return
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
    const blobWidth = blob.offsetWidth;
    const blobHeight = blob.offsetHeight;
    const blobX = clientX - blobWidth / 2;
    const blobY = clientY - blobHeight / 2;
    blob.animate({
      left: `${blobX}px`,
      top: `${blobY}px`
    }, { duration: 3000, fill: "forwards" });
};


const menu = document.getElementById("menu");

Array.from(document.getElementsByClassName("menu-item"))
  .forEach((item, index) => {
    item.onmouseover = () => {
      menu.dataset.activeIndex = index;
    }
  })

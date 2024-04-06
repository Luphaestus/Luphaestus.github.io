document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("container");
  const boxes = [];

  // Create and append boxes to the container
  for (let i = 0; i < 64; i++) { // 8 columns * 8 rows = 64 boxes
    const box = document.createElement("div");
    box.classList.add("box");
    container.appendChild(box);
    boxes.push(box);
  }

  // Add click event listener to each box
  boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
      removeBoxes(index);
    });
  });

  // Function to remove boxes
  function removeBoxes(index) {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const distances = [];

    // Calculate distance of each box from the mouse cursor
    boxes.forEach((box, i) => {
      const rect = box.getBoundingClientRect();
      const boxX = rect.left + rect.width / 2;
      const boxY = rect.top + rect.height / 2;
      const distance = Math.sqrt((boxX - centerX) ** 2 + (boxY - centerY) ** 2);
      distances.push({ index: i, distance });
    });

    // Sort boxes based on distance
    distances.sort((a, b) => a.distance - b.distance);

    // Remove boxes starting from the closest to the mouse cursor
    distances.forEach((obj, i) => {
      if (obj.index !== index) {
        setTimeout(() => {
          boxes[obj.index].style.backgroundColor = "transparent";
        }, i * 50);
      }
    });
  }
});

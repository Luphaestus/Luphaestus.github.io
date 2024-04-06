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
    box.addEventListener("click", (event) => {
      const clickedIndex = index;
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      toggleBoxVisibility(clickedIndex, mouseX, mouseY);
    });
  });

  // Function to toggle box visibility and apply ripple effect
  function toggleBoxVisibility(clickedIndex, mouseX, mouseY) {
    const distances = [];

    // Calculate distance of each box from the mouse position
    boxes.forEach((box, i) => {
      const rect = box.getBoundingClientRect();
      const boxX = rect.left + rect.width / 2;
      const boxY = rect.top + rect.height / 2;
      const distance = Math.sqrt((boxX - mouseX) ** 2 + (boxY - mouseY) ** 2);
      distances.push({ index: i, distance });
    });

    // Sort boxes based on distance
    distances.sort((a, b) => a.distance - b.distance);

    // Toggle visibility and apply ripple effect starting from the clicked box
    let isVisible = true;
    distances.forEach((obj, i) => {
      if (obj.index === clickedIndex || !isVisible) {
        boxes[obj.index].style.backgroundColor = isVisible ? "transparent" : "black";
        isVisible = !isVisible;
      }
    });
  }
});

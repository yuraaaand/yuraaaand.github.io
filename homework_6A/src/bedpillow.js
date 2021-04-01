// This file updates selection information and
// visual indication of number of items added cart

// Still needs to work on adding the selected items to the API
document.getElementById("add-to-cart").onclick = function () {
    var item = document.getElementById("add-to-cart");
    var name = item.getAttribute("data-name");
    var color = item.getAttribute("data-color");
    var insert = item.getAttribute("data-insert");
    var price = Number(item.getAttribute("data-price"));
    shoppingCart.addItemToCart(name, color, insert, price, 1);
    displayCart();
  };
  
  // Highlight color selection
  var prevColor = document.getElementById("color-highlight");
  function selectColor(elem) {
    console.log(elem.classList.value);
    if (elem.classList.value == "color pink") {
      document.getElementById("bigbedpillow").src =
        "images/big-pinkbedpillow.png";
    }
    if (elem.classList.value == "color green") {
      document.getElementById("bigbedpillow").src =
        "images/big-greenbedpillow.png";
    }
    if (elem.classList.value == "color grey") {
      document.getElementById("bigbedpillow").src =
        "images/big-greybedpillow.png";
    }
    if (elem.classList.value == "color blue") {
      document.getElementById("bigbedpillow").src =
        "images/big-bluebedpillow.png";
    }
    prevColor.removeAttribute("id");
    elem.id = "color-highlight";
    prevColor = elem;
  }
  
  // Highlight insert selection
  var prevInsert = document.getElementById("insert-highlight");
  function selectInsert(elem) {
    prevInsert.removeAttribute("id");
    elem.id = "insert-highlight";
    prevInsert = elem;
  }
  
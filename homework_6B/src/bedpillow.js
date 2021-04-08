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
      var cartArray = shoppingCart.listCart();
  console.log(cart);
    displayCart();
  };
  
  // Highlight color selection
  var prevColor = document.getElementById("color-highlight");
  function selectColor(elem) {
    console.log(elem.classList.value);
    document.getElementById("add-to-cart").setAttribute('data-price', '35.99');
    if (elem.classList.value == "color pink") {
      document.getElementById("bigbedpillow").src =
        "images/big-pinkbedpillow.png";
      document.getElementById("add-to-cart").setAttribute('data-color', 'After School Special');
      console.log(document.getElementById("add-to-cart").getAttribute('data-color'));
    }
    if (elem.classList.value == "color green") {
      document.getElementById("bigbedpillow").src =
        "images/big-greenbedpillow.png";
      document.getElementById("add-to-cart").setAttribute('data-color', 'Morning Haze');

    }
    if (elem.classList.value == "color grey") {
      document.getElementById("bigbedpillow").src =
        "images/big-greybedpillow.png";
      document.getElementById("add-to-cart").setAttribute('data-color', 'Rainy Day');

    }
    if (elem.classList.value == "color blue") {
      document.getElementById("bigbedpillow").src =
        "images/big-bluebedpillow.png";
      document.getElementById("add-to-cart").setAttribute('data-color', 'Cozy Denim');

    }
    prevColor.removeAttribute("id");
    elem.id = "color-highlight";
    prevColor = elem;
  }
  
  // Highlight insert selection
  var prevInsert = document.getElementById("insert-highlight");
  function selectInsert(elem) {
    document.getElementById("add-to-cart").setAttribute('data-price', '35.99');
    if (elem.classList.value == "inserts memoryfoam") {
      document.getElementById("add-to-cart").setAttribute('data-insert', 'Memory Foam');
    }
    if (elem.classList.value == "inserts duckdown") {
      document.getElementById("add-to-cart").setAttribute('data-insert', 'Duck Down');
    }
    if (elem.classList.value == "inserts polyblend") {
      document.getElementById("add-to-cart").setAttribute('data-insert', 'Hypoallergenic Poly-blend');
    }


    prevInsert.removeAttribute("id");
    elem.id = "insert-highlight";
    prevInsert = elem;
  }
  
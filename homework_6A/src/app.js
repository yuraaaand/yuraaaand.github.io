// ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function() {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];
    
    // Constructor
    function Item(name, color, insert, price, count) {
      this.name = name;
      this.color = color;
      this.insert = insert;
      this.price = price;
      this.count = count;
    }
    
    // Save cart
    function saveCart() {
      sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
    
      // Load cart
    function loadCart() {
      cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
      loadCart();
    }
    
  
    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};
    
    // Add to cart
    obj.addItemToCart = function(name, color, insert, price, count) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart[item].count ++;
          saveCart();
          return;
        }
      }
      var item = new Item(name, color, insert, price, count);
      cart.push(item);
      saveCart();
    }
    // Set count from item
    obj.setCountForItem = function(name, color, insert, count) {
      for(var i in cart) {
        if (cart[i].name === name && cart[i].color === color && cart[i].insert === insert) {
          cart[i].count = count;
          break;
        }
      }
    };
    // Remove item from cart
    obj.removeItemFromCart = function(name, color, insert) {
        for(var item in cart) {
          if(cart[item].name === name && cart[i].color === color && cart[i].insert === insert) {
            cart[item].count --;
            if(cart[item].count === 0) {
              cart.splice(item, 1);
            }
            break;
          }
      }
      saveCart();
    }
  
    // Remove all items from cart
    obj.removeItemFromCartAll = function(name, color, insert) {
      for(var item in cart) {
        if(cart[item].name === name && cart[i].color === color && cart[i].insert === insert) {
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    }
  
    // Clear cart
    obj.clearCart = function() {
      cart = [];
      saveCart();
    }
  
    // Count cart 
    obj.totalCount = function() {
      var totalCount = 0;
      for(var item in cart) {
        totalCount += cart[item].count;
      }
      return totalCount;
    }
  
    // Total cart
    obj.totalCart = function() {
      var totalCart = 0;
      for(var item in cart) {
        totalCart += cart[item].price * cart[item].count;
      }
      return Number(totalCart.toFixed(2));
    }
  
    // List cart
    obj.listCart = function() {
      var cartCopy = [];
      for(i in cart) {
        item = cart[i];
        itemCopy = {};
        for(p in item) {
          itemCopy[p] = item[p];
  
        }
        itemCopy.total = Number(item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy)
      }
      return cartCopy;
    }
  
    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
  })();
  
  
  // *****************************************
  // Triggers / Events
  // ***************************************** 
  // Add item
//   console.log(document.getElementById("add-to-cart").name);
//   document.getElementById("add-to-cart").onclick = function () {
//       var item = document.getElementById("add-to-cart");
//       var name = item.getAttribute("data-name");
//       var color = item.getAttribute("data-color");
//       var insert = item.getAttribute("data-insert");
//       var price = Number(item.getAttribute("data-price"));
//     //   console.log( item.getAttribute("data-name"));
//       shoppingCart.addItemToCart(name, color, insert, price, 1);
//       displayCart();
//   }

//   $('.add-to-cart').click(function(event) {
//     event.preventDefault();
//     var name = $(this).data('name');
//     var color = $(this).data('color');
//     var insert = $(this).data('insert');
//     var price = Number($(this).data('price'));
//     shoppingCart.addItemToCart(name, color, insert, price, 1);
//     displayCart();
//   });
  
  // Clear items
//   $('.clear-cart').click(function() {
//     shoppingCart.clearCart();
//     displayCart();
//   });
  
  
  function displayCart() {
    var cartArray = shoppingCart.listCart();
    // var output = "";
    console.log(cartArray);
    // for(var i in cartArray) {
    //   output += "<tr>"
    //     + "<td>" + cartArray[i].name + "</td>" 
    //     + "<td>(" + cartArray[i].price + ")</td>"
    //     + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
    //     + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
    //     + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
    //     + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
    //     + " = " 
    //     + "<td>" + cartArray[i].total + "</td>" 
    //     +  "</tr>";
    // }
    // $('.show-cart').html(output);
    // $('.total-cart').html(shoppingCart.totalCart());

    document.getElementById("total-count").innerHTML = shoppingCart.totalCount();
    // $('.total-count').html(shoppingCart.totalCount());
  }
  
//   // Delete item button
  
//   $('.show-cart').on("click", ".delete-item", function(event) {
//     var name = $(this).data('name')
//     shoppingCart.removeItemFromCartAll(name);
//     displayCart();
//   })
  
  
//   // -1
//   $('.show-cart').on("click", ".minus-item", function(event) {
//     var name = $(this).data('name')
//     shoppingCart.removeItemFromCart(name);
//     displayCart();
//   })
//   // +1
//   $('.show-cart').on("click", ".plus-item", function(event) {
//     var name = $(this).data('name')
//     shoppingCart.addItemToCart(name);
//     displayCart();
//   })
  
//   // Item count input
//   $('.show-cart').on("change", ".item-count", function(event) {
//      var name = $(this).data('name');
//      var count = Number($(this).val());
//     shoppingCart.setCountForItem(name, count);
//     displayCart();
//   });
  
  displayCart();
  
function toCart() {
    window.open("cart.html", "_self");
}
  
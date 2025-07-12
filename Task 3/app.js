//add product

const sendData = function (event) {
  event.preventDefault();
  const formData = {
    name: document.querySelector('input[name="productName"]').value,
    price: document.querySelector('input[name="productPrice"]').value,
    stock: document.querySelector('input[name="productStock"]').value,
    description: document.querySelector('textarea[name="productDes"]').value,
  };
  const xhr = new XMLHttpRequest();
  xhr.open(
    "POST",
    "http://shehabeldenashraf.es/api/product/addProduct.php",
    true
  );
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  const params = new URLSearchParams({
    name: formData.name,
    price: formData.price,
    description: formData.description,
    stock: formData.stock,
  });

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        try {
          const data = JSON.parse(xhr.responseText);
          console.log("Success:", data.message.product);
          if (data.message.product === undefined) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Unexpected Response",
            });
          } else {
            Swal.fire({
              title: "Request Sent!",
              text: "Product Added!",
              icon: "success",
            });

          }
        } catch (e) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Invalid JSON response: ${e}`,
          });
          console.error("Invalid JSON response:", e);
          console.log("Raw response:", xhr.responseText);
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Request failed: ${xhr.status}, ${xhr.statusText}`,
        });
        console.error("Request failed:", xhr.status, xhr.statusText);
      }
    }
  };
  xhr.send(params.toString());
};

//delete product
function deleteProduct(event) {
  event.preventDefault();

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://23.94.153.158/api/product/deleteProduct.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  const params = new URLSearchParams({
    id: document.querySelector('input[name="productId"]').value,
  });

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log("Success: Product deleted");
        console.log("Raw response:", xhr.responseText);

        Swal.fire({
          title: "Success!",
          text: "Product Deleted Successfully!",
          icon: "success",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Request failed: ${xhr.status}, ${xhr.statusText}`,
        });
        console.error("Request failed:", xhr.status, xhr.statusText);
      }
    }
  };

  xhr.send(params.toString());
}

//update product

const updateProduct = function (event) {
  event.preventDefault();
  const formData = {
    id: document.querySelector('input[name="productId"]').value,
    name: document.querySelector('input[name="productName"]').value,
    price: document.querySelector('input[name="productPrice"]').value,
    stock: document.querySelector('input[name="productStock"]').value,
    description: document.querySelector('textarea[name="productDes"]').value,
  };
  const xhr = new XMLHttpRequest();
  xhr.open(
    "POST",
    "http://shehabeldenashraf.es/api/product/updateProduct.php",
    true
  );
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  const params = new URLSearchParams({
    id:formData.id,
    name: formData.name,
    price: formData.price,
    description: formData.description,
    stock: formData.stock,
  });

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        try {
          const data = JSON.parse(xhr.responseText);
          console.log("Success",data);
            Swal.fire({
              title: "Request Sent!",
              text: "Product Updated Successfully!",
              icon: "success",
            });
    
        } catch (e) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Invalid JSON response: ${e}`,
          });
          console.error("Invalid JSON response:", e);
          console.log("Raw response:", xhr.responseText);
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Request failed: ${xhr.status}, ${xhr.statusText}`,
        });
        console.error("Request failed:", xhr.status, xhr.statusText);
      }
    }
  };
  xhr.send(params.toString());
};


function getAllProducts() {
    console.log("getAllProducts function called"); // Debug log
    
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://23.94.153.158/api/product/getAllProducts.php", true);
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    const products = JSON.parse(xhr.responseText);
                    console.log("Parsed products:", products);
                    displayProductsInHTML(products.message);
                    
                } catch(e) {
                    console.error("JSON parsing error:", e);
                    console.log("Raw response that failed to parse:", xhr.responseText);
                }
            } else {
                console.error("Request failed with status:", xhr.status, xhr.statusText);
            }
        }
    };
    
    xhr.send();
}

function displayProductsInHTML(products) {
    
    const container = document.getElementById('productsList');
    
    if (!container) {
        console.error("Container element 'productsList' not found!");
        return;
    }
    
    if (Array.isArray(products) && products.length > 0) {
        let html="";
        
        products.forEach(product => {
            html += `
                <div style="border: 1px solid #ccc; margin: 10px; padding: 10px; border-radius: 5px; width:300px;">
                    <h4>${product.name || 'No name'}</h4>
                    <p>Price: $${product.price || 'N/A'}</p>
                    <p>Stock: ${product.stock || 'N/A'}</p>
                    <p>Description: ${product.description || 'No description'}</p>
                    <p>ID: ${product.id || 'No ID'}</p>
                </div>
            `;
        });
        
        container.innerHTML = html;
        console.log("Products displayed successfully");
    } else {
        container.innerHTML = '<p>No products found or empty response</p>';
        console.log("No products to display");
    }
}
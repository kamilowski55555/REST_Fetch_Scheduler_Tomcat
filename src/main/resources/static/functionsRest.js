/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */

//Użycie biblioteki Fetch
function getProductList() {
    fetch('http://localhost:8080/Zadanie7KotKamil/products')
            .then(response => response.json())
            .then((products) => {
                displayTable(products);
    });
}

function displayTable(data) {
    var out = '<table> ';
    out += '<tr>' + '<th>ID</th>' + '<th>Name</th>' + '<th>Price</th>' +
            '<th>Updated</th>' + '<th>Description</th>' + '<th>Operacje</th>' + '</tr>';
    var i;
    for(i = 0; i < data.length; i++) {
        out += '<tr>' +
                '<th>'+data[i].id+'</th>' +
                '<th><input type="text" id="name_' +data[i].id+ '" value="' + data[i].name+'" size="20" ></th>' +
                '<th><input type="text" id="price_' +data[i].id+ '" value="' + data[i].price+'" size="20" ></th>' +
                '<th>'+data[i].updated+'</th>' +
                '<th><input type="text" id="description_' +data[i].id+ '" value="' + data[i].description+'" size="40" ></th>' +
                '<th>'+
                '<button type="button" onclick="updateProduct('+data[i].id+');">Mod</button>' +
                '<button type="button" onclick="deleteProduct('+data[i].id+');">Del</button>' +
                '</th>' +
                '</tr>';
    }
    out+='</table>';
    document.getElementById("result").innerHTML = out;
}

function createProduct() {
    fetch('http://localhost:8080/Zadanie7KotKamil/products',
            {
                method: 'POST',
                body: JSON.stringify({
                    id: -1,
                    name: 'Podaj nazwę',
                    price: '0',
                    updated: '2022-01-01'
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                    .then(response => response.json())
                    .then(data => console.log(data));
}

function updateProduct(id) {
    fetch('http://localhost:8080/Zadanie7KotKamil/products/'+id,
            {
                method: 'PUT',
                body: JSON.stringify({
                    id: id,
                    name: document.getElementById("name_"+id).value,
                    price: document.getElementById("price_"+id).value,
//                    updated: '2023-02-24'
                    description: document.getElementById("description_"+id).value
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                    .then(response => response.json())
                    .then(data => console.log(data));
}

function deleteProduct(id) {
    fetch('http://localhost:8080/Zadanie7KotKamil/products/'+id,
            {
                method: 'DELETE'
            });
}

window.addEventListener("load", getProductList, false);

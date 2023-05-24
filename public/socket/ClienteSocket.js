import ProductManager from "../../src/Managers/ProductManager"
const Manager = new ProductManager()
const ClienteSocket = io()

let ProductCreate = document.getElementById("ProdCreate")
ProductCreate.addEventListener("onClick", RevList())

const imprimirList= (data) => {
    let ListDiv = document.getElementById("ListDiv")
    data.foreach(product => {
        const DivCard= ` <div class="DivCard">
        <img src=${product.thumbnail} class="card-img-top" alt="${product.tittle}">
        <h3>${product.tittle}</h3>
        <div>
        <p>${product.category}</p>
        <p>${product.description}</p>
        <p>${product.stock}</p>
        <h4>Precio: $ ${product.price}</h4>
        </div>
      </div>`; 
      ListDiv.innerHTML= DivCard;
    });
}


const RevList= () => {
    let ProdList=Manager.getProducts()
    ClienteSocket.emit("ProductList", {ProdList})
}

ClienteSocket.on("ProductList", ProdList => {
    imprimirList(ProdList)
})


const firstInit = Manager.getProducts()
imprimirList(firstInit)

import ProductManager from "../../src/Managers/ProductManager"
const Manager = new ProductManager()
const ClienteSocket = io()

let ProductCreate = document.getElementById("ProdCreate")
ProductCreate.addEventListener("onClick", RevList())

const imprimirList= (data) => {
    let ListDiv = document.getElementById("ListDiv")
    data.foreach(producto => {
        const DivCard= ` <div class="DivCard">
        <img src=${producto.thumbnail} class="card-img-top" alt="${producto.title}">
        <h3>${producto.title}</h3>
        <div>
        <p>${producto.category}</p>
        <p>${producto.description}</p>
        <p>${producto.stock}</p>
        <h4>Precio: $ ${producto.price}</h4>
        </div>
      </div>`; 
      ListDiv.innerHTML= DivCard;
    });
}


const RevList= () => {
    let ProdList=Manager.getProducts()
    ClienteSocket.emit("ProdList", {ProdList})
}

ClienteSocket.on("ProdList", ProdList => {
    imprimirList(ProdList)
})


const firstInit = Manager.getProducts()
imprimirList(firstInit)

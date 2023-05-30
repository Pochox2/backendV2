let socketClient = io()

let  btnAgregar = document.getElementById("btnAgregar")
let prodId = btnAgregar.getAttribute("productId")
btnAgregar.addEventListener("onclick", evt => {
    evt.preventDefault()
    socketClient.emit(
        "btnAgregar", prodId
    )
})
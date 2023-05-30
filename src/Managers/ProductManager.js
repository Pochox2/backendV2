import productsModel from "../models/productsmodel.js"

class ProductManager {

    getProductsPaginated = async (limit, page, category, sort) => {
        try {
            if(category){
                if(sort) {
                    const resultado = await productsModel.paginate({category:category}, {
                        limit: limit,
                        page: page,
                        lean: true,
                        sort: {price: sort}
                    })
                    return (resultado);
                } else {
                    const resultado = await productsModel.paginate({category:category}, {
                        limit: limit, 
                        page: page,
                        lean: true
                    })
                    return (resultado);
                }
            } else {
                if (sort) {
                    const resultado = await productsModel.paginate({}, {
                        limit: limit,
                        page: parseInt(page),
                        lean: true,
                        sort: {price:sort}
                    })
                    return (resultado)
                } else {
                    const resultado = await productsModel.paginate({}, {
                        limit: limit,
                        page: parseInt(page),
                        lean: true
                    })
                    return (resultado);
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    getProducts = async () => {
        const listProduct = await productsModel.find({}).lean().exec()
        return (listProduct)
    }

    getProductsbyId = async (pid) => {
        try {
        const product = await productsModel.findOne({_id: pid}).lean().exec()
        if(product) {
            return product}
        else {
            console.log("El id no coincide con ningun producto");
            return null;
        }}
        catch(err) {
            console.error(err)
        }

    }
    
    codeGenerator = () => {
        const codedigs="abcdefghi0123456"
        let string = "";
        for (let i = 0; i < 6; i++) {
            string += codedigs.charAt(Math.floor(Math.random() * codedigs.length));
        }
        return string
    }

    idGenerator = async() => {
        let list = await this.getProducts()
        if (list.length === 0) return 1
        return list[list.length - 1].pid + 1
    }

    codeValidator = async () => {
        const products = await this.getProducts()
        let code;
        let code1;
        do {
            code = this.codeGenerator()
            code1 = products.find(p => p.code == code)
        } while (code1 != undefined)
        return code
    }

    addProduct = async  ({tittle, description, price, category, stock, thumbnail}) => {
        try {
        const pid = await this.idGenerator()
        const code = await this.codeValidator()
        const productNew = {pid, tittle, description, price, category, status:true, stock, thumbnail, code}
        const productGenerado= new productsModel(productNew)
        await productGenerado.save()
        console.log(`Producto ${tittle} creado`)
    } catch (err) {
        console.log(err)
    }}

    removeProduct = async (pid) => {

        try {
            await productsModel.deleteOne({pid: pid})
            console.log(`Producto ${pid} eliminado`)
        } catch (err) {
            console.log(err)
        }
    }

    

    updateProd = async (pid, data) => {
        await productsModel.updateOne({pid: pid}, {...data})
    }

}

export default ProductManager;
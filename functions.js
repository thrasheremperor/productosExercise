const fs=require('fs');

module.exports=onlineStore={
    archive:'./productos.json',
    read:function(){
        let productList=fs.readFileSync(this.archive,'utf-8');
        return JSON.parse(productList);
    },
    add:function(newId,newProduct,newPrice){
        let newItem={
            ID:newId,
            Product:newProduct,
            Price:newPrice
        }
        let lastProduct=this.read();
        lastProduct.push(newItem);
        this.save(lastProduct);
    },
    save:function(info){
        let newJson=JSON.stringify(info);
        fs.writeFileSync(this.archive,newJson,'utf-8');
    },
    erase:function(ID){
        let list=this.read();
        let eliminate=list.filter(function(Product){
            return Product.ID!==ID;
        });
        let newList=JSON.stringify(eliminate);
        fs.writeFileSync("./productos.json",newList,"utf-8");
    },
    search:function(find){
        let productList=this.read();
        let filteredItem=productList.filter(function(item){
            return item.Product.toLowerCase().includes(find.toLowerCase())
        });
        return filteredItem;
    },
    categorize:function(min,max){
        let list=this.read();
        let result=list.filter(function(product){
            return product.Price>=min&&product.Price<=max;
        });
        return result;
    },
    modify:function(ID, newPrice){ 
        let list=this.read();
        let productModified=list.filter((Product)=>{ 
            if(Product.ID==ID){ 
            Product.Price=newPrice 
            }; 
            return list 
        });
        let newProduct = JSON.stringify(productModified); 
        fs.writeFileSync('./productos.json', newProduct, 'utf-8');
    },
    undo: function(){
        let products=this.read();
        products.pop();
        this.save(products);
    },
}
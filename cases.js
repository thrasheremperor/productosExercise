const process=require('process');
const onlineStore=require('./functions.js');
const commands=process.argv[2];

switch(commands){
    case 'list':
        let products=onlineStore.read();
        if(products.length===0){
            console.log('Products are missing');
        }else{
            console.log("----------------------------");
            console.log("        Product List        ");
            console.log("----------------------------");
            for(item in products){
                console.log("ID: "+products[item].ID+" - Product: "+products[item].Product+" - Price: "+products[item].Price);
            }
        }
        break;
    case 'add':
        let newID=process.argv[3];
        let newProduct=process.argv[4];
        let newPrice=process.argv[5];
        onlineStore.add(newID,newProduct,newPrice);
        return console.log("New item added!");
    case 'filterPrice':
        let min=process.argv[3];
        let max=process.argv[4];
        let product=onlineStore.categorize(min,max);
        if(product.length===0){
            console.log("No products found!");
        }else{
            console.log("----------------------------");
            console.log("    Categorized Products    ");
            console.log("----------------------------");
            for(item in product){
                console.log("ID: "+product[item].ID+" - Product: "+product[item].Product+" - Price: "+product[item].Price);
            }
        }
        break;
    case 'modify':
        let id = Number(process.argv[3]);
        let priceChange = Number(process.argv[4]);    
        if(id == undefined || priceChange == undefined){
            console.log('----------------------------');
            console.log("   ID must be valid");
            console.log('----------------------------');
        }
        onlineStore.modify(id, priceChange);
        console.log('--------------------------------');
        console.log('   Product modified correctly');
        console.log('--------------------------------');
        break;
    case 'erase':
        let deleteId = Number(process.argv[3]);
        if(deleteId == undefined){
            console.log('-------------------------------------');
            console.log('     ID not found');
            console.log('-------------------------------------');
        };
        onlineStore.erase(deleteId);
        console.log('--------------------------------');
        console.log('     Product has been erased');
        console.log('--------------------------------');
        break;
    case 'search':
        let result=onlineStore.search(process.argv[3]);
        result.forEach(function(item){
            console.log(item);
        });
    case 'undo':
        onlineStore.undo();
        break;
}
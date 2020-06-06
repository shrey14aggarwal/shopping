export class ProdInfo{

    name : String;
    price: number;
    url : String;
}

export class ProdType{

    mobiles : ProdInfo[];
    tablets : ProdInfo[];
    laptops : ProdInfo[];
    smartHome : ProdInfo[];

   
}

export class P{

    _id: String;
    products : ProdType;
}
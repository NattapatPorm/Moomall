
db.createCollection('products');

db.createCollection('orders');

db.products.insertMany([
    {
        name:"Macbook 13 inch",
        image:"/images/products/mac1.jfif"
    },
    {
        name:"Macbook 14 inch",
        image:"/images/products/mac2.jfif"
    },
    {
        name:"Macbook 15 inch",
        image:"/images/products/mac3.jfif"
    },
    {
        name:"Macbook air",
        image:"/images/products/macair1.jfif"
    },
])
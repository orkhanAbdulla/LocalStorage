let addToCarts=document.querySelectorAll(".btn")
let products=document.querySelector(".products")

addToCarts.forEach(btn=>{
    btn.onclick=function (ev) {
        ev.preventDefault()
        let Id=this.parentNode.parentNode.getAttribute("data-id")
        let img=this.parentElement.previousElementSibling.getAttribute("src")
        let name=this.parentElement.firstElementChild.innerText
        let price=this.parentElement.children[1].innerText
        if(localStorage.getItem("basket")==null){
            localStorage.setItem("basket",JSON.stringify([]))
        }

        let basket=JSON.parse(localStorage.getItem("basket"))
       
        
        let isExistProduct=basket.find(p=>p.id==Id)
        if(isExistProduct===undefined){
            
            let product={ 
                id:Id,
                image:img,
                name:name,
                price:price,
                count:1
            }
            basket.push(product)
        //     products.innerHTML += ` <li data-id="${product.id}">
        // <div class="image">
        //     <img  src="${product.image}" alt="">
        // </div>
        // <div class="text">
        //     <h6>${product.name}</h6>
        //     <span id='${product.id}' >${product.count}</span>
        //     <span><span>$</span>${product.price}</span>
        //     <i class="remove far fa-trash-alt"></i>
        // </div>
        // </li>`
        }
        else{
            // let count = document.getElementById(`${isExistProduct.id}`);
            // +count.innerHTML++;
            isExistProduct.count+=1
        }
        products.innerHTML=" "
        getProduct()

        
        localStorage.setItem("basket",JSON.stringify(basket))
        calcCount()
        totalPrice()
    }
})

calcCount()
function calcCount() {
    let countEle=document.querySelector(".countCart")
    let basket=JSON.parse(localStorage.getItem("basket"))
    countEle.innerHTML=basket.length
}
totalPrice()
function totalPrice(){
    let price =document.querySelector(".amount")
    let basket = JSON.parse(localStorage.getItem("basket"))

let total=basket.reduce((total,p)=>{
   return total+= +p.price * p.count
},0)
    price.innerHTML=total
}
getProduct()
function getProduct() {
    console.log("ok");
    let basket=JSON.parse(localStorage.getItem("basket"))
basket.forEach(p=>{


    products.innerHTML+=
    `
    <li data-id="${p.id}">
    <div class="image">
        <img  src="${p.image}" alt="">
    </div>
    <div class="text">
        <h6>${p.name}</h6>
        <span id='${p.id}'>${p.count}</span>
        <span><span>$</span>${p.price}</span>
        <i class="remove far fa-trash-alt"></i>
    </div>
</li>
    `
})
}

// let removeBtn = document.querySelectorAll(".remove");
// console.log(removeBtn);

// removeBtn.forEach(x => {
//     x.addEventListener("click", function(e){
//         console.log("click");
//         let li = e.target.parentElement.parentElement.getAttribute("data-id");
//         removeItem(li);
//         // li.remove();
//     })
// })


const removeItem=id=>{
    let basket=JSON.parse(localStorage.getItem("basket"))
    const newItemsSet=basket.filter(i=> i.id!==id)
    localStorage.setItem("basket",JSON.stringify(newItemsSet))
}


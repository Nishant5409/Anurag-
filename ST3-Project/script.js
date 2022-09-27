const shopList = document.getElementById('shop-list');
const message = document.getElementById('message');
const nameSt = document.getElementById('name-st');
const cart =  document.getElementById('cart');
const bhide = document.getElementById('bhide');
const cartbtn = document.getElementById('p-cart');
const cartit = document.getElementById('cart-Items');
const total = document.getElementById('sp-total');
const cCart = document.getElementById('cl-cart');
const search = document.getElementById('search');
const checkout = document.getElementById('checkout');
const sh = document.getElementById('sh');
const searchBox = document.getElementById('search-box')

let cartItems = [];

async function addProductsToDom(){
    const products =await getProducts();
    console.log(products)
    if(await products){
        products.products.map((producut)=>{
            const node = document.createElement('div');
            node.classList.add(['product-card']);
            node.innerHTML = `
                <div class="img">
                    <img src=${producut.images[producut.images.length-1]}/>
                </div>
                <div class="text">
                    <p class="title">${producut.title}</p>
                    <p class="Price">Price:- ${producut.price}$</p>
                    <button class="button">ADD TO CART</button>
                </div>
            `
            shopList.appendChild(node);
        })
        return products;
    }
}

async function main(){
    const { products } = await addProductsToDom(); 
    if(await products){
        console.log(products)
        let buttons = document.getElementsByClassName('button');

        const addProductToCart = (cartItems,productToAdd)=>{
            let item = cartItems.find((cartItem)=>cartItem.id === productToAdd.id);
            if(item){
                return cartItems.map(cartItem => cartItem.id===productToAdd.id ? {...cartItem,quantity:cartItem.quantity+1}: cartItem)
            }
            return [...cartItems,{...productToAdd,quantity:1}]
        }

        const removeItemFromCart = (cartItems,productToDelete)=>{
            let item = cartItems.find(cartItem=>cartItem.id === productToDelete.id);
            if(item.quantity===1){
                return cartItems.filter(cartItem => cartItem.id !== productToDelete.id);
            }
            return cartItems.map(cartItem => cartItem.id===productToAdd.id ? {...cartItem,quantity:cartItem.quantity-1}: cartItem)
        }

        for(let i=0;i<buttons.length;i++){
            buttons[i].addEventListener('click',async ()=>{
                message.style.top = '20px';
                nameSt.innerText =await products[i].title;
                cartItems = addProductToCart(cartItems,products[i]);
                setTimeout(()=>{
                    message.style.top = '-100px';
                },800)
            })
        }

        function displayCart(cartItems){
            let tot=0;
            cartItems.map((cartItem)=>{
                let node = document.createElement('div');
                node.classList.add(['cart-product']);
                node.innerHTML=`
                <div class="cart-img">
                    <img src=${cartItem.images[cartItem.images.length-1]}/>
                </div>
                <div>
                    <p>
                        <strong>${cartItem.quantity}X${cartItem.title.toUpperCase()}</strong>
                    </p>
                    <p><strong>${cartItem.price}$</strong></p>
                    <span>
                        Quantity:- <span class="add">+</span> <span>${cartItem.quantity}</span> <span class="remove">-</span>
                    </span>
                </div>`
                tot += cartItem.quantity * cartItem.price;
                cartit.appendChild(node);
                total.innerText = `${tot}$`;
            })
        }

    
        cartbtn.addEventListener('click',()=>{
            bhide.classList.remove(['black-hide'])
            bhide.classList.add(['black'])
            displayCart(cartItems);
            localStorage.setItem('cart',JSON.stringify(cartItems));
            console.log(localStorage.getItem('cart'));
            cart.style.transform = "translateX(0px)";
        })

        cCart.addEventListener('click',()=>{
            cartit.innerHTML = '';
            cartItems = [];
            total.innerText = '0$';
            displayCart(cartItems);
            localStorage.setItem('cart',JSON.stringify(cartItems));
        })

        bhide.addEventListener('click',()=>{
            bhide.classList.remove(['black'])
            bhide.classList.add(['black-hide'])
            cart.style.transform = "translateX(1250px)";
            cartit.innerHTML='';
        })
        checkout.addEventListener('click',()=>{
            document.location.href = '/checkout.html'
            // document.redr('/checkout.html')
        })

        let len=0;
        let filter=[];
        search.addEventListener('keyup',(e)=>{
            // console.log(e.target.value.length+1);
            if(e.keyCode===8){
                len = len < 0 ? -1 : e.target.value.length-1;
                searchBox.innerHTML='';
                if(len===-1){
                    searchBox.innerHTML='';
                }else{
                    let s = e.target.value;
                    console.log(s);
                    filter = products.filter(product => product.title.toUpperCase().includes(s.toUpperCase()));
                    filter.map((producut)=>{
                        const node = document.createElement('div');
                        node.classList.add(['search-item']);
                        node.innerHTML = `
                            <div class="search-item-img">
                                <img src=${producut.images[producut.images.length-1]} alt="">
                            </div>
                            <span class="sp1">${producut.title}</span>
                            <span class="sp1">${producut.description}</span>
                            <span class="sp1">${producut.price}$</span>
                            <button class="button">ADD TO CART</button>
                        `
                        searchBox.appendChild(node);
                    })
                    
                }
                console.log(filter);
                let buttons = document.getElementsByClassName('button');
                for(let i=0;i<buttons.length;i++){
                    buttons[i].addEventListener('click',async ()=>{
                        message.style.top = '20px';
                        nameSt.innerText =await filter[i].title;
                        console.log(filter[i]);
                        cartItems = addProductToCart(cartItems,filter[i]);
                        setTimeout(()=>{
                            message.style.top = '-100px';
                        },800)
                    })
                }
            }else{
                searchBox.innerHTML='';
                len = e.target.value.length+1;
                let s = e.target.value;
                filter = products.filter(product => product.title.toUpperCase().includes(s.toUpperCase()))
                let title = products.map(products=>{
                    if(products.title.toUpperCase().includes(s.toUpperCase())){
                        return products.title;
                    }
                })
                for(let i=0;i<title.length;i++){
                    if(title[i]){
                        search.ariaPlaceholder=title[i];
                        break;
                    }
                }
                filter.map((producut)=>{
                    const node = document.createElement('div');
                    node.classList.add(['search-item']);
                    node.innerHTML = `
                        <div class="search-item-img">
                            <img src=${producut.images[producut.images.length-1]} alt="">
                        </div>
                        <span class="sp1">${producut.title}</span>
                        <span class="sp1">${producut.description}</span>
                        <span class="sp1">${producut.price}$</span>
                        <button class="button">ADD TO CART</button>
                    `
                    searchBox.appendChild(node);
                })
                let buttons = document.getElementsByClassName('button');
                for(let i=0;i<buttons.length;i++){
                    buttons[i].addEventListener('click',async ()=>{
                        message.style.top = '20px';
                        nameSt.innerText =await filter[i].title;
                        cartItems = addProductToCart(cartItems,filter[i]);
                        setTimeout(()=>{
                            message.style.top = '-100px';
                        },800)
                    })
                }
            }
            console.log(len);
        })

        sh.addEventListener('click',()=>{
            document.location.reload();
        })

    }
}

main();
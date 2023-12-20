// --- do not touch  ↓↓↓↓↓↓↓↓↓↓↓↓ ----------
const baseServerURL = `http://localhost:${
  import.meta.env.REACT_APP_JSON_SERVER_PORT
}`;
// --- do not touch  ↑↑↑↑↑↑↑↑↑↑↑↑ ----------

// ***** Constants / Variables ***** //
const bookURL = `${baseServerURL}/books`;
let mainSection = document.getElementById("data-list-wrapper");
let data = null
async function fetchFun(){
  try {
    let res = await fetch(bookURL,{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      }
    })
    res = await res.json()
    console.log(res)
    data=res
    display(res)
  } catch (error) {
    console.log(error)
  }
}
fetchFun()

function display(data){
  mainSection.innerHTML=""
let cont = document.createElement("div")
cont.setAttribute("className","card")
data?.map((item)=>{
  const imgcont = document.createElement("div")
  imgcont.className="card-img"

  const img = document.createElement("img")
  img.src=item.image
  imgcont.append(img)

  const bodycont = document.createElement("div")
  bodycont.className="card-body"

  const h4=document.createElement("h4")
  h4.className="card-title"
  h4.innerText=item.title

  const author = document.createElement("p")
  author.className="card-author"
  author.innerText=item.author

  const category = document.createElement("p")
  category.className="card-category"
  category.innerText=item.category

  const price = document.createElement("p")
  price.className="card-price"
  price.innerText = item.price

  const edit = document.createElement("a")
  edit.className="card-link"
  edit.href="#"
  edit.setAttribute("data-d",`${item.id}`)
  edit.innerText="Edit"
  edit.addEventListener("click",()=>{
    editFun(item.id)
    editPriceFun(item.id)
  })

  let button = document.createElement("button")
  button.className="card-button"
  button.setAttribute("data-d",`${item.id}`)
  button.innerText="Delete"
  button.addEventListener("click",()=>{
        deleteFun(item.id)
  })

  bodycont.append(h4,author,category,price,edit,button)

  mainSection.append(imgcont,bodycont)
})
}



// book
let bookTitleInput = document.getElementById("book-title");
let bookImageInput = document.getElementById("book-image");
let bookCategoryInput = document.getElementById("book-category");
let bookAuthorInput = document.getElementById("book-author");
let bookPriceInput = document.getElementById("book-price");
let bookCreateBtn = document.getElementById("add-book").addEventListener("click",addBook)


async function addBook(){
  const payload = {title:bookTitleInput.value,
  image:bookImageInput.value,
  category:bookCategoryInput.value,
  author:bookAuthorInput.value,
  price:bookPriceInput.value,

  }
 try {
  let res = await fetch(`${baseServerURL}/books`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(payload)
  })
  res=await res.json()
  console.log(res)
  fetchFun()
 } catch (error) {
  console.log(error)
 }
}


async function deleteFun(id){
try {
  let res = await fetch(`${baseServerURL}/books/${id}`,{
    method:"DELETE",
    headers:{
      "Content-Type":"application/json"
    }
  })
  res = await res.json()
  fetchFun()
} catch (error) {
  console.log(res)
}
}

// Update book
let updateBookIdInput = document.getElementById("update-book-id");
let updateBookTitleInput = document.getElementById("update-book-title");
let updateBookImageInput = document.getElementById("update-book-image");
let updateBookAuthorInput = document.getElementById("update-book-author");
let updateBookCategoryInput = document.getElementById("update-book-category");
let updateBookPriceInput = document.getElementById("update-book-price");
let updateBookBtn = document.getElementById("update-book").addEventListener("click",async()=>{
  let id = updateBookIdInput.value
  let payload={
    title:updateBookTitleInput.value,
    image:updateBookImageInput.value,
    author:updateBookAuthorInput.value,
    category:updateBookCategoryInput.value,
    price:updateBookPriceInput.value
  }
  try {
    let res = await fetch(`${baseServerURL}/books/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(payload)
    })
    res=await res.json()
    fetchFun()
  } catch (error) {
    console.log(error)
  }
})


async function editFun(id){
  try {
    let res = await fetch(`${baseServerURL}/books/${id}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      }
    })
    res = await res.json()
    console.log(res)
    updateBookIdInput.value=res.id;
    updateBookTitleInput.value=res.title;
    updateBookImageInput.value=res.image;
    updateBookAuthorInput.value=res.author;
    updateBookCategoryInput.value=res.category;
    updateBookPriceInput.value=res.price
    
  } catch (error) {
    console.log(error)
  }
}



//Update price
let updatePriceBookId = document.getElementById("update-price-book-id");
let updatePriceBookPrice = document.getElementById("update-price-book-price");
let updatePriceBookPriceButton = document.getElementById("update-price-book").addEventListener("click",async()=>{
  let id = updatePriceBookId.value
  let payload={
    price:updatePriceBookPrice.value
  }
  try {
    let res = await fetch(`${baseServerURL}/books/${id}`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(payload)
    })
    res=await res.json()
    fetchFun()
  } catch (error) {
    console.log(error)
  }
})




async function editPriceFun(id){
  try {
    let res = await fetch(`${baseServerURL}/books/${id}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      }
    })
    res = await res.json()
    console.log(res)
    updatePriceBookId.value=res.id;
    updatePriceBookPrice.value=res.price
    
  } catch (error) {
    console.log(error)
  }
}



//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high").addEventListener("click",()=>{
  
  let sortData = data.sort((a,b)=>{
    return a.price-b.price
  })
  display(sortData)
})
let sortZtoABtn = document.getElementById("sort-high-to-low").addEventListener("click",()=>{
  let sortData = data.sort((a,b)=>{
    return b.price-a.price
  })
  display(sortData)
})
let filterClassic = document.getElementById("filter-Classic").addEventListener("click",()=>{
  let classicData = data.filter((item)=>{
    if(item.category=="Classic"){
      return item
    }
  })
  display(classicData)
})
let filterFantasy = document.getElementById("filter-Fantasy").addEventListener("click",()=>{
  let fantacyData = data.filter((item)=>{
    if(item.category=="Fantasy"){
      return item
    }
  })
  display(fantacyData)
})
let filterMystery = document.getElementById("filter-Mystery").addEventListener("click",()=>{
  let mysteryData = data.filter((item)=>{
    if(item.category=="Mystery"){
      return item
    }
  })
  display(mysteryData)
})

//Search by title/author

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

//Books Data
let booksData = [];

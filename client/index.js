
const reponse = await fetch('http://localhost:3016/books');
console.log(reponse);
const pieces = await reponse.json();
console.log(pieces);

function generePiece(p){
    for(let i = 0; i < p.length; i++){
      const fich = document.querySelector(".fiches");
      const par= document.createElement("dev");
      const ar = document.createElement("header");
      const im= document.createElement("img");
      const detail = document.createElement("a");
      detail.href="#";
      detail.innerText="more detail>";

      im.src = "../images/pdf.png";

      const info = document.createElement("dev");

      const p1 = document.createElement("h4");
      p1.innerText = `${p[i].title}`;

      const p2 = document.createElement("p");
      const categories = p[i].categories.join(",");
      p2.innerHTML += "<b>categories : </b>"+categories;
      
      const p3 = document.createElement("p");
      const authors = p[i].authors.join(",");
      p3.innerHTML += "<b>authors : </b>"+authors;

      const p4 = document.createElement("p");
      const date = p[i].publishedDate.date.substring(0,10);
      p4.innerHTML += "<b>published Date : </b>"+date;

      const p5 = document.createElement("p");
      p5.innerHTML += "<b>page : </b>"+p[i].pageCount;
      
      const p6 = document.createElement("p");
      p6.innerHTML += "<b>Description : </b>"+p[i].shortDescription;
      p6.appendChild(detail);

      const p7 = document.createElement("p");

      let x =0;
      detail.addEventListener('click',function(){
             if(x==0){
                  p7.innerText= p[i].longDescription;
                  x=1;
             }
             else if(x==1){
                    p7.innerText= "";
                    x=0;
             }
      });
     
      const icone = document.createElement('div');
      let a1 = document.createElement("a");
      let a2 = document.createElement("a");
      let i1 = document.createElement("i");
      let i2 = document.createElement("i");
      i1.setAttribute('class',"fa-solid fa-pen");
      a1.setAttribute("href","#")
      a1.setAttribute('class','ficon1');
      a1.setAttribute('data-bs-toggle',"modal");
      a1.setAttribute('data-bs-target',"#enroll");
      a1.appendChild(i1);

      i2.setAttribute('class',"fa-solid fa-trash");
      a2.setAttribute('class','ficon2');
      a2.setAttribute("href","#")
      a2.appendChild(i2);

      icone.appendChild(a1);
      icone.appendChild(a2);
      

      info.appendChild(p1);
      info.appendChild(p2);
      info.appendChild(p3);
      info.appendChild(p4);
      info.appendChild(p5);
      info.appendChild(p6);
      info.appendChild(p7);

      ar.appendChild(im);
      par.appendChild(ar);
      par.appendChild(info);
      par.appendChild(icone);
      fich.appendChild(par);

      }

      pen(p);
      trash(p);
  }


  
  generePiece(pieces);


const findbook = document.getElementById('findbook');
findbook.addEventListener("click",async function(event){
     event.preventDefault();
     console.log(1);
     const title = document.querySelector("[name=title]").value;
     console.log(title);
     const categories = document.querySelector("[name=Category]").value;
     const authors = document.querySelector("[name=authors]").value;
     const date = document.querySelector("[name=date]").value;
     const arr = [title,categories,authors,date];

     
     const reponse = await fetch(`http://localhost:3016/books/f?title=${title}&categories=${categories}&authors=${authors}&date=${date}`);
     console.log(reponse);
     const pieces = await reponse.json();
     const par= document.querySelector(".fiches");
     par.innerHTML = "";
     generePiece(pieces);
})


let idupdate;
function pen(p){
    const a = document.querySelectorAll(".ficon1");
    for(let j = 0 ; j < a.length ; j++){
    a[j].addEventListener('click',function(){
        idupdate = p[j]._id;
        const title = document.querySelector("[name=Uptitle]");
        title.value = p[j].title;
        const categories = document.querySelector("[name=Upcategory]");
        categories.value = p[j].categories;
        const authors = document.querySelector("[name=Upauthors]")
        authors.value = p[j].authors;
        const date = document.querySelector("[name=Update]");
        date.value = p[j].publishedDate.date;
        const pageCount = document.querySelector("[name=Upagecount]");
        pageCount.value = p[j].pageCount;
        const status = document.querySelector("[name=Upstatus]");
        status.value = p[j].status;
    });
    }
}
///////////////////  delete///////////////////////:
let idelete;
function trash(p){
    const a = document.querySelectorAll(".ficon2");
    for(let j = 0 ; j < a.length ; j++){
    a[j].addEventListener('click', async function(event){
        event.preventDefault();
        idelete = p[j]._id;
    Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to delete this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
      const reponse = await fetch(`http://localhost:3016/books/d?id=${idelete}`,
                  {
                    method: 'DELETE'
                  })
       console.log(reponse);
       const pieces = await reponse.json();
       console.log(pieces);
    }
  })}
  )}}

const updatebook = document.querySelector('.formupdate');
console.log(updatebook);
updatebook.addEventListener('submit',async function(event){
       event.preventDefault();
       console.log((event.target)); 
      
       const title =document.querySelector("[name=Uptitle]").value ;
       console.log(title);
       const pageCount =document.querySelector("[name=Upagecount]").value;
       const publishedDate = document.querySelector("[name=Update]").value;
       const authors = (document.querySelector("[name=Upauthors]").value).split(",");
       const categories = (document.querySelector("[name=Upcategory]").value).split(",");
       const book = {
           title : title,
           pageCount :  pageCount,
           publishedDate : {
                            date : publishedDate
                           },
            status : document.querySelector("[name=Upstatus]").value,
            authors: authors,
            categories: categories
       }
        
       console.log(book);
       
       const reponse = await fetch(`http://localhost:3016/update?id=${idupdate}`, 
       { 
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book)
       })
       console.log(reponse);
       const pieces = await reponse.json();
       console.log(pieces);
})
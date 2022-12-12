"use strict";
// ============== get data ==============================
let baseURL = 'http://localhost:3000';

async function getData() {
  const response = await fetch(`${baseURL}/polkovnik`);
  const result = await response.json();
  console.log(result);
  dataRender(result);
}
getData();

// =========================== render data ===============================

function dataRender(data = []) {
  let cr = document.querySelector("#data");
  data.length > 0
    ? data.forEach((el) => {
        const tr = createElement(
          "tr",
          "item",
          `
            
            <td>${el.id}</td>
            <td>${el.title}</td>
            <td>${el.time}</td>
            <td><button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-edit="${el.id}">edit</button></td>
            <td><button class="btn btn-danger" data-del="${el.id}">delete</button></td>
            
            `
        );

        cr.appendChild(tr);
      })
    : console.log("not found data");
}

// ============================== add data ==================================================

function addData() {
  const title = $("#lesson").value.trim();
  const time = $("#runtime").value.trim();
  const param = {
    title: title,
    time: time,
  };
  console.log(param);

  if (title.length === 0 || time.length === 0) {
    alert("please fill ......");
  } else {
    fetch(`${baseURL}/polkovnik`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    });
  }
}

$("#send").addEventListener("submit", (e) => {
  e.preventDefault();
  addData();
});

// ==============           delete function       =============
$("#data").addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-danger")) {
    let id = e.target.getAttribute("data-del");
    fetch(`${baseURL}/polkovnik/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  }
});

// =============================  edit data  ===============

$("#data").addEventListener("click",(e)=>{
    if(e.target.classList.contains('btn-primary')){
        let id = e.target.getAttribute('data-edit')
        localStorage.setItem('editId', id)
        sendModal()
    }
})
async function sendModal (){
    let id = localStorage.getItem('editId')
    const data = await fetch(`${baseURL}/polkovnik/${id}`)
    const result = await data.json()
    $("#editlesson").value=result.title
    $("#edittime").value=result.time

}



$("#editsend").addEventListener("submit",()=>{
    let id = localStorage.getItem('editId')
    let title = $("#editlesson").value.trim()
    let time = $("#edittime").value.trim()
    let params={
        title:title,
        time:time
    }
    fetch(`${baseURL}/polkovnik/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(params)
    })
})
let logUser = localStorage.getItem("username")
$("#username").innerHTML=logUser

$("#logout").addEventListener('click',()=>{
  localStorage.clear()
  redirect()
})
function redirect(){
  if(!localStorage.getItem('token')){
    window.location.replace("./login.html")
  }
}
redirect()

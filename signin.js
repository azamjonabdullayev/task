"use strict"
let baseURL = ('https://task.samid.uz/v1/user/sign-in')
$("#login").addEventListener("submit",(e)=>{
    e.preventDefault()
    let username = $('#username').value.trim()
    let password = $('#password').value.trim()
    const param = {
        username:username,
        password:password,
    }
    if(param.username.length===0||param.password.length===0){
        alert('please enter full input . . . . .')
    }else{
        fetch(baseURL,{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(param),
        }).then((response)=>response.json())
        .then((result)=>{
            if(result.code===1){
                alert('success')
                localStorage.setItem('username',result.data.username)
                localStorage.setItem('token', result.data.token)
                setTimeout(()=>{
                    window.location.replace("./index.html")
                },1000)
                
            }else{
                alert(result.errors.password)
            }
        })
    }
})
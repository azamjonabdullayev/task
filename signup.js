"use strict"


const baseURL =('https://task.samid.uz/v1/user/sign-up')
$("#signup").addEventListener("submit",(e)=>{
    e.preventDefault()
    let username = $('#user_reg').value.trim()
    let password = $('#password_reg').value.trim()
    let email = $('#email_reg').value.trim()
    const param = {
        username:username,
        password:password,
        email:email

    }
    if(param.username.length===0||param.email.length===0||param.password.length===0){
        alert('please enter full input . . . . .')
    }else{
        fetch(baseURL,{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(param),
        }).then((response)=>response.json())
        .then((result)=>{
            if(result.code=='1'){
                alert('success')
                setTimeout(()=>{
                    window.location.replace('./login.html')
                },1000)
            }else{
                alert(result.errors.username)
            }
        })
    }
})

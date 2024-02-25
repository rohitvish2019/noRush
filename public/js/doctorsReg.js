function registerDoctor(){
    let FullName = document.getElementById('name').value
    let Mobile = document.getElementById('mobile').value
    let Address = document.getElementById('address').value
    let Password = document.getElementById('password').value
    let Location = document.getElementById('location').value
    if(!FullName || !Mobile || !Address || !Password || !Location){
        console.log('Mandatory values are missing')
        return
    }
    $.ajax({
        url:'/registration/new/Doctor',
        type:'Post',
        data:{
            FullName,
            Mobile,
            Address,
            Password,
            Location
        },
        
    })
}


document.getElementById('register').addEventListener('click', registerDoctor);

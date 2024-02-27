document.getElementById('datepicker')
function today(){
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1;
    var curr_year = d.getFullYear();
    datepicker.value = '15-05-1998';
}


function getDoctorsListByLocation(Location){
    $.ajax({
        url:'/doctors/getAll',
        type:'Get',
        data:{
            Location:document.getElementById('location').value
        },
        success: function(response){
            showDoctorsList(response.docsList)
        },
        error:function(err){
            console.log(err)
        }
    })
}


function showDoctorsList(docsList){
    let container = document.getElementById('doctors-list');
    container.innerHTML=``;
    for(let i=0;i<docsList.length;i++){
        let item = document.createElement('div');
        item.classList.add('card');
        item.style.width='12rem';
        //item.id=docsList[i]._id;
        item.innerHTML=
        `
        <img src="/images/doctor.png" class="card-img-top" alt="..." style="border-radius: 50%;">
        <div class="card-body">
            <h5 class="card-title">${docsList[i].FullName}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <button class='selectorButtons btn btn-primary' id='${i}' style="align-items:center">Select</button>
        </div>
        `
        container.appendChild(item);
    }
    let fetchedDocs = document.getElementsByClassName('selectorButtons');
    for(let i=0;i<fetchedDocs.length;i++){
        fetchedDocs[i].addEventListener('click', function(event){
            document.getElementById('doctorId').value=docsList[i]._id
            document.getElementById('doctorName').value=docsList[i].FullName
        })
    }
}


function checkAvailability(){
    let id = document.getElementById('doctorId').value
    let date = document.getElementById('appointmentDate').value
    if(!id || !date){
        console.log('Please select Doctor and date correctly')
        return
    }
    $.ajax({
        type:'Get',
        url:'/doctors/getAvailability',
        data:{
            id,
            date
        },
        success:function(data){
            responseData = data.timeframe[0];
            window.location.href='/doctors/showBookings/'+responseData.DocId+'?startTime='+responseData.startTime+'&endTime='+responseData.endTime
        }
    })
}

document.getElementById('location').addEventListener('change', getDoctorsListByLocation);
document.getElementById('checkAvailability').addEventListener('click', checkAvailability)
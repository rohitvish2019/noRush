function generateTimeSlots(startTime, endTime, idleTime) {
    // Convert start and end times to Date objects
    const startDate = new Date(`2000-01-01 ${startTime}`);
    const endDate = new Date(`2000-01-01 ${endTime}`);

    const timeSlotsByHour = {};

    // Increment start time by 10 minutes until it's greater than or equal to end time
    while (startDate < endDate) {
        // Get hour part of the time
        let hour = startDate.getHours();
        // Convert to 12-hour format if greater than 12
        if (hour > 12) {
            hour -= 12;
        }
        // Handle midnight
        if (hour === 0) {
            hour = 12;
        }
        // Get AM/PM
        const ampm = startDate.getHours() >= 12 ? 'PM' : 'AM';
        // Format time to hh:mm AM/PM
        const formattedTime = startDate.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });

        // Check if the hour exists in the timeSlotsByHour object
        if (!timeSlotsByHour[`${hour} ${ampm}`]) {
            timeSlotsByHour[`${hour} ${ampm}`] = [];
        }
        
        // Add the formatted time to the corresponding hour's list
        timeSlotsByHour[`${hour} ${ampm}`].push(formattedTime);

        // Increment start time by 10 minutes
        startDate.setMinutes(startDate.getMinutes() + idleTime);
    }
    console.log(timeSlotsByHour)
    return timeSlotsByHour;
}

function showTimesAvailable(){
    let timeSlots = generateTimeSlots(document.getElementById('startTime').value, document.getElementById('endTime').value, 10);
    //console.log(typeof(timeSlotsByHour));
    let keys = Object.keys(timeSlots)
    let count = 0;
    let accordionContainer = document.getElementById('accordionFlush');
    accordionContainer.innerHTML=``;
    for(let i=0;i<keys.length;i++){
        let container = document.createElement('div');
        container.classList.add('accordion-item');
        container.innerHTML=
        `
        <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${i}" aria-expanded="false" aria-controls="flush-collapse${i}">
            ${keys[i]} Onwards
        </button>
        </h2>
        <div id="flush-collapse${i}" class="accordion-collapse collapse" data-bs-parent="#accordionFlush">
            <div class="time-slots" id='${keys[i]}'></div>
        </div>
        `
        accordionContainer.appendChild(container)
        for(let j=0;j<timeSlots[keys[i]].length;j++){
            let item = document.createElement('div')
            item.innerHTML=
            `
            <input type="radio" class="btn-check" name="options" id="option${timeSlots[keys[i]][j]}" autocomplete="off" value="${timeSlots[keys[i]][j]}">
            <label class="btn btn-light" for="option${timeSlots[keys[i]][j]}">${timeSlots[keys[i]][j]}</label>
            `
            document.getElementById(keys[i]).appendChild(item)
            console.log()
        }
    }   
}
showTimesAvailable()

function getSelectedTime(){
    let timeframes = document.getElementsByName('options');
    let selectedTime = ""
    for(let i=0;i<timeframes.length;i++){
        if(timeframes[i].checked){
            flag = 1;
            selectedTime = timeframes[i].value
            break
        }
    }
    if(selectedTime == ""){
        console.log('Nothing selected')
    }
    $.ajax({
        url:'/doctors/getBookingConfirmation',
        type:'Post',
        data:{
            date:document.getElementById('date').value,
            selectedTime,
            DocId:document.getElementById('docId').value,
            PatientName:document.getElementById('patientName').value,
            PatientAge:document.getElementById('patientAge').value,
            PatientAddress:document.getElementById('patientAddress').value,
            PatientMobile:document.getElementById('patientMobile').value,
        },
        success:function(res){console.log(res)},
        error:function(err){console.log(err.responseText)}
    })
}

function getBlockedTime(){
    $.ajax({
        url:'/doctors/getBlockedTimesReport',
        type:'Get',
        data:{
            DocId:document.getElementById('docId').value,
            date:document.getElementById('date').value,
        },
        success:function(res){disableBlockedTimings(res.blockedTimes)},
        error:function(err){console.log(err.responseText)}
    })
}

function disableBlockedTimings(blockedTimes){
    console.log('Blocking blocks')
    let times = document.getElementsByName('options');

    let count = 0;
    if(blockedTimes.lenght == 0){
        return;
    }
    for(let i=0;i<times.length;i++){
        for(let j=0;j<blockedTimes.length;j++){
            console.log(i+"   "+j)
            if(times[i].value == blockedTimes[j].selectedTime){
                times[i].setAttribute('disabled','true');
                count++
                console.log('Blocking '+times[i].value)
            }
            if(count >= blockedTimes.lenght){
                return
            }
        }
    }
}
getBlockedTime();
document.getElementById('bookAppointment').addEventListener('click', getSelectedTime)
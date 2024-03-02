function registerDoctor(){
    let FullName = document.getElementById('name').value
    let Mobile = document.getElementById('mobile').value
    let Address = document.getElementById('address').value
    let Password = document.getElementById('password').value
    let Location = document.getElementById('location').value
    let startTime = document.getElementById('startTime').value
    let endTime = document.getElementById('endTime').value
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
            Location,
            startTime:convertTo12HourFormat(startTime),
            endTime: convertTo12HourFormat(endTime)
        },
        
    })
}

function convertTo12HourFormat(time24) {
    // Splitting the time string into hours and minutes
    var timeSplit = time24.split(':');
    var hours = parseInt(timeSplit[0], 10);
    var minutes = parseInt(timeSplit[1], 10);

    // Determining if it's AM or PM
    var period = hours >= 12 ? 'PM' : 'AM';

    // Adjusting hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // If hours is 0, make it 12

    // Adding leading zeros if hours or minutes are single digit
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    // Constructing the 12-hour time format string
    var time12 = hours + ':' + minutes + ' ' + period;

    return time12;
}


document.getElementById('register').addEventListener('click', registerDoctor);

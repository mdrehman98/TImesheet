function createManualTask(name){
    console.log('hoi')
    console.log(name)
    var taskDropdownContainer = document.getElementById('taskDropdownContainer');
    taskDropdownContainer.innerHTML = '';

    // Create input fields for Date, Task, Start Time, and End Time
    var dateInput = document.createElement('input');
    dateInput.type = 'text';
    dateInput.placeholder = 'Date';
    dateInput.id = 'dateInput';

    var taskInput = document.createElement('input');
    taskInput.type = 'text';
    taskInput.placeholder = 'Task Name';
    taskInput.id = 'taskInput';

    var button = document.createElement('button');
    button.id="submitTaskBtn"
    button.class="submit-btn"
    button.type="submit"
    button.textContent = "Submit"

    button.onclick= function () {
        createTask2(name)
      }
    var startTimeSelect = createSelect('startTimeInput', 'Start Time', '8:00:00', '18:00:00');
    var endTimeSelect = createSelect('endTimeInput', 'End Time', '8:00:00', '18:00:00');


    var now = new Date();
    var day = now.getDate();
    var month = now.getMonth() + 1; 
    var year = now.getFullYear();
    var dayOfWeekNumber = now.getDay();


    var dayOfWeekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var dayOfWeek = dayOfWeekNames[dayOfWeekNumber];
    var dateString = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day) + ','+ dayOfWeek;

    dateInput.value=dateString

    // Append input fields to the taskDropdownContainer
    taskDropdownContainer.appendChild(dateInput);
    taskDropdownContainer.appendChild(taskInput);
    taskDropdownContainer.appendChild(startTimeSelect);
    taskDropdownContainer.appendChild(endTimeSelect);
    taskDropdownContainer.appendChild(button);
    }

function createSelect(id, placeholder, startTime, endTime) {
    var select = document.createElement('select');
    select.id = id;
    select.placeholder = placeholder;

    var startHour = parseInt(startTime.split(':')[0]);
    var endHour = parseInt(endTime.split(':')[0]);

    for (var hour = startHour; hour <= endHour; hour++) {
        for (var minute = 0; minute <= 59; minute += 60) {
            var timeString = `${hour}:${minute.toString().padStart(2, '0')}:00`;
            var option = document.createElement('option');
            option.value = timeString;
            option.textContent = timeString;
            select.appendChild(option);
        }
    }

    return select;
}

function createTask2(name){
    var date=dateInput.value
    var taskName=taskInput.value
    var startTime=document.getElementById('startTimeInput').value;
    var endTime=document.getElementById('endTimeInput').value;
    

     var existingDataJSON = localStorage.getItem(name+'.json');
    var existingData = existingDataJSON ? JSON.parse(existingDataJSON) : [];

    var index = existingData.length > 0 ? existingData[existingData.length - 1].index + 1 : 1;

    
    var taskData = {
        index: index,
        date: date,
        task: taskName,
        startTime: startTime,
        endTime: endTime,
    };
    
    /*
    if (existingData.length > 0) {
        var latestTask = existingData[existingData.length - 1];
        latestTask.endTime = startTime;
    }
    */
    existingData.push(taskData);
    localStorage.setItem(name+'.json', JSON.stringify(existingData));
    
    showTasks();

}
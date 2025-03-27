function finishTask(name) {
    document.getElementById('tasks').addEventListener("click", function(event) {
      // Check if the clicked element is a button with class "finish-task-btn"
      if (event.target.classList.contains("finish-task-btn")) {
        // Retrieve the index from the button's data-index attribute
        var index = parseInt(event.target.dataset.index, 10); // Convert to integer
        
         // Convert back to string
        
        // Call the finishTask function with the index
        var existingDataJSON = localStorage.getItem(name+'.json');
        
        if (existingDataJSON) {
          var existingData = JSON.parse(existingDataJSON);
      
          // Find the task with the specified index
          
          var taskToUpdate = existingData.find(function(task) {
            return task.index === index;
          });
        
      
          if (taskToUpdate) {
            // Update the end time of the task
            var now = new Date();
            var hours = now.getHours();
            var minutes = now.getMinutes();
            var seconds = now.getSeconds();
      
            var formattedHours = (hours < 10 ? '0' + hours : hours);
            var formattedMinutes = (minutes < 10 ? '0' + minutes : minutes);
            var formattedSeconds = (seconds < 10 ? '0' + seconds : seconds);
            var timeString = formattedHours + ':' + formattedMinutes + ':' + formattedSeconds;
      
            taskToUpdate.endTime = timeString;
      
            // Update the task in the existing data
            existingData.forEach(function(task, i) {
              if (task.index === index) {
                existingData[i] = taskToUpdate;
              }
            });
      
            // Update local storage with the updated data
            localStorage.setItem(name+'.json', JSON.stringify(existingData));
      
            // Update tasks display
            showTasks();
          }
        }
      }
    });
  }
  


function createEditHandler(index, taskData,name) {
return function() {
    var currentIndex = index;
    var dateElement = document.getElementById(`date_${currentIndex}`);
    var taskElement = document.getElementById(`task_${currentIndex}`);
    var startTimeElement = document.getElementById(`startTime_${currentIndex}`);
    var endTimeElement = document.getElementById(`endTime_${currentIndex}`);
    var actionsElement = document.getElementById(`action_${currentIndex}`);

    dateElement.innerHTML = `<input type="text" id="editDate_${currentIndex}" value="${taskData.date}">`;
    taskElement.innerHTML = `<input type="text" id="editTask_${currentIndex}" value="${taskData.task}">`;
    startTimeElement.innerHTML = `<input type="text" id="editStartTime_${currentIndex}" value="${taskData.startTime}">`;
    endTimeElement.innerHTML = `<input type="text" id="editEndTime_${currentIndex}" value="${taskData.endTime}">`;
    var editButton = document.getElementById(`editTasksBtn_${currentIndex}`);


    editButton.style.display = 'none';

    var btn_update = document.createElement('button');
    btn_update.type = "submit";
    btn_update.id = 'update-task-btn';
    btn_update.textContent = "Update Task";

    btn_update.onclick = function() {
        var updatedDate = document.getElementById(`editDate_${currentIndex}`).value;
        var updatedTask = document.getElementById(`editTask_${currentIndex}`).value;
        var updatedStartTime = document.getElementById(`editStartTime_${currentIndex}`).value;
        var updatedEndTime = document.getElementById(`editEndTime_${currentIndex}`).value;

        var existingDataJSON = localStorage.getItem(name+'.json');
        var existingData = JSON.parse(existingDataJSON);
        
        existingData[currentIndex].date = updatedDate;
        existingData[currentIndex].task = updatedTask;
        existingData[currentIndex].startTime = updatedStartTime;
        existingData[currentIndex].endTime = updatedEndTime;

        localStorage.setItem(name+'.json', JSON.stringify(existingData));
        showTasks();
    };


    // Append the container to the taskElement
    actionsElement.appendChild(btn_update);
};
}


function deleteTask(taskData,name) {
    return function() {// Convert to integer
     // Add 1
    var index= taskData.index
    var existingDataJSON = localStorage.getItem(name+'.json');
    if (existingDataJSON) {
        var existingData = JSON.parse(existingDataJSON);

        // Find the index of the task with the specified index
        var taskIndex = existingData.findIndex(function(task) {
            return task.index === index;
        });

        // If the task index is found, remove it from the existingData array
        if (taskIndex !== -1) {
            existingData.splice(taskIndex, 1);

            // Update local storage with the updated data
            localStorage.setItem(name+'.json', JSON.stringify(existingData));

            // Update tasks display
            showTasks();
        }
    }
}}
    



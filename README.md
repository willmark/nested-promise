nested-promise
============

> Stability - 2 Unstable

Promise pattern to handle multiple nested tasks

## Usage 

````
    TaskHandler = require('nested-promise').TaskHandler;
    options = {
        task: tasks, //Array of tasks to handle
        asyncop: asyncop, //Async call for each task in the array above.  Async call can create a new promise.TaskHandler for nested tasks
        cbtaskcomplete: taskcomplete, //Callback for each completed task
        cbend: end //Callback when all tasks in the array are complete
    };
    th = Object.create(TaskHandler);
    th.init(options);

````

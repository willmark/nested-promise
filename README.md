nested-promise
============

> Stability - 2 Unstable

Promise pattern to handle multiple nested tasks

## Usage 

````
    TaskHandler = promise.TaskHandler;
    var options = {
        task: tasks,
        asyncop: asyncop,
        cbtaskcomplete: taskcomplete,
        cbend: end
    };
    var th = new TaskHandler();
    th.init(options);

````

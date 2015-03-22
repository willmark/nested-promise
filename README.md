nested-promise
============

> Stability - 3 Stable

Promise pattern to handle multiple nested tasks.  Plans to simplify the options are in the works.  For instance, perhaps just an array of task prototypes or objects is sufficient rather than including separate asyncop and other task handlers.

## Usage 

````
    var TaskHandler = promise.TaskHandler;
    var options = {
        task: tasks,
        asyncop: asyncop,
        cbtaskcomplete: taskcomplete,
        cbend: end
    };
    var th = new TaskHandler();
    th.init(options);

````

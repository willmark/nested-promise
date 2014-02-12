var promise = require("./index");

var tasks = [ {
    name: "task1",
    visited: false 
}, {
    name: "task2",
    visited: false
}, {
    name: "task3",
    visited: false,
    subtask21: {
        name: "task3.1",
        visited: false 
    },
    subtask22: {
        name: "task3.2",
        visited: false 
    },
    subtask221: {
        name: "task3.2.1",
        visited: false,
        subtask2211: {
            name: "task3.2.1.1",
            visited: false 
        }
    }
}, {
    name: "task4",
    visited: false
}, {
    name: "task5",
    visited: false 
}, {
    name: "task6",
    visited: false,
    subtask31: {
        name: "task6.1",
        visited: false 
    }
} ];

var taskLength = function(task) {
    length = 0;
    for (var name in task) {
        if (task.hasOwnProperty(name)) {
            length++;
        }
    }
    return length;
};

var asyncop = function(task, cb) {
    if (taskLength(task) > 2) {
        newTasks = [];
        for (var subtask in task) {
            if (subtask === "name" || subtask === "visited") continue;
            newTasks.push(task[subtask]);
        }
        subtaskcomplete = function(task) {
            task.visited = true; 
            console.log('subtask complete:',task[1].name);
        };
        subcomplete = function() {
            task.visited = true; 
            cb(true, task);
        };
        load(newTasks, subtaskcomplete, subcomplete);
    } else {
        task.visited = true;
        cb(true, task);
    }
};

var load = function(tasks, taskcomplete, end) {
    TaskHandler = promise.TaskHandler;
    options = {
        task: tasks,
        asyncop: asyncop,
        cbtaskcomplete: taskcomplete,
        cbend: end 
    };
    th = new TaskHandler();
    th.init(options);
};

exports.test1 = function(a) {
    a.expect(7);
    taskcomplete = function(result) {
        console.log('task complete:',result[1].name);
        a.ok(result[0] && result[1].visited);
    };
    load(tasks, taskcomplete, function(result, err) {
        console.log('all tasks complete');
        a.ok(tasks.length === 0); //all tasks should be poped off
        a.done();
    });
};

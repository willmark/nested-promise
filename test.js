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
    var length = 0;
    for (var name in task) {
        if (task.hasOwnProperty(name)) {
            length++;
        }
    }
    return length;
};

var asyncop = function(task, cb) {
    if (taskLength(task) > 2) {
        var newTasks = [];
        for (var subtask in task) {
            if (subtask === "name" || subtask === "visited") continue;
            newTasks.push(task[subtask]);
        }
        var subtaskcomplete = function(result, task) {
            task.visited = result; 
            console.log('subtask complete:',task.name);
        };
        var subcomplete = function() {
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
    var options = {
        task: tasks,
        asyncop: asyncop,
        cbtaskcomplete: taskcomplete,
        cbend: end 
    };
    var th = new TaskHandler();
    th.init(options);
};

exports.test1 = function(a) {
    a.expect(7);
    var taskcomplete = function(result, task) {
        //console.log('task complete:',result[1].name);
        console.log('task complete:',task.name);
        a.ok(result && task.visited);
    };
    load(tasks, taskcomplete, function(result, err) {
        console.log('all tasks complete');
        a.ok(tasks.length === 0); //all tasks should be poped off
        a.done();
    });
};

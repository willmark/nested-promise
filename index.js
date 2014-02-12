/**
 * Simplified variation on promise pattern for handling
 * a queue of tasks.  Each task can have nested tasks
 * A single set of callbacks for handling
 * errors and fullfilled notices are called on a series of
 * tasks passed in to perform in sequence.
 */
function Promise() {}

Promise.prototype.init = function(options) {
    this.taskHandler = options.taskHandler;
    this.callbacks = [];
};

/**
     * Pushes the next task on the call stack
     */
Promise.prototype.then = function(callback_ok) {
    this.callbacks.push({
        ok: callback_ok
    });
    return this;
};

/**
     * Execute the next task in the call stack
     * and remove from the queue
     */
Promise.prototype.resolve = function() {
    var callback = this.callbacks.shift();
    if (callback && callback.ok) {
        callback.ok.apply(this, arguments);
    }
};

/**
     * Handle the next operation for a given task
     */
Promise.prototype.operation = function(task, cbtaskcomplete) {
    //A new instance of the callback is used to keep the local
    //task information to distinguish it from any parent callback
    //operations of embedded tasks
    cbhand = function(self) {
        this.cb = function() {
            self.taskHandler.cbtaskcomplete(arguments);
            nextTask = self.taskHandler.task.shift();
            if (nextTask) {
                self.resolve(nextTask, self.taskHandler.cbtaskcomplete);
            } else {
                self.resolve();
            }
        };
        return this.cb;
    };
    this.taskHandler.asyncop(task, new cbhand(this));
    return this;
};

/**
     * Process all tasks in the options list
     */
Promise.prototype.alltasks = function() {
    len = this.taskHandler.task.length - 1;
    //one less than length because first op is seeded after loop
    for (var i = 0; i < len; i++) {
        this.then(this.operation);
    }
    //Queue the final processing of results
    this.then(this.taskHandler.cbend);
    //Now, trigger the first task in the queue
    this.operation(this.taskHandler.task.shift(), this.taskHandler.cbtaskcomplete);
};

function TaskHandler() {}

TaskHandler.prototype.init = function(options) {
    this.task = options.task;
    this.asyncop = options.asyncop;
    this.cbtaskcomplete = options.cbtaskcomplete || this.taskcomplete;
    this.cbend = options.cbend || this.end;
    //p = Object.create(new Promise(), options);
    p = new Promise();
    p.init({
        taskHandler: this
    });
    p.alltasks();
};

module.exports = {
    TaskHandler: TaskHandler
};
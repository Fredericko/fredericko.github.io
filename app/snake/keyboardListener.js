function keyboardListener(){
    let observers = [];

    function subscribe(observerFunction){
        observers.push(observerFunction);
    }

    function notifyAll(command){
        observerFunction(command);
    }
}
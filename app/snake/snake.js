export default function snake(){
    let direction = "Right";
    let tail = [{x:40,y:40}];

    function addTail(){
        tail.push({});
    }
   
    function getTail(){
        return tail;
    }

    function getHead(){
        return tail[0];
    }

    function resetTail(){
        tail = [{x:40, y:40}];
    }

    function searchTail(position){
        for(let segment of tail){
            if(segment.x == position.x && segment.y == position.y){
                return true;
            }
        }
        return false;
    }

    return {direction, getHead, getTail, addTail, resetTail, searchTail};
}  


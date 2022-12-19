// get libraries
var io = require('socket.io')(4000);
var zmq = require('zeromq');

// connect to your ZeroMQ Socket
sock = zmq.socket('pull');
sock.connect('tcp://127.0.0.1:3000')
console.log("Worker connected to port 3000")

sock.on("message", function(msg){
        console.log(msg);

        let msgToString = msg.toString();
    
        //Extract string data into multidimensional array
        let sp = msgToString.replace(/[[(' ')]]*/g,'');
      
        console.log(sp);
        let sp2 = sp.split(',').map(str => {
            if(isNaN(str)){
                return str;
            }else {
                return Number(str);
            }
            
          });
          //Result would be multidimensional array
          //Result = [[x, y, class, id, lane], [x, y, class, id, lane], [x, y, class, id, lane]]
          
          // ----- Update ----- Nov. 10, 2022
          // ----- [[x, y, class, id, lane], [x, y, class, id, lane], [x, y, class, id, lane]] ...... n
          // ----- [[class, id], [class, id], [class, id]] ...... n
          // ----- "n" means, number of vehicles dectected
          // ----- each unique id is equivalent to unique vehicle detected
          
    
        //slice into chunks
    
        function sliceIntoChunks(arr, chunkSize) {
            const res = [];
            for (let i = 0; i < arr.length; i += chunkSize) {
                const chunk = arr.slice(i, i + chunkSize);
                res.push(chunk);
                console.log("chunk: i: "+i+"chunk size: "+chunkSize+"Chunk: "+chunk);
            }
            return res;
        }
        
        var newValue = sliceIntoChunks(sp2, 5)
        console.log(newValue);
    
})
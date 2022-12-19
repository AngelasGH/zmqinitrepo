// producer.js
/* import the readline file */
var readline = require('readline');
/* Importing the file system module. */
var fs = require('fs');
/* Importing the zeromq module. */
var zmq = require("zeromq");

/* Defining the file that will be read. */
var filename = "example/pos.txt";

/* Creating a socket of type `push`. */
sock = zmq.socket("push");

/* Binding the socket to the port 3000. */
sock.bindSync("tcp://127.0.0.1:3000");
console.log("Producer bound to port 3000");

/* Sending the file content to the consumer every 500 milliseconds.
   readFileSync
*/
async function processLineByLine(){

        const filestream = fs.createReadStream(filename);

        const rl = readline.createInterface ({
            input: filestream,
            crlfDelay: Infinity
        });
    
        for await(const line of rl) {
            console.log(`${line}`);
            sock.send(line);
            await sleep(1000)
        }

        function sleep(ms){
            return new Promise(resolve=>{
                setTimeout(resolve,ms)
            })
        }
        
    }

    processLineByLine();
// function fetchFile(file) {
//     fetch(file)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error("Network response was not ok");
//             }
//             return response.text();
//         })
//         .then(data => {
//             console.log(data); // Do something with the file content
//         })
//         .catch(error => {
//             console.error(
//                 "There was a problem with your fetch operation:",
//                 error
//             );
//         });
// }

// // const frame = self.createElement("iframe");

// function pingApp(urlToRequest) {
//     // frame.src = urlToRequest;
//     fetchFile(urlToRequest);
// }

// // background.js
// self.addEventListener("message", function (e) {
//     // // Receive data from the main thread
//     const data = e.data;

//     // // Process the data (for example, perform some computations)
//     // const result = processData(data);

//     let i = 1;

//     self.setInterval(() => {
//         pingApp(e.data);
//         self.postMessage(i);
//         i++;
//     }, 1000);

//     // // Send the result back to the main thread
// });

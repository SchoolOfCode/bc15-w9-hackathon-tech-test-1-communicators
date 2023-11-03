// console.log("--------CONNECT TO THE MAIN.JS--------");
// const bodyContainer = document.querySelector(".body-container");
// // Header Container
// const headerContainer = document.querySelector(".header-container");

// // Note Container--------------------------------
// const noteContainer = document.querySelector(".note-container");

// // Questions Written Block-- Start of a Written Block
// const qsWrittenBlock = document.querySelector(".qs-written-block");
// // Questions Written Block Prompt
// const qsWrittenBlockPrompt = document.querySelector(".qs-written-block-prompt");
// // Questions Written Block Textarea
// const qsWrittenBlockTextarea = document.querySelector(
//   ".qs-written-block-textarea"
// );
// // Written Block input field

// // Questions entries are Number and linked via IDs
// // title
// const titleEntry = document.querySelector("#title-box");
// // note
// const noteEntry = document.querySelector("#body-box");

// // CREATE: POST/Fetch Request to the Server
// async function sendDataToDatabase(e) {
//   e.preventDefault();

//   // Store all the new Data from the question section
//   const noteData = new FormData(noteContainer);
//   /* note: emoji response value defined elsewhere */
//   let titleEntryValue = titleEntry.value || "No Title provided.";
//   let noteEntryValue = noteEntry.value || "No note provided.";

//   // !!!Check if the Submit is working
//   console.log("Title: " + titleEntryValue);
//   console.log("Note: " + noteEntryValue);

//   // Empty all the question Written blocks
//   noteContainer.reset();

//   // Send a Fetch/POST Request to the Server
//   const response = await fetch("http://localhost:4000/note/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       title: titleEntryValue,
//       content: noteEntryValue,
//     }),
//   });

//   // If Statement - Check if response.ok is true
//   if (response.ok) {
//     // Store the json response
//     const noteData = await response.json();
//     // !!!Check if the data is correct
//     console.log("POST: " + noteData);
//     // Popup to notify the user, new entry sent
//     // displayPopUpForNewData();
//   } else {
//     // console.log error message
//     const error = await response.text();
//     console.log(error);
//   }
//   // Update the Journal Area with new Data
//   //   getAllDataFromServer();
// }

// // Event Listeners //////////////////////////////////////////////////////////////////////////////
// // Questions Container/POST Form
// noteContainer.addEventListener("submit", sendDataToDatabase);


console.log("--------CONNECT TO THE MAIN.JS--------");
//note container
const noteContainer = document.querySelector(".note-container");
// title
const titleEntry = document.querySelector("#title-box");
// note
const noteEntry = document.querySelector("#body-box");
// display button
const oldNoteButton = document.querySelector(".see-notes");
//old note container
const oldNoteContainer = document.querySelector(".old-note-container");
// CREATE: POST/Fetch Request to the Server
async function sendDataToDatabase(e) {
    e.preventDefault();
    // Store all the new Data from the question section
    const noteData = new FormData(noteContainer);
    /* note: emoji response value defined elsewhere */
    let titleEntryValue = titleEntry.value || "No Title provided.";
    let noteEntryValue = noteEntry.value || "No note provided.";
    console.log("Title: " + titleEntryValue);
    console.log("Content: " + noteEntryValue);
    // Empty all the question Written blocks
    noteContainer.reset();
    // Send a Fetch/POST Request to the Server
    const response = await fetch("http://localhost:5000/note", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: titleEntryValue,
            content: noteEntryValue,
        }),
    });
    // If Statement - Check if response.ok is true
    if (response.ok) {
        // Store the json response
        const noteData = await response.json();
        console.log("POST: " + noteData);
        // Popup to notify the user, new entry sent
        // displayPopUpForNewData();
    } else {
        // console.log error message
        const error = await response.text();
        console.log(error);
    }
    // Update the Journal Area with new Data
    //   getAllDataFromServer();
}
// READ: GET/Fetch Request to the Server
async function getDataFromDatabase(e) {
    // e.preventDefault();
    // Store all the new Data from the question section
    /*const data = new FormData(journalSection);*/
    // Send a Fetch/GET Request to the Server
    const response = await fetch(`http://localhost:5000/note/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        // Store the json response
        const jsonresponse = await response.json();
        console.log(jsonresponse.data.rows[0]);
        let counter = jsonresponse.data.rows.length;
        for (let i = 0; i < counter; i++) {
            displayNoteData(jsonresponse.data.rows[i]);
        }
        // Changing the UI to match the Database
    } else {
        // console.log error message
        const error = await response.text();
        console.log(error);
    }
}
function displayNoteData(jsoninput) {
    // extracting the title/content
    let noteTitle = jsoninput.title;
    let noteContent = jsoninput.content;
    // creating a break
    const newDivide = document.createElement("p");
    newDivide.textContent = `----------------------------`;
    oldNoteContainer.appendChild(newDivide);
    // creating the title element
    const titleText = document.createElement("p");
    titleText.textContent = `Title: ${noteTitle}`;
    oldNoteContainer.appendChild(titleText);
    // creating the content
    const contentText = document.createElement("p");
    contentText.textContent = `Content: ${noteContent}`;
    oldNoteContainer.appendChild(contentText);
}
// Event Listeners //////////////////////////////////////////////////////////////////////////////
// Questions Container/POST Form
noteContainer.addEventListener("submit", sendDataToDatabase);
oldNoteButton.addEventListener("click", getDataFromDatabase);












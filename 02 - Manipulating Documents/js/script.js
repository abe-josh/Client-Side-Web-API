// storing a reference of an element into a variable
// in this case, we look for the first "<a>" element in the document and store a reference of it to "link" variable
const link = document.querySelector('a');

// manipulate the text of "<a>" element
link.textContent = "Mozilla Developer Network";
// manipulate the source URL where the link is pointing to
link.href = "https://developer.mozilla.org";


// reference an element to a variable
const sect = document.querySelector('section');

// create new document element
const para = document.createElement('p');
// add a text into the "<p>" element
para.textContent = "We hope you enjoyed the ride.";

// append the new created element para "<a>" as a Child element of the "<section>" element, so it will be added to the Document 
sect.appendChild(para);


// add a text node to the paragraph the link "<a>" sits inside, to round off the sentence nicely
const text = document.createTextNode(
    " — the premier source for web development knowledge.",
);

// create a variable that reference to the first "<p>" element
const linkPara = document.querySelector('p');
linkPara.appendChild(text);

// move the first "<p>" element to the end of the section;
sect.appendChild(linkPara);

// removing a node using the reference to the node and its parent
// "linkPara" node to be removed from its parent node "sect"
//**sect.removeChild(linkPara);

// removing a node using based only on a reference to itself
// remove the first "<p>" element in the document using the variable reference to it
//linkPara.remove();

// removing a node using based only on a reference to itself that supports in older browsers
//linkPara.parentNode.removeChild(linkPara); 


para.style.color = "aqua";
para.style.backgroundColor = "black";
para.style.padding = "10px";
para.style.width = "100%";
para.style.textAlign = "center";


/**FOR SHOPPING LIST */
const addBtn = document.querySelector('.add-btn');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('.item-list');

addBtn.addEventListener('click', () => {
    const item = document.createElement('li');
    const itemText = document.createElement('p');
    const deleteBtn = document.createElement('button');

    if(itemInput.value != ""){
        itemText.textContent = itemInput.value;
        deleteBtn.textContent = "Delete";

        item.appendChild(itemText);
        item.appendChild(deleteBtn);

        console.log(itemInput.value);
        itemInput.value = "";
        itemInput.focus();

        itemList.appendChild(item);
    }

    deleteBtn.addEventListener('click', () =>{
        item.remove();
    })
    
});



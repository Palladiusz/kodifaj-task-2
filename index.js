
const arr = [];
let id = 2;
let emptyField = false;
const inputs = [];

// *****************MAKE NEW INPUT FIELD*****************//
function createNewField(id) {
    const newField = document.createElement("div");
    newField.setAttribute("id", id);

// *****************LABEL*****************//
    const newLabel = document.createElement("label");
    newLabel.textContent = `Your text (nm ${id}):`;
    newLabel.setAttribute("for", "text")
    newField.appendChild(newLabel);

// *****************INPUT AREA*****************//
    const newInput = document.createElement("input");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("name", "text");
    newInput.setAttribute("value", "");
    newInput.setAttribute("placeholder", "Text place");
    newInput.setAttribute("class", "input-area");
    newField.appendChild(newInput);

// *****************DELETE BUTTON*****************//
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "button");
    deleteButton.setAttribute("class", "btn-delete");
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", () => {
        arr.splice(arr.indexOf(newField), 1);
        newField.remove();
        document.querySelector(".btn-add").disabled = false;
        updateFieldsList();
    });
    newField.appendChild(deleteButton);

// *****************WARNING IF INPUT IS EMPTY*****************//
    const warning = document.createElement("p");
    warning.textContent = "Field above can not be empty.";
    warning.setAttribute("class", "warning");
    warning.hidden = true;
    newField.appendChild(warning);

        
    return newField
};

// *****************REFRESH LIST, UPDATE LABELS*****************//
function updateFieldsList() {
    arr.forEach((el, index) => {
        document.querySelector("form").insertBefore(el, document.querySelector(".btn"));
        el.id = index+2;
        el.children[0].textContent = `Your text (nm ${index+2}):`;
    });

};


// *****************ADD NEW INPUT FIELD*****************//
function addNewField() {
    arr.push(createNewField(arr.length));
    updateFieldsList();
    
    arr[arr.length-1].children[1].focus();
    if (arr.length > 1) {
        arr[arr.length-2].children[3].hidden = true;
    };
    //setID();
};

// *****************CHECK IF ALL INPUTS ARE FILLED*****************//
function checkEmptyField() {
    arr.forEach(el => {
        if (el.children[1].value === "") {
            el.children[3].hidden = false;
            el.children[1].focus();
            emptyField = true;
        } else {
            emptyField = false;
        };
    });
};

// *****************ADD INPUT BUTTON*****************//
document.querySelector(".btn-add").addEventListener("click", () => {  

    checkEmptyField();

    if (arr.length < 4 && emptyField === false) {
        addNewField();
        if (arr.length > 1) {
            arr[arr.length-2].children[3].hidden = true;
        };
    } else if (arr.length === 4) {
        addNewField();
        if (arr.length > 1) {
            arr[arr.length-2].children[3].hidden = true;
        };
        document.querySelector(".btn-add").disabled = true;
    };

    
});

// *****************SAVE ALL LABELS AND INPUT VALUES*****************//
function getInputs() {
    
    arr.forEach(el => {
        inputs.push({
            label: el.children[0].textContent,
            value: el.children[1].value
        });
    });
    console.log(inputs);
};


// *****************SUBMIT BUTTON, REDIRECT TO 2ND PAGE*****************//
// *****************2ND PAGE HAS INPUT INFO IN URL*****************//
document.querySelector(".btn-submit").addEventListener("click", () => {
    checkEmptyField();
    if (emptyField === false) {
        getInputs();
        window.location.href = `./page2.html?phrases=${inputs.map(item => {
            return item.value
        })}`;
    };
});


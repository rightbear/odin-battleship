import messageData from "../item/invaldMessage.json" with { type: "json"};
import * as localStorageModule from "./localStorage"

// Compare one of players' name field with anohter name field
export function compareName(currentName) {
    const anotherName = (currentName.id === "player1Name") 
                        ? document.querySelector('#player2Name'): document.querySelector('#player1Name')
    if (currentName.value === anotherName.value) {
      return false;
    }
    return true;
}

// If name fields on the form cannot pass the validation, display error message
function showError(fieldElement, fieldMessage) {
    if (fieldElement.validity.valueMissing) {
    // If it's empty
        fieldMessage.textContent = messageData[`${fieldElement.name}`]["required"];
    } else if (fieldElement.validity.tooShort || fieldElement.validity.tooLong) {
    // If the value is too short or too long
        fieldMessage.textContent = messageData[`${fieldElement.name}`]["length"];
    } else if (fieldElement.validity.patternMismatch) {
    // If the value doesn't match the pattern
        fieldMessage.textContent = messageData[`${fieldElement.name}`]["pattern"];
    } else if (!compareName(fieldElement)) {
    // If the the player name is duplicate
        fieldMessage.textContent = messageData[`${fieldElement.name}`]["duplicate"];
    } else {
        fieldMessage.textContent = "Unknown reason to fail";
    }

    // Removes the `Valid` class and add the `Invalid` class in the fieldElement
    fieldElement.classList.remove("validField");
    fieldElement.classList.add("invalidField");

    // Removes the `Valid` class and add the `Invalid` class in the fieldMessage
    fieldMessage.classList.remove("validMsg");
    fieldMessage.classList.add("invalidMsg");
}

// If name fields on the form can pass the validation, display success message
function showCorrect(fieldElement, fieldMessage) {
    // If the value is checked and passed
    fieldMessage.textContent = messageData[`${fieldElement.name}`]["correct"];

    // Removes `invalid` class and add the `valid` class in the fieldElement
    fieldElement.classList.remove("invalidField");
    fieldElement.classList.add("validField");

    // Removes the `invalid` class and add the `valid` class in the fieldMessage
    fieldMessage.classList.remove("invalidMsg");
    fieldMessage.classList.add("validMsg");
}

// Show messages under the fields based on the validation result
export function showMessage(fieldElement) {
    const fieldMessage = document.querySelector(`#${fieldElement.id} + span`);

    if (!fieldElement.validity.valid || !compareName(fieldElement)) {
        showError(fieldElement, fieldMessage);
    } else {
        showCorrect(fieldElement, fieldMessage);
    }
}

// Clear all names in the fields and validation result messages under the fields
export function resetField(fieldElement, fieldMessage) {
    fieldElement.value = ""; 

    fieldElement.classList.remove("validField");
    fieldElement.classList.remove("invalidField");

    fieldMessage.textContent = "";
    fieldMessage.classList.remove("validMsg", "invalidMsg");

    const currentMode = (localStorageModule.getModeInfo()).mode;

    if(currentMode === 'pvc' && fieldElement.id === 'player2Name'){
        fieldElement.value = 'Computer';
        fieldElement.disabled = true;
    }
}
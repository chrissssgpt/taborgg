// options.js
// Renderizar grupos/carpetas al cargar options.html 
document.addEventListener("DOMContentLoaded", () => { 
    renderGroups(); 
    });
    // Agregar nuevo grupo al hacer clic 
    document.querySelector("#addGroup").onclick = () => { 
    chrome.runtime.sendMessage({
    type: "addGroup", 
    groupName: document.querySelector("#newGroup").value 
    }); 
    };
    // Renderizar grupos/carpetas recibidos como mensaje 
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type == "renderGroups") {
    renderGroups(); 
    } 
    }); 
    // Función para representar grupos/carpetas 
    function renderGroups() { 
    ... // Mismo código de background.js 
    }
    // Botón "Guardar" para mostrar/ocultar grupos 
document.querySelector("#save").onclick = () => {
    // Obtener estado de las casillas de verificación
    let showGroups = {}; 
    document.querySelectorAll("#showHide input").forEach(input => {
    showGroups[input.id] = input.checked; 
    });
    // Enviar mensaje a background.js para actualizar grupos 
    chrome.runtime.sendMessage({
    type: "showHideGroups", 
    showGroups 
    }); 
    };
    // Botones importar/exportar  
    document.querySelector("#import").onclick = () => { 
    ... 
    };
    document.querySelector("#export").onclick = () => { 
    ... 
    }; 
    // Agregar carpeta al hacer clic 
    document.querySelector("#addFolder").onclick = () => {
    // Obtener detalles de nueva carpeta 
    let folderName = document.querySelector("#newFolder").value; 
    let folderType = document.querySelector("#folderType").value;
    // Enviar mensaje a background.js para agregar nueva carpeta
    chrome.runtime.sendMessage({ 
    type: "addFolder", 
    folderName, 
    folderType 
    }); 
    }; 
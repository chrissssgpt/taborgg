// background.js
// Valores predeterminados 
let defaultGroups = { 
    "group1": { title: "Group 1" },
    "group2": { title: "Group 2" } 
    }; 
    let defaultFolders = { 
    "folder1": { title: "Folder 1", type: "primary" } 
    }; 
    // Obtener grupos/carpetas guardados 
    let groups = {}; 
    let folders = {}; 
    restoreOptions(); 
    // Observar cambios y guardar  
    chrome.storage.onChanged.addListener(saveOptions);
// Menú de contexto para cerrar/abrir/recargar pestañas  
chrome.contextMenus.create({ 
    title: "Close group tabs",
    contexts: ["page_action"],
    onclick: () => {...} 
    });
    chrome.contextMenus.create({...}); // Opción abrir
    chrome.contextMenus.create({...}); // Opción recargar
    // Función de guardado 
    function saveOptions() { 
    chrome.storage.sync.set({ 
    groups, 
    folders 
    }); 
    } 
    // Función de restauración  
    function restoreOptions() { 
    chrome.storage.sync.get({ 
    groups: defaultGroups,
    folders: defaultFolders 
    }, items => {
    groups = items.groups; 
    folders = items.folders; 
    }); 
    } 
    // Implementar importación/exportación de grupos  
document.querySelector("#import").onclick = () => { 
    chrome.tabs.query({currentWindow: true}, tabs => {
    // Agrupar pestañas según data URL
    ...
    }); 
    };
    document.querySelector("#export").onclick = () => { 
    // Generar data URL que representa agrupación actual de pestañas 
    ...
    };
    //Mostrar/ocultar grupos según las casillas 
    document.querySelector("#save").onclick = () => {
    // Obtener el estado de las casillas de verificación 
    ... 
    // Actualizar propiedad de visualización para grupos 
    ...
    };  
    // Permitir la creación de carpetas primarias/secundarias 
    document.querySelector("#folderType").onchange = () => {
    // Establecer tipo de carpeta (primaria/secundaria) 
    ...
    };
    document.querySelector("#addFolder").onclick = () => {
    // Obtener nombre de carpeta del formulario
    ... 
    // Agregar nueva carpeta según tipo 
    ...
    };
    // Agregar nuevo grupo desde options.html 
document.querySelector("#addGroup").onclick = () => { 
    // Obtener nombre de grupo del formulario 
    let groupName = document.querySelector("#newGroup").value; 
    // Agregar nuevo grupo 
    groups[groupName] = { 
    title: groupName, 
    visible: true 
    }; 
    // Guardar cambios 
    saveOptions();
    };
    // Representar grupos/carpetas en options.html 
    function renderGroups() { 
    // Obtener referencia al elemento <div id="groupsList">
    let groupsList = document.querySelector("#groupsList"); 
    // Vaciar la lista existente 
    groupsList.innerHTML = ""; 
    // Renderizar grupos 
    for (let group in groups) { 
    groupsList.innerHTML += /* Código HTML para representar grupo */ 
    } 
    // Renderizar carpetas 
    ... 
    } 
    renderGroups(); 
    // Llamar a renderGroups() cuando haya cambios 
    chrome.storage.onChanged.addListener(() => { 
    renderGroups(); 
    });
    // Manejar eventos de clic en contextMenus
chrome.contextMenus.onClicked.addListener((info, tab) => { 
    if (info.menuItemId == "closeGroupTabs") {   // Cerrar pestañas de grupo
    // Obtener ID de grupo desde info.pageUrl   
    let groupId = ... 
    // Cerrar todas las pestañas de ese grupo
    ...
    } else if (info.menuItemId == "openGroupTabs") { // Abrir pestañas de grupo
    ... 
    } else if (info.menuItemId == "reloadGroupTabs") { // Recargar pestañas
    ...
    } 
    });
    // Observar eventos de clic en pestañas 
    chrome.tabs.onActivated.addListener(() => { 
    // Comprobar si la pestaña activada pertenece a un grupo 
    ... 
    if (groupForTab) { 
    // Activar grupo en sidebar 
    ... 
    } 
    }); 
    chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    // Comprobar si la pestaña eliminada pertenecía a un grupo 
    ...
    if (groupForTab) { 
    // Quitar pestaña del grupo 
    ...
    // Guardar cambios
    saveOptions(); 
    }
    });    
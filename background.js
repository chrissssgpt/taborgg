js
// Obtener opciones de storage
chrome.storage.sync.get({
  userThemes: {},
  userFolders: {},
  sortBy: 'theme' 
}, prefs => {
  let { userThemes, userFolders, sortBy } = prefs;
  
  // Obtener todas las pestañas abiertas
  chrome.tabs.query({}, tabs => {
    
    // Ordenar pestañas según la opción elegida
    switch (sortBy) {
      case 'title':
        tabs.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'website': 
        tabs.sort((a, b) => a.url.localeCompare(b.url));
        break;
    }
    
    // Agrupar pestañas por carpeta o tema
    let groupedTabs = {};
    for (let tab of tabs) {  
      // Obtener la carpeta o tema sugerido para la pestaña
      let suggestedTheme = suggestTheme(tab.url, userThemes);
      let folder = getFolder(tab.id, userFolders);
      let key = folder ? folder : suggestedTheme.name;
      
      // Agregar la pestaña al grupo
      if (groupedTabs[key] == undefined) groupedTabs[key] = [];
      groupedTabs[key].push(tab);      
    }
    
    // Abrir pestañas del mismo grupo consecutivamente
    for (let key in groupedTabs) {
      // Destacar pestañas según color de tema o carpeta
      let tabGroup = groupedTabs[key];
      tabGroup[0].highlighted = true;
      if (userThemes[key]) tabGroup[0].style = userThemes[key].color;
      
      // Abrir pestaña
      for (let i = 0; i < tabGroup.length; i++) {
        chrome.tabs.update(tabGroup[i].id, {index: i});
      }
    }
  });  
});

function getFolder(tabId, userFolders) {
  for (let folder in userFolders) {
    if (userFolders[folder].includes(tabId)) return folder; 
  }
}

function suggestTheme(url, userThemes) {
  // Implementar lógica para sugerir un tema  
}
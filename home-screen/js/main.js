console.log('Starting log...');

// Registra o service worker
registerServiceWork();

// Evento disparado quando o banner "Add to Home Screen" é aberto
window.addEventListener('beforeinstallprompt', function(e) {

    console.log('Listen beforeInstallPrompt...');
    // Promisse que retorna a escolha do usuário
    e.userChoice.then(function(choiceResult) {
        // Atributo com a escolha do usuário (dismissed ou accepted)
        console.log('choiceResult = ', choiceResult.outcome);
    
        if(choiceResult.outcome == 'dismissed') {
            console.log('User cancelled home screen install');
        }
        else {
            console.log('User added to home screen');
        }
    });
});

// Evento disparado quando o ícone é adicionado na home screen (nao consegui ver esse evento)
window.addEventListener('appinstalled', function() {
    console.log('Listen appInstalled...');
})

// Detecta se a página foi aberta através do ícone da home (ainda não funcionou)
if (window.matchMedia('(display-mode: standalone)').matches) {
    alert('display-mode is standalone');
  }

function addHomeScreen() {
    console.log('Prompt add to home screen');
}

// Registra o service worker
function registerServiceWork() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
        .register('./service-worker.js')
        .then(function(reg) {
            console.log('Service worker Registered');
        })
        .catch(function (err) {
            console.log('erro', err);
        });
    }
}
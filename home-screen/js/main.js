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

// Evento disparado quando o ícone é adicionado na home screen (só funcionou em produção - github page)
window.addEventListener('appinstalled', function() {
    alert('WebApp instalado com sucesso!');
})

// Detecta se a página foi aberta através do ícone da home (só funcionou em produção - github page)
if (window.matchMedia('(display-mode: standalone)').matches) {
    alert('Página aberta através do ícone da home');
  }

// Registra o service worker
function registerServiceWork() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
        .register('/pwa-study/home-screen/service-worker.js')
        .then(function(reg) {
            console.log('Service worker Registered');
        })
        .catch(function (err) {
            console.log('erro', err);
        });
    }
}
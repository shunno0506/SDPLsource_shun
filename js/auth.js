// Simple client-side auth (for demo only).
// Username: root, Password: root
(function(){
  function isAuthenticated(){
    return sessionStorage.getItem('auth') === 'true';
  }

  function requireAuth(){
    // don't redirect when already on login page
    if(location.pathname.endsWith('login.html')) return;
    if(!isAuthenticated()){
      const next = encodeURIComponent(location.pathname + location.search + location.hash);
      location.href = 'login.html?next=' + next;
    }
  }

  function login(u,p){
    if(u === 'root' && p === 'root'){
      sessionStorage.setItem('auth','true');
      return true;
    }
    return false;
  }

  function logout(){
    sessionStorage.removeItem('auth');
    location.href = 'login.html';
  }

  window.simpleAuth = { isAuthenticated, requireAuth, login, logout };
})();

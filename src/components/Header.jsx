import "./Header.css";
import auth from "../auth";
import onInstallPwa from "../pwa";
function Header() {

  const isPwaInstalled = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

  const askInstall = () => {
    if (window.confirm('Voulez-vous installer HelloWesh en tant qu\'application ?')) {
      onInstallPwa();
    }
  }
  return (
    <div className="header">
      <h1>HelloWesh</h1>
      <h3>La bonne cuisine des familles</h3>
      <div
        onClick={() => {
          auth.logout();
        }}
        title="cliquer pour se déconnecter" className="auth">🔓{localStorage.getItem('token')}</div>
        {!isPwaInstalled ? (<div
          onClick={askInstall}
          title="cliquer pour installer hello wesh en tant qu'application" className="pwa">🔽</div>
        ) : ''}
      </div>
  
  );
}

export default Header;

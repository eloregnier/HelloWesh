import "./Header.css";
import auth from "../auth";
// logout on auth click
function Header() {
  return (
    <div className="header">
      <h1>HelloWesh</h1>
      <h3>La bonne cuisine des familles</h3>
      <div
        onClick={() => {
          auth.logout();
        }}
        title="cliquer pour se déconnecter" class="auth">🔓{localStorage.getItem('token')}</div>
    </div>
  );
}

export default Header;

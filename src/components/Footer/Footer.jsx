import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="developer__name">Developed by Stephen B. Smith</p>
      <p className="developer__date">{new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;

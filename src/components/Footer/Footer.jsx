const currentYear = new Date().getFullYear()

function Footer() {
  return (
    <footer className="site-footer" id="contact" tabIndex={-1} aria-labelledby="contact-title">
      <div className="container footer-content">
        <div>
          <h2 id="contact-title">Contact Cinema Espiritu</h2>
          <p className="muted-text">Fictional cinema and contact details for this academic project.</p>
          <address>
            <p>123 Starlight Avenue, Imaginary District, Lima, Peru</p>
            <p><a href="mailto:hello@cinema-espiritu.example">hello@cinema-espiritu.example</a></p>
          </address>
        </div>
        <div className="footer-details">
          <a href="#home">Back to top</a>
          <p className="muted-text"><small>&copy; {currentYear} Cinema Espiritu. All rights reserved.</small></p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

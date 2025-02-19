import "./globals.css"; // Import global styles

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="body-container">
        <header className="header">
          <h1 className="header-title">Virtual Classroom</h1>
        </header>
        <main>{children}</main>
        <footer className="footer">
          <p>© 2025 Virtual Classroom, All rights reserved</p>
          <p>Under Development</p>
        </footer>
      </body>
    </html>
  );
}

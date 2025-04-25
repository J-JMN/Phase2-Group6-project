export default function AuthLayout({ children }) {
  return (
    <div className="auth-layout">
      <div className="cover-section"></div>{/*the other section */}
      <div className="form-section">
        {children} {/* Login form section */}
      </div>
    </div>
  );
}

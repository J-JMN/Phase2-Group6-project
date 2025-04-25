export default function AuthLayout({ children }) {
  return (
    <div className="auth-layout">
      <div className="cover-section">{/* Your cover image */}</div>
      <div className="form-section">
        {children} {/* This will be your LoginForm */}
      </div>
    </div>
  );
}

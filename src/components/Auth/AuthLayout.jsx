export default function AuthLayout({ children }) {
  return (
    <div
      className="d-flex flex-column flex-md-row w-100 flex-fill justify-content-center align-items-center"
      style={{
        height: "100vh",
        backgroundColor: "#ffffff",
      }}
    >
      {children}
    </div>
  );
}

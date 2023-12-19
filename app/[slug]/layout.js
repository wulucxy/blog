import Bio from "../Bio";

export default function Layout({ children }) {
  return (
    <>
      {children}
      <footer className="mt-12">
        <Bio />
      </footer>
    </>
  );
}

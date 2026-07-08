export default function Footer() {
  const today = new Date().toLocaleDateString();
  return (
    <footer>
      <hr />

      <p>© Owned and Developed by ganeshsoftech  last update:08-07-2026 {today}</p>
    </footer>
  );
}

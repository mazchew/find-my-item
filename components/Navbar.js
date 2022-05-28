import react from "react";

export default function Navbar() {
  return (
    <nav>
      <div>
        <h1 className="logo">FindMyItem</h1>
      </div>
      <ul>
        <a>Gallery</a>
        <a>Noticeboard</a>
      </ul>
    </nav>
  );
}

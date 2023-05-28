import { Link } from "@remix-run/react";

import styles from "~/styles/note-detail.css";

function NoteDetailPage() {
  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all Notes</Link>
        </nav>
        <title>Note Title</title>
      </header>
      <p id="note-details-content">Note Content</p>
    </main>
  );
}

export default NoteDetailPage;

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

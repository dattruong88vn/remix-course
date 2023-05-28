import { json } from "@remix-run/node";
import {
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { getStoredNotes } from "~/data/notes";

import styles from "~/styles/note-detail.css";

function NoteDetailPage() {
  const note = useLoaderData();

  console.log(note);

  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all Notes</Link>
        </nav>
        <title>{note.title}</title>
      </header>
      <h1>{note.title}</h1>
      <p id="note-details-content">{note.content}</p>
    </main>
  );
}

export default NoteDetailPage;

export async function loader({ params }) {
  const notes = await getStoredNotes();
  const noteId = params.id;
  const selectedNote = notes.find((note) => note.id.toString() === noteId);

  if (!selectedNote) {
    throw json("Could not file note with id: " + noteId, {
      status: 404,
      statusText: "Not found",
    });
  }

  return selectedNote;
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export function meta({ data }) {
  return {
    title: data.title,
    description: data.content,
  };
}

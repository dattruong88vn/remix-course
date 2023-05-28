import {
  // json,
  redirect,
} from "@remix-run/node";
import {
  useLoaderData,
  Link,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import NewNote, { links as newNoteLinks } from "~/components/NewNote";
import NoteList, { links as noteListLinks } from "~/components/NoteList";
import { getStoredNotes, storeNotes } from "~/data/notes";

export default function NotesPage() {
  const notes = useLoaderData();

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

export async function loader() {
  const notes = await getStoredNotes();

  if (!notes || notes.length === 0) {
    throw new Response("List note is empty", {
      status: 404,
      statusText: "Not Found",
    });
  }

  return notes;
  // return json(notes);
}

export async function action({ request }) {
  // get data
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);

  // add validation
  if (noteData.title.trim().length <= 5) {
    return { message: "Invalid title - at least 6 characters." };
  }

  // save data
  const existingNotes = await getStoredNotes();
  noteData.id = new Date().valueOf();
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);

  // test loading
  // await new Promise((resolve) =>
  //   setTimeout(() => {
  //     resolve();
  //   }, 2000)
  // );

  // redirect
  return redirect("/notes");
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}

export function ErrorBoundary() {
  const error = useRouteError();

  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return (
      <main>
        <NewNote />
        <p className="info-message">{error.data}</p>
      </main>
    );
  }

  return (
    <main className="error">
      <h1>An error related your notes.</h1>
      <p>{error.message}</p>
      <p>
        Back to link <Link to="/">safety</Link>
      </p>
    </main>
  );
}

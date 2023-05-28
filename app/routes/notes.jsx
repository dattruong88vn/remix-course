import { redirect } from "@remix-run/node";
import NewNote, { links as newNoteLinks } from "~/components/NewNote";
import { getStoredNotes, storeNotes } from "~/data/notes";

export default function NotesPage() {
  return (
    <main>
      <NewNote />
    </main>
  );
}

export async function action({ request }) {
  // get data
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);

  // add validation

  // save data
  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);

  // redirect
  return redirect("/notes");
}

export function links() {
  return [...newNoteLinks()];
}

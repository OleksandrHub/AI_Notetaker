import { Injectable } from "@angular/core";
import { INote } from "../../../Interface/interface.module";
import { BehaviorSubject, max } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class NoteService {
    constructor() { }

    note: INote = {
        id: 0,
        title: '',
        content: ''
    };

    private notes = new BehaviorSubject<INote[]>([
        {
            id: 1,
            title: 'Note 1',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque laudantium recusandae eaque labore eos eum optio numquam dolor, dolore commodi sit dolores voluptatum magnam sunt repellat! Modi ipsum doloribus saepe.'
        },
        {
            id: 2,
            title: 'Note 2',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque laudantium recusandae eaque labore eos eum optio numquam dolor, dolore commodi sit dolores voluptatum magnam sunt repellat! Modi ipsum doloribus saepe.'
        },
        {
            id: 3,
            title: 'Note 3',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque laudantium recusandae eaque labore eos eum optio numquam dolor, dolore commodi sit dolores voluptatum magnam sunt repellat! Modi ipsum doloribus saepe.'
        }
    ])
    notes$ = this.notes.asObservable();

    editNoteObj = new BehaviorSubject<INote>(this.note);
    editNote$ = this.editNoteObj.asObservable();

    saveNote(note: INote) {
        const temp_notes = this.notes.getValue();
        if (note.id === -1) {
            note.id = Math.max(0, ...temp_notes.map((n) => n.id)) + 1;
            const newNotes = [...temp_notes, note];
            this.notes.next(newNotes);
        } else {
            const index = temp_notes.findIndex(n => n.id === note.id);
            if (index !== -1) {
                const updatedNotes = [...temp_notes];
                updatedNotes[index] = note;
                this.notes.next(updatedNotes);
            }
        }
    }

    deleteNote(id: number) {
        let temp_notes = this.notes.getValue();
        temp_notes = temp_notes.filter((note) => note.id !== id);
        this.notes.next(temp_notes);
    }

    editNote(id: number) {
        const temp_notes = this.notes.getValue();
        this.note = temp_notes.filter((note) => note.id === id)[0];
        this.editNoteObj.next(this.note);
    }

    newNote(note: INote) {
        this.editNoteObj.next(note);
    }
}
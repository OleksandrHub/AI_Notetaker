import { Injectable } from "@angular/core";
import { INote } from "../../../Interface/interface.module"; import { BehaviorSubject } from "rxjs";
;

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

    saveNote(note: INote) {
        const temp_notes = this.notes.getValue();
        if (note.id in temp_notes) {
            temp_notes[note.id] = note;
            this.notes.next(temp_notes);
            return;
        }
        temp_notes.push(note);
        this.notes.next(temp_notes);
    }

    deleteNote(id: number) {
        let temp_notes = this.notes.getValue();
        temp_notes = temp_notes.filter((note) => note.id !== id);
        this.notes.next(temp_notes);
    }
}
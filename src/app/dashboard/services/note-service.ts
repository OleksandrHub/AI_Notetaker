import { Injectable } from "@angular/core";
import { INote } from "../../../Interface/interface";;

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

    notes: INote[] = [
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
    ];

    saveNote(note: INote) {
        if (note.id in this.notes) {
            this.notes[note.id] = note;
            return;
        }
        this.notes.push(note);
    }
}
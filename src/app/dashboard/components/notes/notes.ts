import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
// import { NoteComponents } from '../note/note';

@Component({
  selector: 'app-notes',
  imports: [
    NgFor,
  ],
  templateUrl: './notes.html',
  styleUrl: './notes.scss'
})
export class NotesComponents {
  notes = [
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
}

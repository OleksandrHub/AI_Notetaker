// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { environment as evn } from '../';
// import { Observable } from 'rxjs';


// @Injectable({
//   providedIn: 'root'
// })


// export class OpenAIService {
//     private readonly apiUrl = 'https://api.openai.com/v1/engines/davinci/completions';
//     private readonly requestHeaders = {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${evn.OPENAI_API_KEY} `
//     }

//     constructor( private http: HttpClient) { }

//     summarize(text: string): Observable<any> {
//         this.http.post(this.apiUrl, {
//             'model': "gpt-3.5-turbo",
            
//         }))

// }
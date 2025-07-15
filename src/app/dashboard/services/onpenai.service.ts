import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

import { Environment } from "../../../../environment";

@Injectable({
    providedIn: "root",
})
export class OpenAiService {
    private readonly apiUrl = "https://api.openai.com/v1/chat/completions";
    private readonly requestHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Environment.OPENAI_API_KEY}`
    })

    constructor(private http: HttpClient) { }

    summarize(text: string): Observable<any> {
        return this.http.post(this.apiUrl, {
            "model": "gpt-3.5-turbo",
            "messages": [
                { "role": "system", "content": "Ти  асистент, який вміє стисло переказувати текст." },
                { "role": "user", "content": `Ось текст лекції. Сконспектуй головне: ${text}` }
            ]
        }, { headers: this.requestHeader }).pipe(
            map((res: any) => {
                return res.choices[0].message.content
            })
        )
    }
}
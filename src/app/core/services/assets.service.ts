import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class AssetsService {
    constructor(private readonly httpClient: HttpClient) {}

    public get<T>(
        path: string,
        params: HttpParams = new HttpParams()
    ): Observable<T> {
        return this.httpClient.get<T>(`/assets/${path}`, { params });
    }
}

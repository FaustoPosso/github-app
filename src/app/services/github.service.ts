import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { }

  getAccountInfo(): Observable<any>{
    const accountInfo = `https://api.github.com/users/${environment.user}`;
    return this.http.get<any>(accountInfo);   
  }

  getCommitsList(): Observable<any>{
    const commitsList = `https://api.github.com/repos/${environment.user}/${environment.repo}/commits`;
    return this.http.get<any>(commitsList);    
  }
}

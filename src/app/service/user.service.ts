import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createusers(params:JSON):Observable<any>{
    return this.http.post<any>(env.apiHost.concat('/create-users'),params)
  }

  getuserbyid(id:number):Observable<any>{
    return this.http.post<any>(env.apiHost.concat('/get-user'),{"id":id})
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(env.apiHost.concat('/getall-users'))
  }

  updateUser(params:JSON): Observable<any> {
    return this.http.put<any>(env.apiHost.concat('/edit-user'),params)
  }

  deleteUser(id:number): Observable<any> {
    return this.http.post<any>(env.apiHost.concat('/del-user'),{"id":id})
  }
}

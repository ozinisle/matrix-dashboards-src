import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatrixCommunicationChannelEncryptionService } from './matrix-communication-channel-encryption.service';


@Injectable({
  providedIn: 'root'
})
export class MatrixHttpService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient, private commChannelEncryptor: MatrixCommunicationChannelEncryptionService) { }

  doPost(url: string, request: any, httpOptions?: any): Observable<any> {
    if (!httpOptions) {
      httpOptions = this.httpOptions;
    }
    const encryptedRequest = this.commChannelEncryptor.CryptoJS_Aes_OpenSSL_Encrypt(request);
    return this.http.post<any>(url, encryptedRequest, httpOptions);
  }

  doGet(url: string, httpOptions?: any): Observable<any> {
    if (!httpOptions) {
      httpOptions = this.httpOptions;
    }
    return this.http.get(url, httpOptions);
  }

}

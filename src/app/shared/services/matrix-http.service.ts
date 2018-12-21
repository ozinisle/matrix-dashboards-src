import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatrixCommunicationChannelEncryptionService } from './matrix-communication-channel-encryption.service';


@Injectable({
  providedIn: 'root'
})
export class MatrixHttpService {

  constructor(private http: HttpClient, private commChannelEncryptor: MatrixCommunicationChannelEncryptionService) { }

  doPost(url: string, request: any): Observable<any> {
    const encryptedRequest = this.commChannelEncryptor.CryptoJS_Aes_OpenSSL_Encrypt(request);
    return this.http.post<any>(url, encryptedRequest);
  }

  doUnencryptedGet(url: string): Observable<any> {
    return this.http.get(url);
  }

}

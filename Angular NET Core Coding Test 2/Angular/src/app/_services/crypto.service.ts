import { Injectable } from '@angular/core';

//XL change ${config.apiUrl} to environment.apiUrl
import { environment } from 'environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({ providedIn: 'root' })
export class CryptoService {

    EncryptInput1(input) {
        input = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(input), 
        CryptoJS.enc.Utf8.parse(`${environment.angular1}`),{
            keySize: 128 / 8,
            iv: CryptoJS.enc.Utf8.parse(`${environment.iv1}`),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString();
        return input;
    }

    EncryptInput2(input) {
        input = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(input), 
        CryptoJS.enc.Utf8.parse(`${environment.angular2}`),{
            keySize: 128 / 8,
            iv: CryptoJS.enc.Utf8.parse(`${environment.iv2}`),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString();
        return input;
    }
    
}
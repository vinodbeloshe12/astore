import { EventEmitter } from '@angular/core';
import { HttpHeaders } from "@angular/common/http";


// export const apiUrl = "http://malvantarkarlitourplanner.com/vinod/astore/index.php/API/";
// export const imgUrl = "http://malvantarkarlitourplanner.com/vinod/astore/uploads/";
export const apiUrl = "http://localhost/astore/index.php/API/";
export const imgUrl = "http://localhost/astore/uploads/";
export const googleAPIKey = "AIzaSyCpFK_DICH_oZifXRN0cDfIpNOFUfGqS8M";
export let isShowHeader = new EventEmitter();
export let isShowNotification = new EventEmitter();


export const httpOptionsGet = {
    headers: new HttpHeaders({
        Accept: "application/json, text/plain, */*"
    }),
    withCredentials: true
};

export const httpOptionsPost = {
    headers: new HttpHeaders({
        Accept: "application/json",
        "Content-Type": "text/plain;charset=UTF-8"
    }),
    withCredentials: true
};

export const httpOptionsAdmin = {
    headers: new HttpHeaders({}),
    withCredentials: true
};



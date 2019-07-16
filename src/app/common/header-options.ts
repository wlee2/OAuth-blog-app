import { HttpHeaders } from '@angular/common/http';

export const PostHttpOptions = (token) => {
    return {
        headers:
            new HttpHeaders(
                {
                    'Content-Type': 'application/json;x-www-form-urlencoded',
                    'Authorization': `Bearer ${token}`
                }),
        withCredentials: true,
    }
};

export const httpOptions = (token) => {
    return {
        headers:
            new HttpHeaders(
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }),
        withCredentials: true,
    }
};

export const basicHeader = () => {
    return {
        headers:
            new HttpHeaders(
                {
                    "User-Agent": "PostmanRuntime/7.15.2",
                    "Accept": "*/*",
                    "Cache-Control": "no-cache",
                    "Postman-Token": "846dc8e7-77bc-4289-bce2-be0aad818a05,330e5123-33ea-4be7-9ec9-3b8285cecfc0",
                    "Host": "maps.googleapis.com",
                    "Accept-Encoding": "gzip, deflate",
                    "Connection": "keep-alive",
                    "cache-control": "no-cache"
                }),
    }
};
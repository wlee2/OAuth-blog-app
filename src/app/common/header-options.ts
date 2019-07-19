import { HttpHeaders } from '@angular/common/http';

export const PostHttpOptions = (token) => {
    return {
        headers:
            new HttpHeaders(
                {
                    'Content-Type': 'application/json;x-www-form-urlencoded',
                    'Authorization': `Bearer ${token}`
                })
    }
};

export const httpOptions = (token) => {
    return {
        headers:
            new HttpHeaders(
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                })
    }
};
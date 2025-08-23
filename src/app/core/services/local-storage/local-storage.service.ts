import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  save(keyName: string, data: unknown): void {
    localStorage.setItem(keyName, JSON.stringify(data));
  }

  get<T>(keyName: string): T | null {
    const data = localStorage.getItem(keyName);

    return data ? (JSON.parse(data) as T) : null;
  }

  delete(keyName: string): void {
    localStorage.removeItem(keyName);
  }
}

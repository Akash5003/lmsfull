import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BooksManagementDTO } from '../models/books-management.dto';  

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private apiUrl = 'http://localhost:5119/api/BooksManagement'; 

  constructor(private http: HttpClient) {}
  
  getAllBooks(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getBookById(bookId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${bookId}`, { responseType: 'blob' });
  }

  addBook(bookData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, bookData);
  }
  

  deleteBook(bookId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${bookId}`);
  }

  borrowBook(bookId: number, userId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/BorrowBook`, { Book_Id: bookId, User_Id: userId });
  }

  returnBook(bookId: number, userId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/ReturnBook`, { Book_Id: bookId, User_Id: userId });
  }
}

import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  books: any[] = []; 
  bookIdToGet: number | null = null; 
  userId: number = 1; 
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.booksService.getAllBooks().subscribe(
      response => {
        if (response.isSuccess) {
          this.books = response.result; // Assuming your API returns the books here
        } else {
          this.errorMessage = response.errorMessages.join(', ');
        }
      },
      error => {
        this.errorMessage = 'Error fetching books: ' + error.message;
      }
    );
  }

  borrowBook(bookId: number) {
    this.booksService.borrowBook(bookId, this.userId).subscribe(
      response => {
        if (response.isSuccess) {
          this.successMessage = 'Book borrowed successfully!';
          this.getBooks(); // Refresh the book list after borrowing
        } else {
          alert('Error borrowing book: ' + response.errorMessages.join(', '));
        }
      },
      error => {
        alert('Error borrowing book: ' + error.message);
      }
    );
  }

  returnBook(bookId: number) {
    this.booksService.returnBook(bookId, this.userId).subscribe(
      response => {
        if (response.isSuccess) {
          this.successMessage = 'Book returned successfully!';
          this.getBooks(); // Refresh the book list after returning
        } else {
          alert('Error returning book: ' + response.errorMessages.join(', '));
        }
      },
      error => {
        alert('Error returning book: ' + error.message);
      }
    );
  }
  getBookById() {
    if (this.bookIdToGet) {
      this.booksService.getBookById(this.bookIdToGet).subscribe(
        (response: Blob) => {
          // Create a new URL for the Blob and trigger the download
          const url = window.URL.createObjectURL(response);
          const a = document.createElement('a');
          a.href = url;
          a.download = `Book_${this.bookIdToGet}.pdf`; // Use a meaningful filename
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        },
        error => {
          this.errorMessage = 'Error fetching book: ' + error.message;
        }
      );
    } else {
      this.errorMessage = 'Please enter a valid Book ID';
    }
  }
  }
  
      
    
  


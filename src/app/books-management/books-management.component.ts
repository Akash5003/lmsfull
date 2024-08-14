import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-books-management',
  templateUrl: './books-management.component.html',
  styleUrls: ['./books-management.component.css']
})
export class BooksManagementComponent implements OnInit {
  books: any[] = [];
  bookData = {
    bookTitle: '',
    authorName: '',  // Add other necessary fields if applicable
    language: '',
    pdfFile: null as File | null  // Explicitly set type as File or null
  };
  bookIdToDelete: number | null = null;
  errorMessage: string | null = null;
  loading: boolean = false;

  constructor(private bookService: BooksService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.loading = true;
    this.bookService.getAllBooks().subscribe(
      response => {
        if (response.isSuccess) {
          this.books = response.result || [];
          this.loading = false;
        } else {
          this.loading = false;
          this.errorMessage = 'Failed to load users.';

        }
      },
      error => {
        console.error('Error fetching users:', error);
        this.errorMessage = 'Failed to load users.';
      }
    );
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.bookData.pdfFile = file;  // Ensure pdfFile is a File object
    } else {
      this.bookData.pdfFile = null;  // Reset if no file is selected
    }
  }

  addBook() {
    if (!this.bookData.pdfFile) {
      alert('Please select a PDF file to upload.'); // Add validation for file input
      return;
    }

    const formData = new FormData();
    formData.append('bookTitle', this.bookData.bookTitle);
    formData.append('authorName', this.bookData.authorName); 
    formData.append('language', this.bookData.language); 
    formData.append('pdfFile', this.bookData.pdfFile); 

   

    this.bookService.addBook(formData).subscribe((response) => {
      if (response.isSuccess) {
        alert('Book added successfully');
        this.getBooks(); 
        this.resetForm(); 
      } else {
        alert(response.errorMessages.join(', '));   
      }
    });
  }

  prepareToDeleteBook(id: number) {
    this.bookIdToDelete = id; // Set the ID of the book to delete
  }

  deleteBook() {
    if (this.bookIdToDelete !== null) {
      this.bookService.deleteBook(this.bookIdToDelete).subscribe((response) => {
        if (response.isSuccess) {
          alert('Book deleted successfully');
          this.getBooks(); // Refresh the book list
          this.bookIdToDelete = null; // Reset deletion state
        } else {
          alert(response.errorMessages.join(', '));
        }
      });
    }
  }

  resetForm() {
    this.bookData = { bookTitle: '', authorName: '', language: '', pdfFile: null }; // Reset form
  }
}

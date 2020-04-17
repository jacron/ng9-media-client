import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BooksStartComponent} from './components/books-start/books-start.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {MatModule} from '../mat/mat.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthorAutocompleteComponent } from './components/autocomplete/author-autocomplete/author-autocomplete.component';
import { TitleAutocompleteComponent } from './components/autocomplete/title-autocomplete/title-autocomplete.component';
import { AuthorComponent } from './components/author/author.component';
import { BookComponent } from './components/book/book.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { BookEditComponent } from './components/book-edit/book-edit.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { AuthorEditComponent } from './components/author-edit/author-edit.component';
import { EditFieldComponent } from './components/edit-field/edit-field.component';
import { TitleQueryComponent } from './components/title-query/title-query.component';
import { BookAuthorAutocompleteComponent } from './components/autocomplete/book-author-autocomplete/book-author-autocomplete.component';
import { BookProposalComponent } from './components/book-proposal/book-proposal.component';
import { BookMenuComponent } from './components/book-menu/book-menu.component';
import { AuthorMenuComponent } from './components/author-menu/author-menu.component';
import { AuthorCardComponent } from './components/author-card/author-card.component';
import { AuthorWikiComponent } from './components/author-wiki/author-wiki.component';
import { IsbnInputComponent } from './components/isbn-input/isbn-input.component';
import { TitleQueryInputComponent } from './components/title-query-input/title-query-input.component';
import { GenreSelectComponent } from './components/genre-select/genre-select.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import { DialogAuthorComponent } from './dialogs/dialog-author/dialog-author.component';
import { AuthorEditCardComponent } from './components/author-edit-card/author-edit-card.component';
import { AuthorEditMenuComponent } from './components/author-edit-menu/author-edit-menu.component';
import { AuthorBooksListComponent } from './components/author-books-list/author-books-list.component';
import { BookEditCardComponent } from './components/book-edit-card/book-edit-card.component';
import { BookEditMenuComponent } from './components/book-edit-menu/book-edit-menu.component';
import { DialogBookComponent } from './dialogs/dialog-book/dialog-book.component';
import { BookRemoteComponent } from './components/book-remote/book-remote.component';
import { BookBarcodesComponent } from './components/book-barcodes/book-barcodes.component';

@NgModule({
  declarations: [
    BooksStartComponent,
    AuthorAutocompleteComponent,
    TitleAutocompleteComponent,
    AuthorComponent,
    BookComponent,
    BookCardComponent,
    BookEditComponent,
    AuthorsComponent,
    AuthorEditComponent,
    EditFieldComponent,
    TitleQueryComponent,
    BookAuthorAutocompleteComponent,
    BookProposalComponent,
    BookMenuComponent,
    AuthorMenuComponent,
    AuthorCardComponent,
    AuthorWikiComponent,
    IsbnInputComponent,
    TitleQueryInputComponent,
    GenreSelectComponent,
    DialogAuthorComponent,
    AuthorEditCardComponent,
    AuthorEditMenuComponent,
    AuthorBooksListComponent,
    BookEditCardComponent,
    BookEditMenuComponent,
    DialogBookComponent,
    BookRemoteComponent,
    BookBarcodesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatModule,
    RouterModule,
    FormsModule,  // needed for input
    ReactiveFormsModule, // needed for formcontrol
  ],
  exports: [
    BooksStartComponent,
  ],
  entryComponents: [
    DialogAuthorComponent,
    DialogBookComponent,
  ],
})
export class BooksModule { }

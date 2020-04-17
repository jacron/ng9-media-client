import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Album} from '../../../../../classes/music/Album';
import {DialogInputComponent} from '../../../album/dialogs/dialog-input/dialog-input.component';
import {MusicService} from '../../../services/music.service';
import {Cuesheet} from '../../../../../classes/music/Cuesheet';
import {MatDialog} from '@angular/material';
import {DialogAliassingPartsComponent} from '../../../album/dialogs/dialog-aliassing-parts/dialog-aliassing-parts.component';

@Component({
  selector: 'app-cuesheet-menu',
  templateUrl: './cuesheet-menu.component.html',
  styleUrls: ['./cuesheet-menu.component.scss']
})
export class CuesheetMenuComponent implements OnInit {
  @Input() album: Album;
  @Input() cuesheet: Cuesheet;
  @Output() titleChange = new EventEmitter();
  @Output() removed = new EventEmitter();

  constructor(
    private musicService: MusicService,
    private dialog: MatDialog,
  ) { }

  afterRenameTitle(title: string, id: number) {
    console.log(title);
    this.titleChange.emit({
      title: title,
      id: id
    });
  }

  renameTitle() {
    const dialogRef = this.dialog.open(DialogInputComponent, {
      width: '75%',
      data: {
        prompt: '',
        default: this.cuesheet.title
      }
    });
    dialogRef.afterClosed().subscribe(
      title => {
        if (title && title.length > 0) {
          this.musicService.updateCuesheetTitle(this.cuesheet.filename, this.album.ID, title)
            .subscribe(
              () => this.afterRenameTitle(title, this.cuesheet.id),
              error1 => console.log(error1)
            );
        }
      }
    );
  }

  aliasParts() {
    const dialogRef = this.dialog.open(DialogAliassingPartsComponent, {
      width: '75%',
      data: {
        cuesheet: this.cuesheet,
        album: this.album,
      }
    });
    dialogRef.afterClosed().subscribe(
    );
  }

  edit() {
    // console.log(this.cuesheet);
    this.musicService.editCue(this.cuesheet.filename, this.album.ID).subscribe(
      () => {},
      (error) => console.error(error)
    );
  }

  afterDelete(id) {
    this.removed.emit(id);
  }

  remove() {
    if (confirm('delete "' + this.cuesheet.title + '"?')) {
      this.musicService.deleteCue(this.cuesheet.filename, this.cuesheet.id, this.album.ID)
        .subscribe(() => this.afterDelete(this.cuesheet.id)
        );
    }
  }

  ngOnInit() {
  }

}

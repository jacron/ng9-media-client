import {Component, Inject, OnInit} from '@angular/core';
import {Person} from '../../../../../classes/music/Person';
import {Tag} from '../../../../../classes/music/Tag';
import {forkJoin} from 'rxjs';
import {MusicService} from '../../../services/music.service';
import {AlbumDetailsComponent} from '../../../album/components/album-details/album-details.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {DialogInputComponent} from '../../../album/dialogs/dialog-input/dialog-input.component';
import {Instrument} from '../../../../../classes/music/Instrument';
import {Album} from '../../../../../classes/music/Album';

@Component({
  selector: 'app-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.scss']
})
export class DialogAddComponent implements OnInit {

  // from data
  album: Album;

  composers: Person[];
  performers: Person[];
  instruments: Instrument[];
  tags: Tag[];
  labelAdd = 'add';
  labelNew = 'new';
  choices;
  nameComposer = 'composer';
  namePerformer = 'performer';
  nameTag = 'tag';
  nameInstrument = 'instrument';

  constructor(private musicService: MusicService,
              public dialogRef: MatDialogRef<AlbumDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialog,
              ) { }

  close(e) {
    // console.log('result dialog person: ', e);
    if (e === 'leave') {
      this.dialogRef.close(e);
    }
  }

  afterAddComposer(response, choice, mockComposer) {
    this.album.album_componisten.push(mockComposer);
    choice.text = '';
  }

  addComposer(choice) {
    const mockComposer = {
      FullName: choice.items.find(item => item.ID === choice.id).FullName,
      ID: choice.id
    };
    this.musicService.addComposer(choice.id, this.album.ID).subscribe(
      (response) => this.afterAddComposer(response, choice, mockComposer),
      (error) => console.error(error)
    );
  }

  createComposer(choice, name) {
    this.musicService.newComposer(name, this.album.ID).subscribe(
      response => {
        this.afterAddComposer(response, choice, {
          FullName: name,
          ID: response
        });
      }
    );
  }

  newComposer(choice) {
    const dialogRef = this.dialog.open(DialogInputComponent, {
      data: {
        prompt: 'Name of the new composer',
        default: choice.text,
      }
    });
    dialogRef.afterClosed().subscribe(
      name => {
        if (name && name.length > 0) {
          this.createComposer(choice, name);
        }
      }
    );
  }

  afterAddPerformer(response, choice, mockPerformer) {
    this.album.album_performers.push(mockPerformer);
    choice.text = '';
  }

  addPerformer(choice) {
    const mockPerformer = {
      FullName: choice.items.find(item => item.ID === choice.id).FullName,
      ID: choice.id
    };
    this.musicService.addPerformer(choice.id, this.album.ID).subscribe(
      (response) => this.afterAddPerformer(response, choice, mockPerformer)
    );
  }

  createPerformer(choice, name) {
    this.musicService.newPerformer(name, this.album.ID).subscribe(
      response => this.afterAddPerformer(response, choice, {
        FullName: name,
        ID: response
      })
    );
  }

  newPerformer(choice) {
    const dialogRef = this.dialog.open(DialogInputComponent, {
      data: {
        prompt: 'Name of the new performer',
        default: choice.text,
      }
    });
    dialogRef.afterClosed().subscribe(
      name => {
        if (name && name.length > 0) {
          this.createPerformer(choice, name);
        }
      }
    );
  }

  afterAddTag(response, choice, mockTag) {
    this.album.album_tags.push(mockTag);
    choice.text = '';
  }

  addTag(choice) {
    const mockTag = {
      Name: choice.items.find(item => item.ID === choice.id).Name,
      ID: choice.id
    };
    this.musicService.addTag(choice.id, this.album.ID).subscribe(
      (response) => this.afterAddTag(response, choice, mockTag)
    );
  }

  createTag(choice, name) {
    this.musicService.newTag(name, this.album.ID).subscribe(
      response => this.afterAddTag(response, choice, {
        Name: name,
        ID: response
      })
    );
  }

  newTag(choice) {
    const dialogRef = this.dialog.open(DialogInputComponent, {
      data: {
        prompt: 'Name of the new tag',
        default: choice.text,
      }
    });
    dialogRef.afterClosed().subscribe(
      name => {
        if (name && name.length > 0) {
          this.createTag(choice, name);
        }
      }
    );
  }

  afterAddInstrument(response, choice, mockInstrument) {
    this.album.album_instrument = mockInstrument;
    choice.text = '';
  }

  addInstrument(choice) {
    const name = choice.items.find(item => item.ID === choice.id).Name;
    this.musicService.addInstrument(choice.id, this.album.ID).subscribe(
      response => this.afterAddInstrument(response, choice, {
        Name: name,
        ID: choice.id
      })
    );
  }

  createInstrument(choice, name) {
    this.musicService.newInstrument(name, this.album.ID).subscribe(
      response => this.afterAddInstrument(response, choice, {
        Name: name,
        ID: response
      })
    );
  }

  newInstrument(choice) {
    const dialogRef = this.dialog.open(DialogInputComponent, {
      data: {
        prompt: 'Name of the new instrument',
        default: choice.text,
      }
    });
    dialogRef.afterClosed().subscribe(
      name => {
        if (name && name.length > 0) {
          this.createInstrument(choice, name);
        }
      }
    );
  }

  addItem(choice) {
    switch (choice.name) {
      case this.nameComposer:
        this.addComposer(choice);
        break;
      case this.namePerformer:
        this.addPerformer(choice);
        break;
      case this.nameTag:
        this.addTag(choice);
        break;
      case this.nameInstrument:
        this.addInstrument(choice);
        break;
    }
    choice.id = -1;
  }

  newItem(choice) {
    switch (choice.name) {
      case this.nameComposer:
        this.newComposer(choice);
        break;
      case this.namePerformer:
        this.newPerformer(choice);
        break;
      case this.nameTag:
        this.newTag(choice);
        break;
      case this.nameInstrument:
        this.newInstrument(choice);
        break;
    }
  }

  makeChoices() {
    this.choices = [
      {
        name: this.nameComposer,
        placeholder: 'Componist',
        displayfield: 'FullName',
        items: this.composers,
        id: -1,
      },
      {
        name: this.namePerformer,
        placeholder: 'Performer',
        displayfield: 'FullName',
        items: this.performers,
        id: -1,
      },
      {
        name: this.nameTag,
        placeholder: 'Tag',
        displayfield: 'Name',
        items: this.tags,
        id: -1,
      },
      {
        name: this.nameInstrument,
        placeholder: 'Instrument',
        displayfield: 'Name',
        items: this.instruments,
        id: -1,
      },

    ];
  }

  afterGetItems(results) {
    this.composers = <Person[]>results[0];
    this.performers = <Person[]>results[1];
    this.tags = <Tag[]>results[2];
    this.instruments = <Instrument[]>results[3];
    this.makeChoices();
  }

  getItems() {
    const qcomposers = this.musicService.getComposers('typeahead');
    const qperformers = this.musicService.getPerformers('typeahead');
    const qtags = this.musicService.getTags();
    const qinstruments = this.musicService.getInstruments();
    forkJoin(qcomposers, qperformers, qtags, qinstruments)
      .subscribe(
        (results) => this.afterGetItems(results),
        err => console.error(err),
        () => {
        }
      );
  }

  ngOnInit() {
    this.getItems();
    this.album = this.data.album;
  }

}

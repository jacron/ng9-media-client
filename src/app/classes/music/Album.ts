import {Person} from './Person';
import {Tag} from './Tag';
import {Instrument} from './Instrument';
import {Piece} from './Piece';
import {Cuesheet} from './Cuesheet';

export class Album {
  Title: string;
  // AlbumID: number;
  ID: number;
  Path: string;
  Description: string;
  ASIN: string;
  album_performers: Person[];
  album_componisten: Person[];
  album_metatags: any;
  album_tags: Tag[];
  album_instrument: Instrument;
  pieces: Piece[];
  cuesheets: Cuesheet[];
  expanded: boolean;
  album_back_image: boolean;
  mother: Album;
  website: string;
  filteredPieces?: Piece[];
  discid?: string;
  asin?: string;
  // album_folder_image: boolean;

  // constructor() { this.expanded = true; }
}


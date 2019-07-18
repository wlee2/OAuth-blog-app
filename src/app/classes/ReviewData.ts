// binder
export class ReviewData {
  Author_ID: string;
  Location: Location;
  ReviewContent: string;
  PlaceRate: number;
  Photos: Photo[];
  Comments : Comment[];
}

export class Location {
  Reference: string;
  Name: string;
  Address: string;
  Lat: number;
  Lng: number;
}

export class Photo {
  PhotoReference: string;
  constructor(reference: string) {
    this.PhotoReference = reference;
  }
}

export class Comment {
  CommentContent: string;
  Author_ID: string;
}

// getter
export class ReviewModel {
  ID: number;
  Author: AuthorModel;
  Location: Location;
  ReviewContent: string;
  PlaceRate: number;
  Photos: Photo[];
  Comments : Comment[];
  WrittenDate: Date;
}

export class AuthorModel {
  ID: string;
  Name: string;
  Gender: string;
  Picture: string;
}

export class PhotoModel {
  PhotoID: number;
  PhotoReference: string;
}
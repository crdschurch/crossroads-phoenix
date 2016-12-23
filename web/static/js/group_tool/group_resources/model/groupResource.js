
export default class GroupResource {
  constructor(jsonObject) {
    if (jsonObject) {
      this._assignProperties(jsonObject);
    } else {
      this._assignProperties({});
    }
  }

  _assignProperties(source) {
      this.title = source.title;
      this.tagline = source.tagline;
      this.type = source.resourceType;
      this.author = source.author;
      this.sortOrder = source.sortOrder ? parseInt(source.sortOrder) : undefined;
      if(source.image && source.image.filename) {
        this.image = source.image.filename;
      } else {
        this.image = undefined;
      }

      if(!this.isPdf()) {
        this.url = source.url;
      } else if(source.pdfFile && source.pdfFile.filename) {
        this.url = source.pdfFile.filename;
      } else {
        this.url = undefined;
      }
  }

  getTitle() {
    return this.title;
  }

  getTagline() {
    return this.tagline;
  }

  getUrl() {
    return this.url;
  }

  hasUrl() {
    return this.url !== undefined && this.url !== null && this.url.length > 0;
  }

  getAuthor() {
    return this.author;
  }

  getImage() {
    return this.image;
  }

  getType() {
    return this.type;
  }

  getIcon() {
    return this.isPdf() ? 'file-pdf' : this.isBook() ? 'book' : 'link';
  }

  isPdf() {
    return this.type === 'file-pdf';
  }

  isBook() {
    return this.type === 'book';
  }

  isOther() {
    return this.type === 'other';
  }

  getSortOrder() {
    return this.sortOrder;
  }

  compareTo(other) {
    if(other === undefined || other === null) {
      return 1;
    }

    if(this.getSortOrder() === undefined && other.getSortOrder() === undefined) {
      return 0;
    }

    if(this.getSortOrder() === undefined) {
      return -1;
    }

    if(other.getSortOrder() === undefined) {
      return 1;
    }

    let compare = this.getSortOrder() - other.getSortOrder();
    return compare > 0 ? 1 : compare < 0 ? -1 : 0; 
  }
}
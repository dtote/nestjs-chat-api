export class Message {
  private id: string

  private from: string

  private to: string

  private note: string

  constructor(params: { id: string; from: string; to: string; note: string }) {
    this.id = params.id
    this.from = params.from
    this.to = params.to
    this.note = params.to
  }

  getId() {
    return this.id
  }

  getFrom() {
    return this.from
  }

  getTo() {
    return this.to
  }

  getNote() {
    return this.note
  }
}

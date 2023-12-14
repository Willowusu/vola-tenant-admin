export default class Response<Type> {
    constructor(status: string, message: string, data: Type | null) {
      this.status = status;
      this.message = message;
      this.data = data;
    }
  
    public status!: string;
    public message!: string;
    public data!: Type | null;
  }
  
export class resDto {
  texts: string;
  msg: string;
  status: boolean


 constructor(texts,message,status) {
  this.texts = texts;
  this.msg = message;
  this.status = status;
 }
}
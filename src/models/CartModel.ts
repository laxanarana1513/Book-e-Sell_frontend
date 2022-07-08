import { BookModel } from "./BookModel";

export class CartModel {
 id?: number;
 userid!: number;
 bookid!: number;
 quantity!: number;

}

export class CartList {
 id!: number;
 userid!: number;
 book!: BookModel;
 quantity!: number;
//  bookid!: BookModel['id'];
}

export class GetCart {
 records!: CartList[];
 totalRecords!: number;
 length!: number;
}

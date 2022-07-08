import React, { useEffect, useState } from "react";
import { cartStyle } from "./style";
import { Typography, Button, Link } from "@material-ui/core";
import { CartList } from "../../models/CartModel";
import cartService from "../../service/cart.service";
import { AuthContextModel, useAuthContext } from "../../context/auth";
import { toast } from "react-toastify";
// import orderService from "../../service/order.service";
// import { OrderAddModel } from "../../models/OrderModel";
import Shared from "../../utils/shared";
import { CartContextModel, useCartContext } from "../../context/cart";
import { useHistory } from "react-router-dom";
import { BookModel } from "../../models/BookModel";
import { RoutePaths } from "../../utils/enum";

const Cart: React.FC = () => {
	const authContext: AuthContextModel = useAuthContext();
	const cartContext: CartContextModel = useCartContext();
	const history = useHistory();

	const [BookList, setBookList] = useState<CartList[] | any>([]);
	const [ItemsInCart, setItemsInCart] = useState<number>(0);
	const [TotalPrice, setTotalPrice] = useState<number>(0);

	const classes = cartStyle();

	const getTotalPrice = (ItemList: CartList[]) => {
		let totalPrice = 0;
		ItemList.map((item: CartList) => {
			const itemPrice = item.quantity * parseInt(item.book.price);
			totalPrice = totalPrice + itemPrice;
		});
		setTotalPrice(totalPrice);
	};

	useEffect(() => {
		// console.log("cartContext.cartData", cartContext.cartData);
		if (authContext.user.id) {
			cartService.getList(authContext.user.id).then((res) => {

				console.log("hello", res)

				setBookList(res)
				setItemsInCart(res.length)
				console.log(res.length)
			});
		}
		// const userCart = cartService.getList(authContext.user.id);
		// console.log(cartContext.cartData.totalRecords)
		// setItemsInCart(cartContext.cartData.length)
	}, [authContext.user.id]);
	console.log("bookist", BookList);

	const removeItem = async (id: number) => {
		try {
			const res = await cartService.removeItem(id);
			if (res) {
				cartContext.updateCart();
				toast.success("Item removed from Cart")
				history.push(RoutePaths.Cart)
			}
		} catch (error) {
			toast.error("Somthing went wrong!");
		}
	};
	const updateQuantity = async (cartItem: CartList, inc: Boolean, e: any) => {
		const current_count = parseInt(
			e.target.closest(".qty-group").children[1].innerText
		);
		const quantity = inc ? current_count + 1 : current_count - 1;
		console.log("Qty", quantity)
		if (quantity === 0) {
			toast.error("Item quantity should not be zero");
			return;
		}
		const newCount = inc
			? current_count + 1
			: current_count - 1;
		e.target.closest(".qty-group").children[1].innerText = newCount;

		const item: CartList = BookList.find(
			(items: { book: { id: number, price: string } }) => {
				console.log(items.book.id)
				cartService.updateItem({
					quantity: quantity,
					userid: cartItem.userid,
					bookid: items.book.id
				})
					.then(res => {
						if (items.book.id === cartItem.book.id) {
							const newPrice = inc
								? TotalPrice + parseInt(items.book.price)
								: TotalPrice - parseInt(items.book.price);
							
							setTotalPrice(newPrice);
						}
					})
			}
		)

		// const item: CartList | undefined = BookList.find(
		// 	(item: { book: { id: number | undefined, price: string } }) => {

		// 		// if(item.book.id === cartItem.book.id){

		// 		// }
		// 		console.log(item.book.id)
		// 		console.log(item.book.price)
		// 		const newPrice = inc
		// 			? TotalPrice + parseInt(item.book.price)
		// 			: TotalPrice - parseInt(item.book.price);
		// 		console.log("price", newPrice)
		// 		setTotalPrice(newPrice);
		// 		console.log("item", item)
		// 	}
		// );




		// cartService
		// 	.updateItem({
		// 		id: cartItem.id,
		// 		userid: cartItem.userid,
		// 		bookid: cartItem.book.id as number,
		// 		quantity: quantity
		// 	})
		// 	.then((res) => {
		// 		console.log("cart", res)
		// 		if (res) {
		// 			const item: CartList | undefined = BookList.find(
		// 				(item: { book: { id: number | undefined } }) =>
		// 					item.book.id === cartItem.book.id
		// 			);

		// 			if (item) {
		// 				const current_div_count: number = parseInt(
		// 					e.target.closest(".qty-group").children[1].innerText
		// 				);
		// 				const newCount = inc
		// 					? current_div_count + 1
		// 					: current_div_count - 1;
		// 				e.target.closest(".qty-group").children[1].innerText = newCount;
		// 				console.log("new", newCount)
		// const newPrice = inc
		// 	? TotalPrice + parseInt(item.book.price)
		// 	: TotalPrice - parseInt(item.book.price);
		// console.log("price", newPrice)
		// setTotalPrice(newPrice);
		// }
		// }
		// });
	};

	const PlaceOrder = async () => {

		if (authContext.user.id) {
			cartService.getList(authContext.user.id).then((res) => {
				console.log(res.length)
				if (res.length !== 0) {
					toast.success("Congratualations!! Your Order is Placed")
				}

				setBookList(res)

			})
				.catch(err => {

					toast.error("Cart Is Empty")
					history.push(RoutePaths.BookListing)

				});
		}
	};

	return (
		<div className={classes.cartWrapper}>
			<div className="container">
				<Typography variant="h1">Cart page</Typography>
				<div className="cart-heading-block">
					<Typography variant="h2">
						My Shopping Bag ({ItemsInCart} Items)
					</Typography>
					<div className="total-price">Total price: {TotalPrice}</div>
				</div>
				<div className="cart-list-wrapper">
					{BookList.map((cartItem: any) => {
						return (
							<div className="cart-list-item" key={cartItem.id}>
								<div className="cart-item-img">
									<Link>
										<img src={cartItem.base64image} alt="dummy-image" />
									</Link>
								</div>
								<div className="cart-item-content">
									<div className="cart-item-top-content">
										<div className="cart-item-left">
											{/* <p className="brand">{cartItem.bookname}</p> */}
											<Link>{cartItem.bookname}</Link>
										</div>
										<div className="price-block">
											<span className="current-price">
												MRP &#8377; {cartItem.price}
											</span>
										</div>
									</div>
									<div className="cart-item-bottom-content">
										<div className="qty-group">
											<Button
												className="btn pink-btn"
												onClick={(e: any) => updateQuantity(cartItem, true, e)}
											>
												+
											</Button>
											<span className="number-count">{cartItem.quantity}</span>
											<Button
												className="btn pink-btn"
												onClick={(e: any) => updateQuantity(cartItem, false, e)}
											>
												-
											</Button>
										</div>
										<Link onClick={() => removeItem(cartItem.id)}>Remove</Link>
									</div>
								</div>
							</div>
						);
					})}
				</div>
				<div className="btn-wrapper">
					<Button className="btn pink-btn" onClick={PlaceOrder}>
						Place order
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Cart;
// only front-end

/** @class Used for generating new CartcookieItems
 * @example const cartCookieItem = new CartCookieItem(1, 1);
 */
export class CartCookieItem {
  productId: number;
  productQuantity: number;

  /** constructor for initializing a new CartCookieItem
   * @param {Number} productId
   * @param {Number} productQuantity
   *
   * @example const cartCookieItem = new CartCookieItem(1, 1);
   */
  constructor(productId: number, productQuantity: number) {
    this.productId = productId;
    this.productQuantity = productQuantity;
  }
}

/** @class A class for handling ShoppingCart Information inside of a cookie (!only front-end)
 *
 * - Initializing a new CartCookie() will generate a private cookie object and add it to document.cookie
 * - Adding or removing a CartCookieItem will automatically update the cookie inside document.cookie
 *
 * @function addCartItem() -> Adds An Item to the cart cookie
 * @function removeCartItem() -> Removes an Item from the cart cookie
 */
export class CartCookie {
  cookie: Array<CartCookieItem>;

  /** constructor for initializing a new CartCookie
   * @example const cookie = new CartCookie();
   */
  constructor() {
    const _getCartCookie = this.#getCartCookie();

    if (_getCartCookie) {
      this.cookie = _getCartCookie;
    } else {
      this.cookie = [];
      this.#setCartCookie();
    }
  }

  /** Adds a certain quantity of an item id
   * @param {CartCookieItem} cartCookieItem
   * @example cookie.addCartItem(new CartCookieItem(1, 1));
   */
  addCartItem(cartCookieItem: CartCookieItem) {
    if (!(cartCookieItem instanceof CartCookieItem)) {
      throw new Error(
        `passed parameter ${cartCookieItem} is not an instance of class CartCookieItem`,
      );
    }

    for (const index in this.cookie) {
      if (this.cookie[index].productId === cartCookieItem.productId) {
        this.cookie[index].productQuantity += cartCookieItem.productQuantity;
        this.#setCartCookie();
        return;
      }
    }

    this.cookie.push(cartCookieItem);
    this.#setCartCookie();
  }

  /** Removes a certain quantity of a certain item id
   * @param {CartCookieItem} cartCookieItem
   * @example cookie.removeCartItem(new CartCookieItem(1, 1));
   */
  removeCartItem(cartCookieItem: CartCookieItem) {
    if (!(cartCookieItem instanceof CartCookieItem)) {
      throw new Error(
        `passed parameter ${cartCookieItem} is not an instance of class CartCookieItem`,
      );
    }

    for (const index in this.cookie) {
      if (this.cookie[index].productId === cartCookieItem.productId) {
        if (
          cartCookieItem.productQuantity >= this.cookie[index].productQuantity
        ) {
          this.cookie.splice(Number(index), 1);
        } else {
          this.cookie[index].productQuantity -= cartCookieItem.productQuantity;
        }

        this.#setCartCookie();
        return;
      }
    }

    throw new Error(
      `couldn't find requested CartCookieItem ${cartCookieItem} to remove`,
    );
  }

  /** Returns the amount of items in the shopping cart
   * @example cookie.getCartItemCount();
   */
  getCartItemCount() {
    let count: number = 0;
    for (const { productQuantity } of this.cookie) {
      count += productQuantity;
    }

    return count;
  }

  #getCartCookie() {
    type DocumentCookies = {
      [key: string]: string;
    };

    const cookies: DocumentCookies = document.cookie
      .split(';')
      .map((cookie) => {
        return cookie.split('=');
      })
      .reduce((accumulator, [key, value]) => {
        return { ...accumulator, [key.trim()]: decodeURIComponent(value) };
      }, {});

    if ('CartCookie' in cookies) {
      return JSON.parse(cookies.CartCookie);
    }

    return undefined;
  }

  #setCartCookie() {
    document.cookie = `CartCookie=${JSON.stringify(this.cookie)}`;
  }
}

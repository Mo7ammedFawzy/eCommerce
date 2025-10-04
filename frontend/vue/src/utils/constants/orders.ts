import {Order} from "@/types/common.ts";

export const orders: Order[] = [
  {
    "createdAt": "2024-12-18T18:54:31.214Z",
    "id": "4d3e58f2-3ef3-497a-bf39-b42e01f442e7",
    "paymentMethod": "cash_on_delivery",
    "state": "pending",
    "total": "280.9",
    "customer": {
      "firstName": "Mohammed",
      "lastName": "Fawzey",
      "email": "dev.fawzey@gmail.com",
      "phoneNumber": "01220314609",
      "address": "Beni_Suef",
      "townCity": "Beni_Suef",
      "state": "Beni_Suef",
      "zip": "3123123",
      "country": "Tunisia"
    },
    "items": [
      {
        "product": {
          "id": 3,
          "label": "Mens Cotton Jacket",
          "price": 55.99,
          "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
          "category": "men's clothing",
          "images": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
          "rating": {
            "rate": 4.7,
            "count": 500
          }
        },
        "quantity": 3
      },
      {
        "product": {
          "id": 2,
          "label": "Mens Casual Premium Slim Fit T-Shirts ",
          "price": 22.3,
          "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
          "category": "men's clothing",
          "images": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
          "rating": {
            "rate": 4.1,
            "count": 259
          }
        },
        "quantity": 3
      },
      {
        "product": {
          "id": 1,
          "label": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
          "price": 109.95,
          "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
          "category": "men's clothing",
          "images": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
          "rating": {
            "rate": 3.9,
            "count": 120
          }
        },
        "quantity": 2
      }
    ]
  }
]
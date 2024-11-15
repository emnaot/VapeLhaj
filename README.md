# Vape Store Online Shopping Platform - MERN Stack

<div style="display: flex; overflow-x: auto; white-space: nowrap; gap: 10px; padding: 10px;">

  <img src="https://github.com/user-attachments/assets/3e12883d-9e68-4032-b761-670d3025b30b" alt="Home Page Banner" width="400">
  <img src="https://github.com/user-attachments/assets/7954a700-150e-465d-a875-531cd11a46ee" alt="Home Page Product" width="400">
  <img src="https://github.com/user-attachments/assets/3480abfb-35a3-4e5c-b356-428bc6f1b610" alt="Product Category" width="400">
  <img src="https://github.com/user-attachments/assets/03503d9d-4a5f-4ef4-b34a-e783b32e47df" alt="Product Details" width="400">
  <img src="https://github.com/user-attachments/assets/ac977cac-c8c2-4ee0-9cb8-8333aed3439f" alt="Shopping Cart" width="400">
  <img src="https://github.com/user-attachments/assets/df472da4-4743-4513-97c9-ae0945b22708" alt="Admin Panel" width="400">

</div>

[Watch Demo on YouTube](https://www.youtube.com/watch?v=9yBf5LDiSpw&t=7s&ab_channel=emnaothmen)
## Description

This project is a full-stack e-commerce platform built for a vape store. The platform enables customers to browse, search, and purchase products seamlessly, with key features such as product filtering, add-to-cart functionality, and secure checkout using Stripe integration. It also includes image zoom for product detail views and complete CRUD operations for product management. Admins and users have role-based access, while JWT token authentication ensures secure access.

## Key Features

- **Product Filtering and Search**: Allows customers to filter and search products efficiently.
- **Add-to-Cart**: Customers can easily add items to their cart and view cart details.
- **Secure Checkout with Stripe Integration**: Supports secure payment handling via Stripe.
- **Image Zoom**: Enhances the shopping experience with zoom functionality for product images.
- **CRUD Operations for Product Management**: Full management capabilities for adding, editing, and deleting products.
- **Role-Based Access**: Admins have full access to manage products and view orders, while users can browse and purchase items.
- **JWT Token Authentication**: Secures the platform with token-based user authentication.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Express.js, MongoDB
- **Payment Integration**: Stripe
- **Authentication**: JWT Token Authentication



## Environment Variables

### Backend `.env`

- `MONGODB_URI`: Your MongoDB connection URI.
- `TOKEN_SECRET_KEY`: Secret key for JWT authentication.
- `FRONTEND_URL`: URL of the frontend application.

### Frontend `.env`

- `REACT_APP_CLOUD_NAME_CLOUDINARY`: Cloudinary cloud name if using Cloudinary for images.

## License

This project is licensed under the MIT License.

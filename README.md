Product and Cart APIs    
A Node.js project that provides a set of APIs for managing products and handling a simple shopping cart system. The API allows for creating, updating, deleting products, and adding/removing products from a cart with subtotal and total calculations.

Features   
Product Management:

Create, edit, update, and delete products.   
Product attributes: Name, Price, Image, Quantity, Sale Price (optional).   
Cart Management:   

Add products to the cart.      
Update product quantities in the cart.            
Delete products from the cart.                                       
Calculate cart subtotal and total (taking sale prices into account).                
Pricing Logic:                           

Sale price, if available, is used in subtotal and total calculations.               
Fallback to the regular price if no sale price exists.                      
Tech Stack               
Node.js with Express.js                           
MongoDB with Mongoose                    
Postman (for API testing)               
Installation                     
Prerequisites                      
Make sure you have the following installed on your machine:                 

Node.js                              
MongoDB                          
Postman (optional, for testing)                     

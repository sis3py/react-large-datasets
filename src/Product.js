
const Product = ({ product: {thumbnail, label, description, price, quantity }}) => {
    return (
<div className="product">
    <div className="thumbnail">
    <img height="100" src={thumbnail} alt="Product" />
    </div>
    <div className="label">
        {label}
    </div>
    <div className="description">
        {description}
    </div>
    <div className="price">
        {price} €
    </div>
    <div className="quantity">
        {quantity}
    </div>
</div>
    )};

export default Product;


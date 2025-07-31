package com.site.ecommerce.services;

import com.site.ecommerce.dtos.DTOUpdateProduct;
import com.site.ecommerce.models.Product;

import java.util.List;

public interface ProductService
{
	Product createProduct(Product product);

	List<Product> getAllProducts();

	void clearAllProducts();

	Product getProductById(Long id);

	void deleteProductById(Long id);

	Product updateProduct(Long id, DTOUpdateProduct updatedProduct);
}

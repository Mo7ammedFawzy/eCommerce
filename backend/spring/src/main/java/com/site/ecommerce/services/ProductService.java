package com.site.ecommerce.services;

import com.site.ecommerce.models.Product;

import java.util.List;

public interface ProductService
{
	Product createProduct(Product product);

	List<Product> getAllProducts();
}

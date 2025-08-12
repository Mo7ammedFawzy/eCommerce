package com.site.ecommerce.services;

import com.site.ecommerce.dtos.DTOUpdateProduct;
import com.site.ecommerce.models.Product;

import java.util.*;

public interface ProductService
{
	Product createProduct(Product product);

	List<Product> createProducts(List<Product> products);

	List<Product> getProducts();

	void clearAllProducts();

	Product getProductById(Long id);

	void deleteProductById(Long id);

	Product updateProduct(Long id, DTOUpdateProduct updatedProduct);

	List<Product> filterProductsByCategory(String category);

	List<Product> getProductsFiltered(String category, String search,Integer limit);
}

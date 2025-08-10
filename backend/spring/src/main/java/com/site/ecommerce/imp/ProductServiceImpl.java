package com.site.ecommerce.imp;

import com.site.ecommerce.dtos.DTOUpdateProduct;
import com.site.ecommerce.models.Product;
import com.site.ecommerce.repositories.ProductRepository;
import com.site.ecommerce.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService
{
	private final ProductRepository productRepository;

	@Autowired
	public ProductServiceImpl(ProductRepository productRepository)
	{
		this.productRepository = productRepository;
	}

	@Override
	public Product createProduct(Product product)
	{

		return this.productRepository.save(product);
	}

	@Override
	public List<Product> createProducts(List<Product> products)
	{
		return this.productRepository.saveAll(products);
	}

	@Override
	public List<Product> getProducts()
	{
		return this.productRepository.findAll();
	}

	@Override
	public Product getProductById(Long id)
	{
		return this.productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product is not Found"));
	}

	@Override
	public void clearAllProducts()
	{
		this.productRepository.deleteAll();
	}

	@Override
	public void deleteProductById(Long id)
	{
		this.productRepository.deleteById(id);

	}

	@Override
	public Product updateProduct(Long id, DTOUpdateProduct dtoUpdateProduct)
	{
		String message = String.format("Product not found with id {%s}", id);
		Product existingProduct = this.productRepository.findById(id).orElseThrow(() -> new RuntimeException(message));
		dtoUpdateProduct.copyToActual(existingProduct);
		return this.productRepository.save(existingProduct);
	}

	@Override
	public List<Product> filterProductsByCategory(String category)
	{
		return this.productRepository.findAllByCategory(category);
	}
}


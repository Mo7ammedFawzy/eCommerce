package com.site.ecommerce.imp;

import com.site.ecommerce.models.Product;
import com.site.ecommerce.repositories.ProductRepository;
import com.site.ecommerce.services.ProductService;
import org.apache.commons.lang3.ObjectUtils;
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
	public List<Product> getAllProducts()
	{
		return this.productRepository.findAll();
	}
}

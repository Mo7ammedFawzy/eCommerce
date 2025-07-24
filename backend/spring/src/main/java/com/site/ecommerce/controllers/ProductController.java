package com.site.ecommerce.controllers;

import com.site.ecommerce.dtos.DTOProduct;
import com.site.ecommerce.imp.ProductServiceImpl;
import com.site.ecommerce.mappers.ProductMapper;
import com.site.ecommerce.models.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/products/")
public class ProductController
{
	private final ProductServiceImpl productService;
	private final ProductMapper mapper;

	@Autowired
	public ProductController(ProductServiceImpl productService, ProductMapper productMapper)
	{
		this.productService = productService;
		this.mapper = productMapper;
	}

	@GetMapping
	public ResponseEntity<List<DTOProduct>> getAllProducts()
	{
		List<Product> allProducts = productService.getAllProducts();
		List<DTOProduct> dtoProducts = allProducts.stream().map(mapper::toDto).toList();
		return ResponseEntity.status(HttpStatus.OK).body(dtoProducts);
	}

	@PostMapping
	public ResponseEntity<DTOProduct> createProduct(@RequestBody DTOProduct dtoProduct)
	{
		Product createdProduct = productService.createProduct(mapper.toEntity(dtoProduct));
		return ResponseEntity.status(HttpStatus.CREATED).body(mapper.toDto(createdProduct));
	}
}

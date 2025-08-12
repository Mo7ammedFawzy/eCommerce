package com.site.ecommerce.controllers;

import com.site.ecommerce.dtos.*;
import com.site.ecommerce.imp.ProductServiceImpl;
import com.site.ecommerce.mappers.ProductMapper;
import com.site.ecommerce.models.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/products")
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
	public ResponseEntity<List<DTOProduct>> getProducts(@RequestParam(required = false) String category,
			@RequestParam(required = false) String search,@RequestParam(required = false) Integer limit)
	{

		List<DTOProduct> dtoProducts = productService.getProductsFiltered(category, search,limit).stream().map(mapper::toDto).toList();
		return ResponseEntity.ok(dtoProducts);
	}

	@GetMapping("/{id}")
	public ResponseEntity<DTOProduct> getProductById(@PathVariable Long id)
	{
		Product product = productService.getProductById(id);
		return ResponseEntity.status(HttpStatus.OK).body(mapper.toDto(product));
	}

	@PostMapping
	public ResponseEntity<DTOProduct> createProduct(@RequestBody DTOProduct dtoProduct)
	{
		Product createdProduct = productService.createProduct(mapper.toEntity(dtoProduct));
		return ResponseEntity.status(HttpStatus.CREATED).body(mapper.toDto(createdProduct));
	}

	@PostMapping("/bulk")
	public ResponseEntity<List<DTOProduct>> createProducts(@RequestBody List<DTOProduct> dtoProducts)
	{
		List<Product> createdProducts = productService.createProducts(dtoProducts.stream().map(mapper::toEntity).toList());
		return ResponseEntity.status(HttpStatus.CREATED).body(createdProducts.stream().map(mapper::toDto).toList());
	}

	@DeleteMapping
	public ResponseEntity<String> clearAllProducts()
	{
		productService.clearAllProducts();
		return ResponseEntity.status(HttpStatus.OK).body("All products have been deleted");
	}

	@PatchMapping("/{id}")
	public ResponseEntity<DTOProduct> updateProduct(@PathVariable Long id, @RequestBody DTOUpdateProduct dtoUpdateProduct)
	{
		Product updatedProduct = productService.updateProduct(id, dtoUpdateProduct);
		return ResponseEntity.status(HttpStatus.OK).body(mapper.toDto(updatedProduct));
	}
}

package com.site.ecommerce.mappers;

import com.site.ecommerce.dtos.DTOProduct;
import com.site.ecommerce.models.*;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;

@Component
public class ProductMapper
{
	public DTOProduct toDto(Product product)
	{
		DTOProduct dto = new DTOProduct();
		if (ObjectUtils.isEmpty(product))
			return dto;
		String category = product.getCategory();
		if (!ObjectUtils.isEmpty(category))
			dto.setCategory(category);
		dto.setId(product.getId());
		dto.setColors(product.getColors());
		dto.setPrice(product.getPrice());
		dto.setTitle(product.getTitle());
		dto.setCreatedAt(product.getCreatedAt());
		dto.setUpdatedAt(product.getUpdatedAt());
		dto.setDescription(product.getDescription());
		dto.setDiscount(product.getDiscount());
		dto.setImages(product.getImages());
		dto.setRating(product.getRating());
		return dto;
	}

	public Product toEntity(DTOProduct dto)
	{
		if (ObjectUtils.isEmpty(dto))
			return null;
		Product product = new Product();
		if (dto.getId() != null)
			product.setId(dto.getId());
		// Map core fields
		product.setTitle(dto.getTitle());
		product.setDescription(dto.getDescription());
		product.setPrice(dto.getPrice());
		String category = dto.getCategory();
		if (!ObjectUtils.isEmpty(category))
		{
			if (isValidCategory(category))
				product.setCategory(category);
		}
		// Collections
		product.setImages(dto.getImages());
		product.setColors(dto.getColors());
		// Rating
		product.setRating(dto.getRating());
		product.setDiscount(dto.getDiscount());
		// Timestamps handled by JPA
		return product;
	}

	private boolean isValidCategory(String category)
	{
		try
		{
			Category.valueOf(category.toUpperCase());
			return true;
		}
		catch (IllegalArgumentException e)
		{
			return false;
		}
	}
}

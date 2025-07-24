package com.site.ecommerce.dtos;

import com.site.ecommerce.models.Rating;

import java.time.LocalDateTime;
import java.util.List;

//lombok
//@Data
public class DTOProduct
{
	private Long id;
	private String title;
	private Double price;
	private String category;
	private String description;
	private List<String> images;
	private Rating rating;
	private List<String> colors;
	private Double discount;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;

	public Long getId()
	{
		return id;
	}

	public void setId(Long id)
	{
		this.id = id;
	}

	public String getCategory()
	{
		return category;
	}

	public void setCategory(String category)
	{
		this.category = category;
	}

	public String getDescription()
	{
		return description;
	}

	public void setDescription(String description)
	{
		this.description = description;
	}

	public List<String> getImages()
	{
		return images;
	}

	public void setImages(List<String> images)
	{
		this.images = images;
	}

	public Rating getRating()
	{
		return rating;
	}

	public void setRating(Rating rating)
	{
		this.rating = rating;
	}

	public List<String> getColors()
	{
		return colors;
	}

	public void setColors(List<String> colors)
	{
		this.colors = colors;
	}

	public Double getDiscount()
	{
		return discount;
	}

	public void setDiscount(Double discount)
	{
		this.discount = discount;
	}

	public LocalDateTime getCreatedAt()
	{
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt)
	{
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt()
	{
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt)
	{
		this.updatedAt = updatedAt;
	}

	public String getTitle()
	{
		return title;
	}

	public void setTitle(String title)
	{
		this.title = title;
	}

	public Double getPrice()
	{
		return price;
	}

	public void setPrice(Double price)
	{
		this.price = price;
	}
}

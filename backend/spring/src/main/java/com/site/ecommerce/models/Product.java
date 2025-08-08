package com.site.ecommerce.models;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import org.hibernate.annotations.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "product")
public class Product
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id") // do i need to make product_id
	private Long Id;
	private String category;
	private String title;
	private Double price;
	private String description;

	@ElementCollection
	@CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
	@Column(name = "image_url")
	private List<String> images;
	@Embedded
	private Rating rating;
	@ElementCollection
	@CollectionTable(name = "product_colors", joinColumns = @JoinColumn(name = "product_id"))
	@Column(name = "color")
	private List<String> colors;
	private Double discount;

	@CreationTimestamp
	private LocalDateTime createdAt;
	@UpdateTimestamp
	private LocalDateTime updatedAt;

	public Product()
	{
	}

	public Product(Long id, String category, String description, List<String> images, Rating rating, List<String> colors, Double discount,
			LocalDateTime createdAt, LocalDateTime updatedAt)
	{
		Id = id;
		this.category = category;
		this.description = description;
		this.images = images;
		this.rating = rating;
		this.colors = colors;
		this.discount = discount;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public Long getId()
	{
		return Id;
	}

	public void setId(Long id)
	{
		Id = id;
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

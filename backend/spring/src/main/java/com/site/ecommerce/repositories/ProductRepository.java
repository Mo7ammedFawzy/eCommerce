package com.site.ecommerce.repositories;

import com.site.ecommerce.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>
{
	List<Product> findAllByCategory(String category);
}

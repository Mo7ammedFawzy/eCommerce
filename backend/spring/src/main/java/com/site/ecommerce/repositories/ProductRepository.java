package com.site.ecommerce.repositories;

import com.site.ecommerce.models.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>
{
	List<Product> findAllByCategory(String category);

	List<Product> findProductByCategoryOrTitleStartingWith(String category, String title);

	@Query("""
			SELECT p from Product p
						WHERE (:category is null or p.category = :category)
									AND (:search is null or LOWER(p.title) like LOWER(CONCAT('%',:search,'%') ) or LOWER(p.description) like LOWER(CONCAT('%',:search,'%') ) )
			""")
	List<Product> findProducts(@Param("category") String category, @Param("search") String search, Pageable pageable);
}

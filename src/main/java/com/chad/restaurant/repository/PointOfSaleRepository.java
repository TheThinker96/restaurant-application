package com.chad.restaurant.repository;

import com.chad.restaurant.domain.PointOfSale;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the PointOfSale entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PointOfSaleRepository extends JpaRepository<PointOfSale, Long> {}

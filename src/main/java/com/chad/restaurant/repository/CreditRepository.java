package com.chad.restaurant.repository;

import com.chad.restaurant.domain.Credit;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Credit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CreditRepository extends JpaRepository<Credit, Long> {}

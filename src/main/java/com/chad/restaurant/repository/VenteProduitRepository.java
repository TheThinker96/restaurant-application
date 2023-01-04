package com.chad.restaurant.repository;

import com.chad.restaurant.domain.VenteProduit;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the VenteProduit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VenteProduitRepository extends JpaRepository<VenteProduit, Long> {}

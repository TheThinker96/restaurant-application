package com.chad.restaurant.service;

import com.chad.restaurant.service.dto.PointOfSaleDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.chad.restaurant.domain.PointOfSale}.
 */
public interface PointOfSaleService {
    /**
     * Save a pointOfSale.
     *
     * @param pointOfSaleDTO the entity to save.
     * @return the persisted entity.
     */
    PointOfSaleDTO save(PointOfSaleDTO pointOfSaleDTO);

    /**
     * Updates a pointOfSale.
     *
     * @param pointOfSaleDTO the entity to update.
     * @return the persisted entity.
     */
    PointOfSaleDTO update(PointOfSaleDTO pointOfSaleDTO);

    /**
     * Partially updates a pointOfSale.
     *
     * @param pointOfSaleDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<PointOfSaleDTO> partialUpdate(PointOfSaleDTO pointOfSaleDTO);

    /**
     * Get all the pointOfSales.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<PointOfSaleDTO> findAll(Pageable pageable);

    /**
     * Get the "id" pointOfSale.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PointOfSaleDTO> findOne(Long id);

    /**
     * Delete the "id" pointOfSale.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}

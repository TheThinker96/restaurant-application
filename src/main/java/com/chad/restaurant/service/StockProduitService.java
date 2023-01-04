package com.chad.restaurant.service;

import com.chad.restaurant.service.dto.StockProduitDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.chad.restaurant.domain.StockProduit}.
 */
public interface StockProduitService {
    /**
     * Save a stockProduit.
     *
     * @param stockProduitDTO the entity to save.
     * @return the persisted entity.
     */
    StockProduitDTO save(StockProduitDTO stockProduitDTO);

    /**
     * Updates a stockProduit.
     *
     * @param stockProduitDTO the entity to update.
     * @return the persisted entity.
     */
    StockProduitDTO update(StockProduitDTO stockProduitDTO);

    /**
     * Partially updates a stockProduit.
     *
     * @param stockProduitDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<StockProduitDTO> partialUpdate(StockProduitDTO stockProduitDTO);

    /**
     * Get all the stockProduits.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<StockProduitDTO> findAll(Pageable pageable);

    /**
     * Get the "id" stockProduit.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<StockProduitDTO> findOne(Long id);

    /**
     * Delete the "id" stockProduit.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}

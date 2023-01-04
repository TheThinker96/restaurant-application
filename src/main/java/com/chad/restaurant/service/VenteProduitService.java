package com.chad.restaurant.service;

import com.chad.restaurant.service.dto.VenteProduitDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.chad.restaurant.domain.VenteProduit}.
 */
public interface VenteProduitService {
    /**
     * Save a venteProduit.
     *
     * @param venteProduitDTO the entity to save.
     * @return the persisted entity.
     */
    VenteProduitDTO save(VenteProduitDTO venteProduitDTO);

    /**
     * Updates a venteProduit.
     *
     * @param venteProduitDTO the entity to update.
     * @return the persisted entity.
     */
    VenteProduitDTO update(VenteProduitDTO venteProduitDTO);

    /**
     * Partially updates a venteProduit.
     *
     * @param venteProduitDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<VenteProduitDTO> partialUpdate(VenteProduitDTO venteProduitDTO);

    /**
     * Get all the venteProduits.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<VenteProduitDTO> findAll(Pageable pageable);

    /**
     * Get the "id" venteProduit.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<VenteProduitDTO> findOne(Long id);

    /**
     * Delete the "id" venteProduit.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}

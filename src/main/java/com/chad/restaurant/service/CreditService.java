package com.chad.restaurant.service;

import com.chad.restaurant.service.dto.CreditDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.chad.restaurant.domain.Credit}.
 */
public interface CreditService {
    /**
     * Save a credit.
     *
     * @param creditDTO the entity to save.
     * @return the persisted entity.
     */
    CreditDTO save(CreditDTO creditDTO);

    /**
     * Updates a credit.
     *
     * @param creditDTO the entity to update.
     * @return the persisted entity.
     */
    CreditDTO update(CreditDTO creditDTO);

    /**
     * Partially updates a credit.
     *
     * @param creditDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<CreditDTO> partialUpdate(CreditDTO creditDTO);

    /**
     * Get all the credits.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CreditDTO> findAll(Pageable pageable);

    /**
     * Get the "id" credit.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CreditDTO> findOne(Long id);

    /**
     * Delete the "id" credit.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}

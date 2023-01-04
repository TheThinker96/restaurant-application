package com.chad.restaurant.web.rest;

import com.chad.restaurant.repository.StockProduitRepository;
import com.chad.restaurant.service.StockProduitService;
import com.chad.restaurant.service.dto.StockProduitDTO;
import com.chad.restaurant.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.chad.restaurant.domain.StockProduit}.
 */
@RestController
@RequestMapping("/api")
public class StockProduitResource {

    private final Logger log = LoggerFactory.getLogger(StockProduitResource.class);

    private static final String ENTITY_NAME = "stockProduit";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StockProduitService stockProduitService;

    private final StockProduitRepository stockProduitRepository;

    public StockProduitResource(StockProduitService stockProduitService, StockProduitRepository stockProduitRepository) {
        this.stockProduitService = stockProduitService;
        this.stockProduitRepository = stockProduitRepository;
    }

    /**
     * {@code POST  /stock-produits} : Create a new stockProduit.
     *
     * @param stockProduitDTO the stockProduitDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new stockProduitDTO, or with status {@code 400 (Bad Request)} if the stockProduit has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/stock-produits")
    public ResponseEntity<StockProduitDTO> createStockProduit(@RequestBody StockProduitDTO stockProduitDTO) throws URISyntaxException {
        log.debug("REST request to save StockProduit : {}", stockProduitDTO);
        if (stockProduitDTO.getId() != null) {
            throw new BadRequestAlertException("A new stockProduit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StockProduitDTO result = stockProduitService.save(stockProduitDTO);
        return ResponseEntity
            .created(new URI("/api/stock-produits/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /stock-produits/:id} : Updates an existing stockProduit.
     *
     * @param id the id of the stockProduitDTO to save.
     * @param stockProduitDTO the stockProduitDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated stockProduitDTO,
     * or with status {@code 400 (Bad Request)} if the stockProduitDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the stockProduitDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/stock-produits/{id}")
    public ResponseEntity<StockProduitDTO> updateStockProduit(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody StockProduitDTO stockProduitDTO
    ) throws URISyntaxException {
        log.debug("REST request to update StockProduit : {}, {}", id, stockProduitDTO);
        if (stockProduitDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, stockProduitDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!stockProduitRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        StockProduitDTO result = stockProduitService.update(stockProduitDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, stockProduitDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /stock-produits/:id} : Partial updates given fields of an existing stockProduit, field will ignore if it is null
     *
     * @param id the id of the stockProduitDTO to save.
     * @param stockProduitDTO the stockProduitDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated stockProduitDTO,
     * or with status {@code 400 (Bad Request)} if the stockProduitDTO is not valid,
     * or with status {@code 404 (Not Found)} if the stockProduitDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the stockProduitDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/stock-produits/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<StockProduitDTO> partialUpdateStockProduit(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody StockProduitDTO stockProduitDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update StockProduit partially : {}, {}", id, stockProduitDTO);
        if (stockProduitDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, stockProduitDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!stockProduitRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<StockProduitDTO> result = stockProduitService.partialUpdate(stockProduitDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, stockProduitDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /stock-produits} : get all the stockProduits.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of stockProduits in body.
     */
    @GetMapping("/stock-produits")
    public ResponseEntity<List<StockProduitDTO>> getAllStockProduits(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of StockProduits");
        Page<StockProduitDTO> page = stockProduitService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /stock-produits/:id} : get the "id" stockProduit.
     *
     * @param id the id of the stockProduitDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the stockProduitDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/stock-produits/{id}")
    public ResponseEntity<StockProduitDTO> getStockProduit(@PathVariable Long id) {
        log.debug("REST request to get StockProduit : {}", id);
        Optional<StockProduitDTO> stockProduitDTO = stockProduitService.findOne(id);
        return ResponseUtil.wrapOrNotFound(stockProduitDTO);
    }

    /**
     * {@code DELETE  /stock-produits/:id} : delete the "id" stockProduit.
     *
     * @param id the id of the stockProduitDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/stock-produits/{id}")
    public ResponseEntity<Void> deleteStockProduit(@PathVariable Long id) {
        log.debug("REST request to delete StockProduit : {}", id);
        stockProduitService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

package com.chad.restaurant.web.rest;

import com.chad.restaurant.repository.PointOfSaleRepository;
import com.chad.restaurant.service.PointOfSaleService;
import com.chad.restaurant.service.dto.PointOfSaleDTO;
import com.chad.restaurant.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
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
 * REST controller for managing {@link com.chad.restaurant.domain.PointOfSale}.
 */
@RestController
@RequestMapping("/api")
public class PointOfSaleResource {

    private final Logger log = LoggerFactory.getLogger(PointOfSaleResource.class);

    private static final String ENTITY_NAME = "pointOfSale";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PointOfSaleService pointOfSaleService;

    private final PointOfSaleRepository pointOfSaleRepository;

    public PointOfSaleResource(PointOfSaleService pointOfSaleService, PointOfSaleRepository pointOfSaleRepository) {
        this.pointOfSaleService = pointOfSaleService;
        this.pointOfSaleRepository = pointOfSaleRepository;
    }

    /**
     * {@code POST  /point-of-sales} : Create a new pointOfSale.
     *
     * @param pointOfSaleDTO the pointOfSaleDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pointOfSaleDTO, or with status {@code 400 (Bad Request)} if the pointOfSale has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/point-of-sales")
    public ResponseEntity<PointOfSaleDTO> createPointOfSale(@Valid @RequestBody PointOfSaleDTO pointOfSaleDTO) throws URISyntaxException {
        log.debug("REST request to save PointOfSale : {}", pointOfSaleDTO);
        if (pointOfSaleDTO.getId() != null) {
            throw new BadRequestAlertException("A new pointOfSale cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PointOfSaleDTO result = pointOfSaleService.save(pointOfSaleDTO);
        return ResponseEntity
            .created(new URI("/api/point-of-sales/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /point-of-sales/:id} : Updates an existing pointOfSale.
     *
     * @param id the id of the pointOfSaleDTO to save.
     * @param pointOfSaleDTO the pointOfSaleDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pointOfSaleDTO,
     * or with status {@code 400 (Bad Request)} if the pointOfSaleDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pointOfSaleDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/point-of-sales/{id}")
    public ResponseEntity<PointOfSaleDTO> updatePointOfSale(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody PointOfSaleDTO pointOfSaleDTO
    ) throws URISyntaxException {
        log.debug("REST request to update PointOfSale : {}, {}", id, pointOfSaleDTO);
        if (pointOfSaleDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pointOfSaleDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pointOfSaleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        PointOfSaleDTO result = pointOfSaleService.update(pointOfSaleDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pointOfSaleDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /point-of-sales/:id} : Partial updates given fields of an existing pointOfSale, field will ignore if it is null
     *
     * @param id the id of the pointOfSaleDTO to save.
     * @param pointOfSaleDTO the pointOfSaleDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pointOfSaleDTO,
     * or with status {@code 400 (Bad Request)} if the pointOfSaleDTO is not valid,
     * or with status {@code 404 (Not Found)} if the pointOfSaleDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the pointOfSaleDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/point-of-sales/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<PointOfSaleDTO> partialUpdatePointOfSale(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody PointOfSaleDTO pointOfSaleDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update PointOfSale partially : {}, {}", id, pointOfSaleDTO);
        if (pointOfSaleDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pointOfSaleDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pointOfSaleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<PointOfSaleDTO> result = pointOfSaleService.partialUpdate(pointOfSaleDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pointOfSaleDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /point-of-sales} : get all the pointOfSales.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pointOfSales in body.
     */
    @GetMapping("/point-of-sales")
    public ResponseEntity<List<PointOfSaleDTO>> getAllPointOfSales(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of PointOfSales");
        Page<PointOfSaleDTO> page = pointOfSaleService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /point-of-sales/:id} : get the "id" pointOfSale.
     *
     * @param id the id of the pointOfSaleDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pointOfSaleDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/point-of-sales/{id}")
    public ResponseEntity<PointOfSaleDTO> getPointOfSale(@PathVariable Long id) {
        log.debug("REST request to get PointOfSale : {}", id);
        Optional<PointOfSaleDTO> pointOfSaleDTO = pointOfSaleService.findOne(id);
        return ResponseUtil.wrapOrNotFound(pointOfSaleDTO);
    }

    /**
     * {@code DELETE  /point-of-sales/:id} : delete the "id" pointOfSale.
     *
     * @param id the id of the pointOfSaleDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/point-of-sales/{id}")
    public ResponseEntity<Void> deletePointOfSale(@PathVariable Long id) {
        log.debug("REST request to delete PointOfSale : {}", id);
        pointOfSaleService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
